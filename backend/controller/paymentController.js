import Stripe from 'stripe';
import { Courses } from '../models/courses.js';
import { User } from '../models/userModel.js';
import { Payment } from '../models/paymentModel.js';

const stripe = new Stripe(process.env.STRIPE_SECRET || process.env.STRIPE_SECRET_KEY);

export const createSession = async (req, res) => {
    try {
        const { courseId } = req.body;
        const course = await Courses.findById(courseId);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: course.title,
                            description: course.description,
                        },
                        unit_amount: course.price * 100, // paise
                    },
                    quantity: 1,
                },
            ],
            success_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/cancel`,
            metadata: {
                courseId: course._id.toString(),
                userId: req.user._id.toString(),
            },
        });

        res.status(200).json({ url: session.url });
    } catch (err) {
        console.error("Stripe Create Session Error:", err);
        res.status(500).json({ message: err.message });
    }
};

export const webhook = async (req, res) => {
    const signature = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
    } catch (err) {
        console.error(`Webhook Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        
        try {
            const userId = session.metadata.userId;
            const courseId = session.metadata.courseId;

            // Find user to safely update purchasedCourses array of objects
            const user = await User.findById(userId);
            if (user) {
                const alreadyPurchased = user.purchasedCourses.some((p) => {
                    if (!p) return false;
                    try {
                        const existingCourseId = (p.course && typeof p.course.toString === 'function') 
                            ? p.course.toString() 
                            : (typeof p.toString === 'function' ? p.toString() : String(p));
                        return existingCourseId === String(courseId);
                    } catch (e) {
                        return false; // Ignore corrupted entries
                    }
                });
                
                if (!alreadyPurchased) {
                    user.purchasedCourses.push({
                        course: courseId,
                        progress: 0,
                        completed: false,
                        purchasedAt: new Date(),
                        timeline: []
                    });
                }
                
                // Keep subscription backward compatible
                if (!user.subscription.includes(courseId)) {
                    user.subscription.push(courseId);
                }
                await user.save();
            }

            // Find course price
            const course = await Courses.findById(courseId);

            // Store payment record
            await Payment.create({
                userId,
                courseId,
                stripe_session_id: session.id,
                amount: course ? course.price : (session.amount_total / 100),
                status: 'success'
            });

            console.log(`Payment successful for user ${userId} and course ${courseId}`);
        } catch (err) {
            console.error("Error processing successful payment:", err);
            return res.status(500).send("Internal Server Error");
        }
    }

    res.status(200).send();
};

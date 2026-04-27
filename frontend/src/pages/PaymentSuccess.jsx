import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UserData } from '../context/UserContext';
import { CheckCircle } from 'lucide-react';

export const PaymentSuccess = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const { fetchUser } = UserData();

    useEffect(() => {
        // Refresh the user's data so the frontend knows they bought the course
        if (sessionId) {
            fetchUser();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sessionId]);

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <div className="bg-card text-card-foreground p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-border/50">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                <h1 className="text-3xl font-light mb-4">Payment Successful!</h1>
                <p className="text-muted-foreground mb-8">
                    Your course has been added to your account. You can now start learning.
                </p>
                <div className="space-y-4">
                    <button
                        onClick={() => navigate('/courses')}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-6 rounded-xl transition-colors"
                    >
                        Go to My Courses
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full bg-transparent hover:bg-muted text-foreground font-medium py-3 px-6 rounded-xl transition-colors border border-border"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

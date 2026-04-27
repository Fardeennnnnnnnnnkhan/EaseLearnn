import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export const PaymentCancel = () => {
    const navigate = useNavigate();

    useEffect(() => {
        toast.error("Payment was cancelled or failed");
    }, []);

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <div className="bg-card text-card-foreground p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-border/50">
                <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
                <h1 className="text-3xl font-light mb-4">Payment Cancelled</h1>
                <p className="text-muted-foreground mb-8">
                    Your payment was cancelled and you have not been charged.
                </p>
                <div className="space-y-4">
                    <button
                        onClick={() => navigate('/courses')}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-6 rounded-xl transition-colors"
                    >
                        Browse Other Courses
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

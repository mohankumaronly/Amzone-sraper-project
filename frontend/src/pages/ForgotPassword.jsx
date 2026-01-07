import React, { useState, useEffect } from 'react';
import { ArrowLeft, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../Layouts/AuthLayout';
import AuthInput from '../components/AuthInputs';
import AuthButton from '../components/AuthButton';
import { forgotPassword } from '../services/api.service';

const ForgotPassword = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [sent, setSent] = useState(false);


    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [countdown]);

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const canSubmit = isEmailValid && !isLoading && countdown === 0;

    const handleSendLink = async (e) => {
        e.preventDefault();
        if (!canSubmit) return;

        setIsLoading(true);

        try {
            await forgotPassword(email.trim());
            setSent(true);
            setCountdown(60);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <>
            <AuthLayout
                title="Reset password"
                subtitle="Enter your email and we'll send you a link to get back into your account."
            >
                <form className="space-y-6" onSubmit={handleSendLink}>

                    <div className="relative">
                        <AuthInput
                            label="Email Address"
                            type="email"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading || countdown > 0}
                        />

                        {email && (
                            <div className="absolute right-3 top-10">
                                {isEmailValid ?
                                    <CheckCircle2 className="w-4 h-4 text-green-500" /> :
                                    <AlertCircle className="w-4 h-4 text-rose-400" />
                                }
                            </div>
                        )}

                        {email && !isEmailValid && (
                            <p className="text-[10px] text-rose-500 mt-1 italic ml-1">
                                Please include a valid domain (e.g., .com)
                            </p>
                        )}
                    </div>

                    <AuthButton
                        icon={countdown === 0 ? Send : null}
                        disabled={!canSubmit}
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : countdown > 0 ? (
                            `Resend link in ${countdown}s`
                        ) : (
                            'Send Reset Link'
                        )}
                    </AuthButton>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                    <span
                        onClick={() => navigate('/login')}
                        className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-orange-600 transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Sign In
                    </span>
                </div>

                <div className="mt-8 text-center px-4">
                    <p className="text-xs text-slate-400 leading-relaxed">
                        {countdown > 0
                            ? "Link sent! If you don't see it, wait for the timer to request again."
                            : "If you don't see the email within 5 minutes, please check your spam folder."}
                    </p>
                </div>
            </AuthLayout>
        </>
    );
};

export default ForgotPassword;  
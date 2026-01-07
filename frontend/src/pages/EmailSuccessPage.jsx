import React, { useEffect, useState, useRef } from 'react';
import { CheckCircle, ArrowRight, PartyPopper, Sparkles, XCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthLayout from '../Layouts/AuthLayout';
import AuthButton from '../components/AuthButton';
import LoadingScreen from '../components/LoadingScreen';
import { verifyEmail } from '../services/api.service';

const EmailSuccessPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    // 🔍 Debug logs (keep for now, remove later)
    console.log("TOKEN FROM useParams:", token);
    console.log("TOKEN LENGTH:", token?.length);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const calledRef = useRef(false);

    useEffect(() => {
        if (!token || calledRef.current) return;
        calledRef.current = true;

        // 🔐 Normalize token (CRITICAL FIX)
        const cleanToken = decodeURIComponent(token)
            .split("?")[0]
            .trim();

        console.log("CLEAN TOKEN:", cleanToken);
        console.log("CLEAN TOKEN LENGTH:", cleanToken.length);

        const verify = async () => {
            try {
                await verifyEmail(cleanToken);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    "Invalid or expired verification link"
                );
            } finally {
                setLoading(false);
            }
        };

        verify();
    }, [token]);

    if (loading) return <LoadingScreen />;

    return (
        <AuthLayout
            title={error ? "Verification Failed" : "Account Verified!"}
            subtitle={
                error
                    ? "We couldn’t verify your email."
                    : "Your email has been successfully confirmed. You're all set to start scraping."
            }
        >
            <div className="flex flex-col items-center py-6">

                {!error ? (
                    <>
                        <div className="relative mb-10">
                            <Sparkles className="absolute -top-4 -right-4 text-orange-400 w-6 h-6 animate-pulse" />
                            <PartyPopper className="absolute -bottom-2 -left-6 text-orange-300 w-8 h-8 rotate-12" />
                            <div className="relative">
                                <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-20"></div>
                                <div className="relative bg-green-50 p-8 rounded-full border-4 border-white shadow-xl shadow-green-100/50">
                                    <CheckCircle className="w-16 h-16 text-green-500" />
                                </div>
                            </div>
                        </div>

                        <div className="text-center space-y-3 mb-10">
                            <h3 className="text-xl font-bold text-slate-900">
                                Congratulations! 🎉
                            </h3>
                            <p className="text-sm text-slate-500 px-4">
                                Your account is now fully active.
                            </p>
                        </div>

                        <AuthButton
                            icon={ArrowRight}
                            onClick={() => navigate('/login')}
                        >
                            Login to Dashboard
                        </AuthButton>
                    </>
                ) : (
                    <>
                        <XCircle className="w-14 h-14 text-rose-500 mb-6" />
                        <p className="text-sm text-rose-500 mb-6 text-center">
                            {error}
                        </p>

                        <AuthButton onClick={() => navigate('/login')}>
                            Go to Login
                        </AuthButton>
                    </>
                )}

                <div className="mt-10 flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                    <div
                        className={`w-2 h-2 rounded-full animate-pulse ${
                            error ? 'bg-rose-500' : 'bg-green-500'
                        }`}
                    />
                    <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
                        {error ? "Verification Failed" : "Secure Connection Verified"}
                    </span>
                </div>
            </div>
        </AuthLayout>
    );
};

export default EmailSuccessPage;

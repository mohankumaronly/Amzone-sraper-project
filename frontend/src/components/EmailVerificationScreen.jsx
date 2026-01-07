import React from 'react';
import { Mail, ArrowRight, ExternalLink, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../Layouts/AuthLayout';
import AuthButton from '../components/AuthButton';

const EmailVerificationScreen = () => {
    const navigate = useNavigate();
    const openEmailProvider = () => {
        window.open('https://mail.google.com/', '_blank');
    };

    return (
        <AuthLayout
            title="Check your email"
            subtitle="We've sent a verification link to your inbox. Please click it to activate your account."
        >
            <div className="flex flex-col items-center py-4">
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-orange-100 rounded-full animate-ping opacity-20"></div>
                    <div className="relative bg-orange-50 p-6 rounded-full border-2 border-orange-100">
                        <Mail className="w-12 h-12 text-orange-600" />
                    </div>
                </div>

                <div className="space-y-4 w-full">
                    <AuthButton 
                        icon={ExternalLink} 
                        onClick={openEmailProvider}
                    >
                        Open Gmail / Inbox
                    </AuthButton>
                    <button 
                        onClick={() => navigate('/login')}
                        className="w-full py-4 text-slate-500 font-semibold text-sm hover:text-slate-800 transition-colors flex items-center justify-center gap-2"
                    >
                        I'll do this later
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
                <div className="mt-10 pt-8 border-t border-slate-100 w-full text-center">
                    <p className="text-sm text-slate-500 mb-4">
                        Didn't receive the email? Check your spam folder or try again.
                    </p>
                    <button className="inline-flex items-center gap-2 text-orange-600 font-bold hover:underline text-sm transition-all active:scale-95">
                        <RefreshCw className="w-4 h-4" />
                        Resend Verification Email
                    </button>
                </div>
            </div>
            <div className="mt-8 text-center px-6">
                <p className="text-[11px] text-slate-400 leading-relaxed italic">
                    Need help? Contact our support team if you're having trouble verifying your account.
                </p>
            </div>
        </AuthLayout>
    );
};

export default EmailVerificationScreen;
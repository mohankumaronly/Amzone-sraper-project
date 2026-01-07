import React, { useState } from 'react';
import { ArrowRight, Lock, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import AuthInput from '../components/AuthInputs';
import AuthLayout from '../Layouts/AuthLayout';
import AuthButton from '../components/AuthButton';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';
import { userLogin } from '../services/api.service';

const LoginPage = () => {
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordFilled = password.length > 0;

    const canSubmit = isEmailValid && isPasswordFilled;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!canSubmit || loading) return;
        setLoading(true);
        setError("");
        try {
            const payload = {
                email: email.trim(),
                password,
            };
            await userLogin(payload);
            navigate("/dashboard");

        } catch (err) {
            const msg = err.response?.data?.message || "Login failed";

            if (msg.toLowerCase().includes("verify")) {
                setError("Please verify your email before logging in.");
            } else {
                setError(msg);
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            {error && (
                <div className="flex items-center gap-2 text-rose-500 bg-white border border-rose-200 p-3 rounded-xl shadow-sm shadow-rose-100 animate-shake">
                    <XCircle className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-semibold">{error}</span>
                </div>
            )}
            {loading && <LoadingScreen />}
            <AuthLayout
                title="Welcome back"
                subtitle="Enter your details to access your dashboard."
            >
                <form className="space-y-5" onSubmit={handleSubmit}>

                    <div className="relative">
                        <AuthInput
                            label="Email Address"
                            type="email"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {email && (
                            <div className="absolute right-3 top-10">
                                {isEmailValid ?
                                    <CheckCircle2 className="w-4 h-4 text-green-500" /> :
                                    <AlertCircle className="w-4 h-4 text-rose-400" />
                                }
                            </div>
                        )}
                    </div>

                    <AuthInput
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        rightLabel={
                            <span
                                onClick={() => navigate('/forgot-password')}
                                className="cursor-pointer hover:underline text-orange-600 font-medium"
                            >
                                Forgot password?
                            </span>
                        }
                    />

                    <div className="flex items-center justify-between py-1">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="remember"
                                className="w-4 h-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500 cursor-pointer"
                            />
                            <label htmlFor="remember" className="text-xs text-slate-500 font-medium cursor-pointer">
                                Remember this device
                            </label>
                        </div>
                    </div>

                    <AuthButton
                        icon={ArrowRight}
                        disabled={!canSubmit || loading}
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </AuthButton>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                    <p className="text-sm text-slate-500">
                        New to AmzFlow?{' '}
                        <span
                            className="text-orange-600 font-bold hover:underline cursor-pointer"
                            onClick={() => navigate('/register')}
                        >
                            Create account
                        </span>
                    </p>
                </div>

                <div className="mt-8 flex items-center justify-center gap-2 text-slate-400">
                    <Lock className={`w-3 h-3 ${canSubmit ? 'text-green-500' : 'text-slate-400'}`} />
                    <p className="text-[10px] uppercase tracking-widest font-semibold text-center">
                        {canSubmit ? 'System ready for login' : 'Secure encrypted login connection'}
                    </p>
                </div>
            </AuthLayout>
        </>
    );
};

export default LoginPage;
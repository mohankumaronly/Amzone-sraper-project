import React, { useState, useEffect } from 'react';
import { ArrowRight, Lock, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import AuthInput from '../components/AuthInputs';
import AuthLayout from '../Layouts/AuthLayout';
import AuthButton from '../components/AuthButton';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';
import { getMe, userLogin } from '../services/api.service';
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
    const navigate = useNavigate();
    const { refreshAuth } = useAuth();

    const [checkingAuth, setCheckingAuth] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const canSubmit = isEmailValid && password.length > 0;

    // ✅ Redirect if already logged in
    useEffect(() => {
        const checkAuth = async () => {
            try {
                await getMe();
                navigate("/dashboard", { replace: true });
            } catch {
                setCheckingAuth(false);
            }
        };

        checkAuth();
    }, [navigate]);

    // ✅ FIXED handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!canSubmit || loading) return;

        setLoading(true);
        setError("");

        try {
            const payload = {
                email: email.trim(),
                password,
                rememberMe,
            };

            // 1️⃣ Login (sets cookies)
            await userLogin(payload);

            // 2️⃣ Sync cookies → AuthContext
            await refreshAuth();

            // 3️⃣ Navigate
            navigate("/dashboard", { replace: true });

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

    if (checkingAuth) {
        return <LoadingScreen />;
    }

    return (
        <>
            {error && (
                <div className="flex items-center gap-2 text-rose-500 bg-white border border-rose-200 p-3 rounded-xl">
                    <XCircle className="w-4 h-4" />
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
                                {isEmailValid
                                    ? <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    : <AlertCircle className="w-4 h-4 text-rose-400" />
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

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="remember"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="w-4 h-4"
                        />
                        <label htmlFor="remember" className="text-xs text-slate-500">
                            Remember this device
                        </label>
                    </div>

                    <AuthButton icon={ArrowRight} disabled={!canSubmit || loading}>
                        {loading ? "Signing in..." : "Sign In"}
                    </AuthButton>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-sm text-slate-500">
                        New to AmzFlow?{' '}
                        <span
                            onClick={() => navigate('/register')}
                            className="text-orange-600 font-bold cursor-pointer"
                        >
                            Create account
                        </span>
                    </p>
                </div>

                <div className="mt-6 flex items-center justify-center gap-2 text-slate-400">
                    <Lock className="w-3 h-3" />
                    <p className="text-[10px] uppercase tracking-widest">
                        Secure encrypted login
                    </p>
                </div>
            </AuthLayout>
        </>
    );
};

export default LoginPage;

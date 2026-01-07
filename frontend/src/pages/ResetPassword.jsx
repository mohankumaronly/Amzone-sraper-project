import React, { useState } from 'react';
import {
    CheckCircle2,
    ShieldCheck,
    XCircle,
    AlertCircle,
    Loader2
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthLayout from '../Layouts/AuthLayout';
import AuthInput from '../components/AuthInputs';
import AuthButton from '../components/AuthButton';
import { resetPassword } from '../services/api.service';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const isMinLength = password.length >= 8;
    const isMatch = password === confirmPassword && confirmPassword.length > 0;
    const canSubmit = isMinLength && isMatch && !loading;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!canSubmit) return;

        setLoading(true);
        setError('');

        try {
            await resetPassword(token, password);
            navigate('/login');
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Reset link is invalid or expired'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Set new password"
            subtitle="Almost there. Choose a strong password to protect your account."
        >
            {error && (
                <div className="mb-4 flex items-center gap-2 text-rose-500 bg-rose-50 p-3 rounded-lg">
                    <XCircle className="w-4 h-4" />
                    <span className="text-xs font-medium">{error}</span>
                </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>

                {/* New Password */}
                <div className="relative">
                    <AuthInput
                        label="New Password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                    />
                    <div className="absolute right-3 top-10">
                        {isMinLength ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : password.length > 0 ? (
                            <AlertCircle className="w-4 h-4 text-rose-400" />
                        ) : null}
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="relative">
                    <AuthInput
                        label="Confirm New Password"
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={loading}
                    />
                    <div className="absolute right-3 top-10">
                        {confirmPassword.length > 0 && (
                            isMatch ? (
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                            ) : (
                                <XCircle className="w-4 h-4 text-rose-400" />
                            )
                        )}
                    </div>
                </div>

                {/* Rules */}
                <div className="bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-100">
                    <div className={`flex items-center gap-2 text-[12px] font-medium ${isMinLength ? 'text-green-600' : 'text-slate-500'
                        }`}>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        At least 8 characters
                    </div>

                    {confirmPassword.length > 0 && (
                        <div className={`flex items-center gap-2 text-[12px] font-medium ${isMatch ? 'text-green-600' : 'text-red-500'
                            }`}>
                            {isMatch ? (
                                <CheckCircle2 className="w-3.5 h-3.5" />
                            ) : (
                                <XCircle className="w-3.5 h-3.5" />
                            )}
                            {isMatch ? 'Passwords match' : 'Passwords do not match'}
                        </div>
                    )}
                </div>

                {/* Submit */}
                <AuthButton disabled={!canSubmit} type="submit">
                    {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        'Update Password'
                    )}
                </AuthButton>
            </form>

            <div className="mt-8 flex items-center justify-center gap-2 text-slate-400">
                <ShieldCheck className={`w-4 h-4 ${canSubmit ? 'text-green-500' : 'text-slate-300'
                    }`} />
                <p className="text-[11px] font-medium text-center">
                    Your password will be updated across all sessions
                </p>
            </div>
        </AuthLayout>
    );
};

export default ResetPassword;

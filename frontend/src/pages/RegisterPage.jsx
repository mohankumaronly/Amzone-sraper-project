import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import AuthLayout from '../Layouts/AuthLayout';
import AuthInput from '../components/AuthInputs';
import AuthButton from '../components/AuthButton';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';
import { userRegister } from '../services/api.service';

const RegisterPage = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const validation = {
        firstName: formData.firstName.trim().length >= 2,
        lastName: formData.lastName.trim().length >= 2,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
        password: formData.password.length >= 8
    };

    const isFormInvalid = Object.values(validation).some(valid => !valid);

    const handleChange = (e, field) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isFormInvalid || loading) return;

        setLoading(true);
        setError("");

        try {
            const payload = {
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                email: formData.email.trim(),
                password: formData.password,
            };

            await userRegister(payload);
            navigate("/email-verification");

        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            {error && (
                <p className="text-xs text-rose-500 bg-rose-50 p-2 rounded">
                    {error}
                </p>
            )}
            {loading && <LoadingScreen />}
            <AuthLayout
                title="Create your account"
                subtitle="Join 500+ sellers extracting data daily."
            >
                <form className="space-y-4" onSubmit={handleSubmit}>

                    <div className="grid grid-cols-2 gap-4">
                        <AuthInput
                            label="First Name"
                            placeholder="John"
                            value={formData.firstName}
                            onChange={(e) => handleChange(e, 'firstName')}
                        />
                        <AuthInput
                            label="Last Name"
                            placeholder="Doe"
                            value={formData.lastName}
                            onChange={(e) => handleChange(e, 'lastName')}
                        />
                    </div>

                    <div className="relative">
                        <AuthInput
                            label="Email Address"
                            type="email"
                            placeholder="name@company.com"
                            value={formData.email}
                            onChange={(e) => handleChange(e, 'email')}
                        />
                        {formData.email && (
                            <div className="absolute right-3 top-10">
                                {validation.email ?
                                    <CheckCircle2 className="w-4 h-4 text-green-500" /> :
                                    <AlertCircle className="w-4 h-4 text-rose-400" />
                                }
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <AuthInput
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => handleChange(e, 'password')}
                        />
                        <p className={`text-[10px] mt-1 ${validation.password ? 'text-green-500' : 'text-slate-400'}`}>
                            {validation.password ? '✓ Ready to go' : '• Minimum 8 characters'}
                        </p>
                    </div>

                    <AuthButton
                        icon={ArrowRight}
                        disabled={isFormInvalid || loading}
                    >
                        {loading ? "Creating..." : "Create Account"}
                    </AuthButton>


                    <div className="flex items-start gap-2 py-2">
                        <ShieldCheck className={`w-4 h-4 mt-0.5 ${!isFormInvalid ? 'text-green-500' : 'text-slate-300'}`} />
                        <p className="text-xs text-slate-500">
                            Secure, encrypted registration.
                        </p>
                    </div>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                    <p className="text-sm text-slate-500">
                        Already have an account?{' '}
                        <span onClick={() => navigate('/login')} className="text-orange-600 font-bold hover:underline cursor-pointer">
                            Sign In
                        </span>
                    </p>
                </div>
            </AuthLayout>
        </>
    );
};

export default RegisterPage;
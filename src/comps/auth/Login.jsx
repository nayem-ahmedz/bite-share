import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { motion } from "motion/react";
import GoogleLogin from "./GoogleLogin";
import useAuth from "../../hooks/useAuth";
import Loading from '../../utils/Loading';

export default function Login() {
    const [error, setError] = useState('');
    const { loginUser, currentUser, loading } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const destiny = location.state || '/';
    function handleSubmit(e) {
        e.preventDefault();
        setError('');
        const email = e.target.email.value.trim();
        const password = e.target.password.value.trim();
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }
        loginUser(email, password)
            .then(userCredintial => {
                e.target.reset();
                const firstName = userCredintial.user.displayName.split(' ')[0];
                toast.success(`Welcome ${firstName}`);
                navigate(destiny);
            })
            .catch(error => {
                if (error.code === 'auth/invalid-credential') {
                    setError('Invalid Email/Password!');
                } else {
                    setError(error.code);
                }
            });
    }
    if(loading) return <Loading />
    if(currentUser) return <Navigate to='/dashboard' replace />
    return (
        <motion.section
            className="flex justify-center w-full px-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <title>Login | BiteShare</title>

            <motion.div
                className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl my-20"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <div className="card-body">
                    <h2 className="text-2xl md:text-3xl font-bold text-center">Welcome Back!</h2>

                    <form onSubmit={handleSubmit}>
                        <fieldset className="fieldset">
                            <label htmlFor="email" className="label mt-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="input w-full"
                                placeholder="Email"
                                required
                            />

                            <label htmlFor="password" className="label mt-1">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="input w-full"
                                placeholder="Password"
                                required
                            />

                            {error && (
                                <motion.p
                                    className="text-red-500 mt-2 text-base text-center font-medium"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    {error}
                                </motion.p>
                            )}

                            <motion.button
                                type="submit"
                                className="btn btn-neutral mt-4"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Login
                            </motion.button>
                        </fieldset>
                    </form>
                    <p className="text-center text-base mt-2">OR</p>
                    <GoogleLogin />
                    <p className="mt-1 text-center">
                        Don't have an account?{" "}
                        <Link to='/auth/register' className="underline">Register</Link>
                    </p>
                </div>
            </motion.div>
        </motion.section>
    );
}
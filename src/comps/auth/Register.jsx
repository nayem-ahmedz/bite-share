import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { motion } from "motion/react";
import useAuth from "../../hooks/useAuth";
import GoogleLogin from "./GoogleLogin";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function Register() {
    const [error, setError] = useState('');
    const [ loading, setLoading ] = useState(false);
    const { createUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    function handleSubmit(e) {
        setLoading(true);
        e.preventDefault();
        setError('');
        const displayName = e.target.name.value.trim();
        const email = e.target.email.value.trim();
        const photoURL = e.target.photoURL.value.trim();
        const password = e.target.password.value.trim();
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setError('Password needs an uppercase letter');
            return;
        }
        if (!/[a-z]/.test(password)) {
            setError('Password needs a lowercase letter');
            return;
        }
        // user info to send to DB
        const userData = {
            name: displayName, email, photoURL
        };
        // creating a new user using email and password
        createUser(email, password)
            .then(userCredential => {
                e.target.reset();
                updateUserProfile(userCredential.user, { displayName, photoURL })
                    .then(() => {
                        axiosSecure.post('/api/user', userData)
                          .then(res => {
                            console.log(res);
                            toast.success('Account created Succesfully!');
                            navigate('/');
                          });
                    })
                    .catch(error => {
                        setError(error.message)
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    setError('Account already exist with this email')
                } else {
                    setError(error.code);
                }
                setLoading(false);
            });
    }
    return (
        <section className="flex justify-center w-full px-6">
            <title>Register | BiteShare</title>
            <motion.div
                className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl my-20"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="card-body">
                    <h2 className="text-2xl md:text-3xl font-bold text-center">You are few steps away</h2>
                    <form onSubmit={handleSubmit}>
                        <fieldset className="fieldset">
                            <label htmlFor="name" className="label mt-1">Name</label>
                            <input type="text" id="name" name="name" className="input w-full" placeholder="Full Name" required />
                            <label htmlFor="email" className="label mt-1">Email</label>
                            <input type="email" id="email" name="email" className="input w-full" placeholder="Email" required />
                            <label htmlFor="photo-url" className="label mt-1">Photo URL</label>
                            <input type="url" id="photo-url" name="photoURL" className="input w-full" placeholder="Photo Link" required />
                            <label htmlFor="password" className="label mt-1">Password</label>
                            <input type="password" id="password" name="password" className="input w-full" placeholder="Password" required />
                            {error && <p className="text-red-500 mt-2 text-base text-center font-medium">{error}</p>}
                            <button type="submit" className="btn btn-neutral mt-4" disabled={loading}>Register</button>
                        </fieldset>
                    </form>
                    <p className="text-center text-base">OR</p>
                    <GoogleLogin />
                    <p className="mt-1">
                        Already have an account? <Link to='/auth/login' className="underline">Login</Link>
                    </p>
                </div>
            </motion.div>
        </section>
    );
}
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "motion/react";

export default function Register() {
    const [error, setError] = useState('');
    const { createUser, updateUserProfile, continueWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    function handleSubmit(e) {
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
        // creating a new user using email and password
        createUser(email, password)
            .then(userCredential => {
                e.target.reset();
                updateUserProfile(userCredential.user, { displayName, photoURL })
                    .then(() => {
                        toast.success('Account created Succesfully!');
                        navigate('/');
                        saveToDb(userCredential.user);
                    })
                    .catch(error => setError(error.message));
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    setError('Account already exist with this email')
                } else {
                    setError(error.code);
                }
            });
    }
    // continue with google
    const googleAuth = () => {
        continueWithGoogle()
            .then(result => {
                const firstName = result.user.displayName.split(' ')[0];
                toast.success(`Welcome ${firstName}`);
                navigate('/');
                saveToDb(result.user);
            })
            .catch(error => setError(error.message));
    }
    // save the user to database
    const saveToDb = (userInfo) => {
        userInfo.getIdToken()
            .then(idToken => {
                const user = {
                    name: userInfo.displayName,
                    email: userInfo.email,
                    photoURL: userInfo.photoURL,
                    authUserID: userInfo.uid
                }
                fetch(`${import.meta.env.VITE_BACKEND_URL}users`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${idToken}`
                    },
                    body: JSON.stringify(user)
                })
                    .then(res => res.json())
                    .then(data => console.log(data))
                    .catch(error => console.log(error));
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
                            <button type="submit" className="btn btn-neutral mt-4">Register</button>
                        </fieldset>
                    </form>
                    <p className="text-center text-base">OR</p>
                    <button onClick={googleAuth} className="btn bg-white text-black border-[#e5e5e5]">
                        {/* Google SVG */}
                        Continue with Google
                    </button>
                    <p className="mt-1">
                        Already have an account? <Link to='/auth/login' className="underline">Login</Link>
                    </p>
                </div>
            </motion.div>
        </section>
    );
}
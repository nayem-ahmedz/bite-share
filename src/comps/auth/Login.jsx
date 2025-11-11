import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

export default function Login() {
    const [error, setError] = useState('');
    const { loginUser, continueWithGoogle } = useContext(AuthContext);
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
                if(error.code === 'auth/invalid-credential'){
                    setError('Invalid Email/Password!');
                } else{
                    setError(error.code);
                }
            });
    }
    const googleAuth = () => {
        continueWithGoogle()
            .then(result => {
                const firstName = result.user.displayName.split(' ')[0];
                toast.success(`Welcome ${firstName}`);
                navigate(destiny);
            })
            .catch(error => setError(error.message));
    }
    return (
        <section className="flex justify-center w-full px-6">
            <title>Login | BiteShare</title>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl my-20">
                <div className="card-body">
                    <h2 className="text-2xl md:text-3xl font-bold text-center">Welcome Back!</h2>
                    <form onSubmit={handleSubmit}>
                        <fieldset className="fieldset">
                            <label htmlFor="email" className="label mt-1">Email</label>
                            <input type="email" id="email" name="email" className="input w-full" placeholder="Email" required />
                            <label htmlFor="password" className="label mt-1">Password</label>
                            <input type="password" id="password" name="password" className="input w-full" placeholder="Password" required />
                            {
                                error && <p className="text-red-500 mt-2 text-base text-center font-medium">{error}</p>
                            }
                            <button type="submit" className="btn btn-neutral mt-4">Login</button>
                        </fieldset>
                    </form>
                    <p className="text-center text-base">OR</p>
                    {/* Google */}
                    <button onClick={googleAuth} className="btn bg-white text-black border-[#e5e5e5]">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Continue with Google
                    </button>
                    <p className="mt-1">
                        Dont have an account? <Link to='/auth/register' className="underline">Register</Link>
                    </p>
                </div>
            </div>
        </section>
    );
}
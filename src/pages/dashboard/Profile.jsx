import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

export default function Profile() {
    const { currentUser } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    useEffect(() => {
        async function getProfile() {
            try {
                const response = await axiosSecure.get(`/api/user/profile?email=${currentUser.email}`);
                if (response.data.success) {
                    setProfile(response.data.user);
                } else {
                    toast.error('Unable to Get the Profile');
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        getProfile();
    }, []);
    return (
        <section className="hero bg-base-200 min-h-screen">
            <title>My Profile | Dashboard</title>
            {
                loading ? <span className="loading loading-spinner loading-lg"></span> : <div className="hero-content flex-col lg:flex-row gap-8">
                    <div>
                        <img
                            src={profile.photoURL || "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"}
                            alt="Profile"
                            className="w-full max-w-sm rounded-lg shadow-2xl mx-auto"
                        />
                    </div>
                    <div className="w-full bg-base-100">
                        <div className=" shadow-md p-6 rounded-lg space-y-2">
                            <p><strong>Name:</strong> {profile.name}</p>
                            <p><strong>Email:</strong> {profile.email}</p>
                            <p><strong>Role:</strong> {profile.role}</p>
                            <p><strong>Status:</strong> {profile.status}</p>
                            <p><strong>Account Created:</strong> {new Date(profile.createdAt).toLocaleString()}</p>
                            <p><strong>Last Updated:</strong> {new Date(profile.updatedAt).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            }
        </section>
    );
}
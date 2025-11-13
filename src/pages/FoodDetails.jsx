import { useLoaderData } from "react-router";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

export default function FoodDetails() {
    const food = useLoaderData();
    const { currentUser } = useContext(AuthContext); // get logged-in user
    const [modalOpen, setModalOpen] = useState(false);
    const [location, setLocation] = useState('');
    const [reason, setReason] = useState('');
    const [contact, setContact] = useState('');
    const [loading, setLoading] = useState(false);
    const handleRequestSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser) return Swal.fire("Error", "You must be logged in to request food", "error");

        setLoading(true);
        const requestData = {
            foodId: food._id,
            userEmail: currentUser.email,
            userName: currentUser.displayName,
            userPhoto: currentUser.photoURL,
            location,
            reason,
            contact,
            status: "pending"
        };
        try {
            const idToken = await currentUser.getIdToken();
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}food-requests`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${idToken}`
                },
                body: JSON.stringify(requestData)
            });
            const data = await res.json();
            if (data.insertedId) {
                Swal.fire("Success", "Your request has been submitted!", "success");
                setModalOpen(false);
                setLocation('');
                setReason('');
                setContact('');
            } else {
                Swal.fire("Error", "Failed to submit request", "error");
            }
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Something went wrong", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-10 px-4 md:px-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Food Details</h2>

            <div className="card lg:card-side bg-base-100 shadow-xl mx-auto max-w-4xl">
                <figure className="lg:w-1/2 aspect-3/2">
                    <img
                        src={food.imageUrl}
                        alt={food.foodName}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </figure>
                <div className="card-body lg:w-1/2 lg:pl-10">
                    <h3 className="card-title text-2xl font-bold">{food.foodName}</h3>
                    <p className="text-gray-600 mb-2"><strong>Status:</strong> <span className={food.foodStatus === 'Available' ? 'text-green-600' : 'text-red-600'}>{food.foodStatus}</span></p>
                    <p className="text-gray-700 mb-2"><strong>Quantity:</strong> Serves {food.foodQuantity} {food.foodQuantity > 1 ? 'people' : 'person'}</p>
                    <p className="text-gray-700 mb-2"><strong>Pickup Location:</strong> {food.pickupLocation}</p>
                    <p className="text-gray-700 mb-2"><strong>Expire Date:</strong> {new Date(food.expireDate).toLocaleDateString()}</p>
                    <p className="text-gray-700 mb-4"><strong>Notes:</strong> {food.notes}</p>

                    <div className="flex items-center mt-4">
                        <img
                            src={food.donatorPhoto}
                            alt={food.donator}
                            className="w-12 h-12 rounded-full mr-3 border border-gray-200"
                        />
                        <div>
                            <p className="text-gray-800 font-medium">{food.donator}</p>
                            <p className="text-gray-500 text-sm">{food.email}</p>
                        </div>
                    </div>

                    <div className="card-actions mt-6">
                        <button className="btn btn-primary btn-outline mx-auto" onClick={() => setModalOpen(true)}>Request Food</button>
                        {/* <button className="btn btn-primary btn-outline mx-auto">Request Food</button> */}
                        {/* <button className="btn btn-outline">Contact Donator</button> */}
                    </div>
                </div>
            </div>
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-base-100 p-6 rounded-lg w-full max-w-md">
                        <h3 className="text-2xl font-bold mb-4 text-center">Request Food</h3>
                        <form onSubmit={handleRequestSubmit}>
                            <label className="label">Location</label>
                            <input type="text" className="input w-full mb-2" value={location} onChange={e => setLocation(e.target.value)} required />

                            <label className="label">Why Need Food</label>
                            <textarea className="textarea w-full mb-2" value={reason} onChange={e => setReason(e.target.value)} required></textarea>

                            <label className="label">Contact No.</label>
                            <input type="text" className="input w-full mb-4" value={contact} onChange={e => setContact(e.target.value)} required />

                            <div className="flex justify-between">
                                <button type="button" className="btn btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
                                <button type="submit" className={`btn btn-primary ${loading ? 'loading' : ''}`}>Submit Request</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}
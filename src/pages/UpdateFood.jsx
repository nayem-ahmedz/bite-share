import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

export default function UpdateFood() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const [food, setFood] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchFood() {
            try {
                const idToken = await currentUser.getIdToken();
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}foods/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${idToken}`
                    }
                });
                const data = await res.json();
                setFood(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        }
        fetchFood();
    }, [id, currentUser]);

    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const updatedFood = {
            email: currentUser.email,
            foodName: form.foodName.value,
            foodQuantity: form.foodQuantity.value,
            pickupLocation: form.pickupLocation.value,
            expireDate: form.expireDate.value,
            notes: form.notes.value,
            imageUrl: form.imageUrl.value,
            foodStatus: form.foodStatus.value,
        };

        try {
            const idToken = await currentUser.getIdToken();
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}foods/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${idToken}`
                },
                body: JSON.stringify(updatedFood),
            });
            const result = await res.json();
            if (res.ok) {
                if(result.modifiedCount){
                    toast.success('Food updated successfully!');
                    navigate("/my-foods");
                } else{
                    toast.warning('No change was made!');
                }
            } else {
                toast.error('Failed to update food.');
            }
        } catch (err) {
            toast.warning('Unexpected error occurs');
        }
    }

    if (loading) return <p className="p-10 text-center">Loading...</p>;
    if (!food) return <p className="p-10 text-center text-red-500">Food not found</p>;

    return (
        <section className="max-w-3xl mx-auto p-6 bg-base-100 rounded-box shadow">
            <h2 className="text-2xl font-semibold mb-4 text-center">Update Food</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img src={food.imageUrl} alt={food.foodName} className="w-full max-w-md mx-auto rounded-xl" />
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="foodName"
                        defaultValue={food.foodName}
                        placeholder="Food Name"
                        className="input input-bordered w-full"
                    />
                    <input
                        type="number"
                        name="foodQuantity"
                        defaultValue={food.foodQuantity}
                        placeholder="Quantity"
                        className="input input-bordered w-full"
                    />
                    <input
                        type="text"
                        name="pickupLocation"
                        defaultValue={food.pickupLocation}
                        placeholder="Pickup Location"
                        className="input input-bordered w-full"
                    />
                    <input
                        type="date"
                        name="expireDate"
                        defaultValue={food.expireDate}
                        className="input input-bordered w-full"
                    />
                    <input
                        type="text"
                        name="imageUrl"
                        defaultValue={food.imageUrl}
                        placeholder="Image URL"
                        className="input input-bordered w-full"
                    />
                    <select
                        name="foodStatus"
                        defaultValue={food.foodStatus}
                        className="select select-bordered w-full"
                    >
                        <option>Available</option>
                        <option>Delivered</option>
                        <option>Expired</option>
                    </select>
                    <textarea
                        name="notes"
                        defaultValue={food.notes}
                        placeholder="Notes"
                        className="textarea textarea-bordered w-full"
                    ></textarea>

                    <div className="flex justify-between">
                        <button type="button" className="btn" onClick={() => navigate(-1)}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Update</button>
                    </div>
                </form>
            </div>
        </section>
    );
}
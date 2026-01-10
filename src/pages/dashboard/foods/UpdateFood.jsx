import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function UpdateFood() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [food, setFood] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        async function fetchFood() {
            try {
                const res = await axiosSecure.get(`/api/food/${id}`);
                if(res.data.status){
                    setFood(res.data.food);
                }
            } catch (err) {
                console.error(err);
            } finally {
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
            foodQuantity: Number(form.foodQuantity.value),
            pickupLocation: form.pickupLocation.value,
            expireDate: form.expireDate.value,
            notes: form.notes.value,
            imageUrl: form.imageUrl.value,
            foodStatus: form.foodStatus.value,
        };

        // Normalize for comparison
        const isChanged = ['foodName', 'foodQuantity', 'pickupLocation', 'expireDate', 'notes', 'imageUrl', 'foodStatus'].some(key => {
            let oldValue = '';
            if (key === 'expireDate') {
                oldValue = food[key] ? food[key].slice(0, 10) : '';
            } else {
                oldValue = (food[key] ?? '').toString();
            }
            const newValue = (updatedFood[key] ?? '').toString();
            return newValue !== oldValue;
        });

        if (!isChanged) {
            toast.info('No changes were made!');
            return;
        }

        try {
            const res = await axiosSecure.patch(`/api/food/${id}`, updatedFood);
            if (res.data.success) {
                toast.success('Food updated successfully!');
                navigate("/dashboard/manage-foods");
            } else {
                toast.error('Failed to update food.');
            }
        } catch (err) {
            toast.error('Unexpected error occurs');
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
                        defaultValue={food.expireDate.slice(0, 10)}
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
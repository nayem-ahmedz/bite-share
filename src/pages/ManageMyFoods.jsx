import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";
import Swal from "sweetalert2";
import Loading from "../utils/Loading";

export default function ManageMyFoods() {
    const { currentUser } = useContext(AuthContext);
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchFoods = async () => {
            if (!currentUser) return;
            try {
                const idToken = await currentUser.getIdToken();
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}my-food?email=${currentUser.email}`, {
                    headers: { 'Authorization': `Bearer ${idToken}` }
                });
                const data = await res.json();
                setFoods(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false); // NEW
            }
        };
        fetchFoods();
    }, [currentUser]);
    const handleDelete = async (id) => {
        const idToken = await currentUser.getIdToken();
        Swal.fire({
            title: "Are you sure to Delete",
            text: "this food?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, continue!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${import.meta.env.VITE_BACKEND_URL}foods/${id}?email=${currentUser.email}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${idToken}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted Food",
                                text: "You have successfully deleted the food.",
                                icon: "success"
                            });
                            setFoods(prev => prev.filter(food => food._id !== id));
                        } else {
                            Swal.fire({
                                title: "Oops!",
                                text: "Food not deleted.",
                                icon: "warning"
                            });
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            title: "OPPS!",
                            text: "Error Deleting food.",
                            icon: "error"
                        });
                    });
            }
        });
    }
    if(loading) return <Loading />
    return (
        <section className="p-4">
            <ul className="list bg-base-100 rounded-box shadow-md max-w-4xl mx-auto my-10">
                <li className="p-4 pb-2 text-2xl opacity-60 tracking-wide">My foods</li>
                {
                    foods.map(food => <li key={food._id} className="list-row items-center flex sm:flex-row">
                        <div className="aspect-square w-40">
                            <img className="rounded-box w-full h-full bg-gray-300" src={food.imageUrl} alt={food.foodName} />
                        </div>
                        <div className="flex w-full flex-col sm:flex-row gap-3">
                            <div className="grow space-y-3">
                                <div className="text-xl">{food.foodName}</div>
                                <div className="text-sm uppercase font-semibold opacity-60">Expire Date : {food.expireDate}</div>
                            </div>
                            <div className="flex gap-2">
                                <Link to={`/update-food/${food._id}`} className="btn btn-sm md:btn-md">
                                    <i className="fa-solid fa-pen-to-square"></i>
                                    Update
                                </Link>
                                <button className="btn btn-sm md:btn-md" onClick={() => handleDelete(food._id)}>
                                    <i className="fa-solid fa-trash"></i>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </li>)
                }
                {
                    !loading && foods.length === 0 && (
                        <li className="list-row text-base py-6 text-red-400">No Foods Donated Yet!</li>
                    )
                }
            </ul>
        </section>
    );
}
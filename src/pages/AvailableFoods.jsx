import { useEffect, useState } from "react";
import FoodCard from "../comps/food/FoodCard";
import FoodCardSkeleton from "../utils/FoodCardSkeleton";
import { toast } from "react-toastify";

async function getAvailableFoods() {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/food`);
    if (!res.ok) {
        throw new Error("Failed to fetch foods");
    }
    return res.json();
}

export default function AvailableFoods() {
    const [loading, setLoading] = useState(true);
    const [foods, setFoods] = useState([]);
    useEffect(() => {
        async function fetchFood() {
            try {
                const data = await getAvailableFoods();
                setFoods(data.foods);
            } catch (err) {
                toast.error('Failed to load foods');
            } finally {
                setLoading(false);
            }
        }
        fetchFood();
    }, []);
    return (
        <section className="p-4 my-6 md:mb-10">
            <title>Available Foods | Bite Share</title>
            <h2 className="text-3xl text-center font-bold mb-4">All Available Foods</h2>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {
                    loading ?
                        [...Array(6)].map((_, index) => <FoodCardSkeleton key={index} />)
                        :
                        foods.map(food => <FoodCard key={food._id} food={food} />)
                }
            </section>
            {
                !loading && foods.length === 0 && (
                    <h3 className="text-center text-xl sm:text-2xl my-10">No foods to show</h3>
                )
            }
        </section>
    );
}
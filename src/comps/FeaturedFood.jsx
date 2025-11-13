import { Link } from "react-router";
import FoodCard from "./FoodCard";
import { useEffect, useState } from "react";
import Loading from "../utils/Loading";

export default function FeaturedFood() {
    const [featuredFoods, setFeaturedFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchFeaturedFoods = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}featured-foods`);
                const data = await res.json();
                setFeaturedFoods(data);
            } catch (err) {
                console.error("Error fetching featured foods:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedFoods();
    }, []);
    if (loading) return <Loading />;
    return (
        <article className="p-4 my-6 md:my-10">
            <h2 className="text-3xl text-center font-bold mb-4">Featured Food</h2>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {
                    featuredFoods.map(food => <FoodCard key={food._id} food={food} />)
                }
            </section>
            {
                featuredFoods.length === 0 && <h3 className="text-center text-xl sm:text-2xl my-10">No foods to show</h3>
            }
            <p className="text-center mt-6 md:mt-10">
                <Link to='/available-foods' className="btn btn-primary">Show All Food</Link>
            </p>
        </article>
    );
}
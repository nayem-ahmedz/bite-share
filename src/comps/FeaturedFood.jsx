import { Link } from "react-router";
import FoodCard from "./FoodCard";

export default function FeaturedFood(){
    return(
        <article className="p-4 my-6 md:my-10">
            <h2 className="text-3xl text-center font-bold mb-4">Featured Food</h2>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
            </section>
            <p className="text-center mt-6 md:mt-10">
                <Link to='/available-foods' className="btn btn-primary">Show All Food</Link>
            </p>
        </article>
    );
}
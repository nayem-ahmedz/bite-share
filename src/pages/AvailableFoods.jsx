import FoodCard from "../comps/FoodCard";

export default function AvailableFoods() {
    return (
        <section className="p-4 my-6 md:my-10">
            <h2 className="text-3xl text-center font-bold mb-4">All Available Foods</h2>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
            </section>
        </section>
    );
}
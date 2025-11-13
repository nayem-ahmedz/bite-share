import { useLoaderData } from "react-router";

export default function FoodDetails() {
    const food = useLoaderData();
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
                        <button className="btn btn-primary btn-outline mx-auto">Request Food</button>
                        {/* <button className="btn btn-outline">Contact Donator</button> */}
                    </div>
                </div>
            </div>
        </section>
    );
}
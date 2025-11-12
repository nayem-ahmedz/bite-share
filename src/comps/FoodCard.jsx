import { Link } from "react-router";

export default function FoodCard({ food }) {
    return (
        <div className="card bg-base-100 shadow-sm">
            <figure className="relative aspect-3/2">
                <img src={food.imageUrl} alt={`screenshot of ${food.foodName}`} className="w-full h-full" />
                <div className="avatar absolute right-1 bottom-1">
                    <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                        <img src={food.donatorPhoto} alt={food.donator} />
                    </div>
                </div>
            </figure>
            <div className="card-body">
                <h2 className="card-title text-2xl">{food.foodName}</h2>
                <h3 className="text-xl">Donated By {food.donator}</h3>
                <p className="text-base">Can serve upto {food.foodQuantity} people</p>
                <p className="text-base">Pickup Location : {food.pickupLocation}</p>
                <p className="text-base">Expire Date : {food.expireDate}</p>
                <div className="card-actions justify-end">
                    <Link to={`/foods/${food._id}`} className="btn btn-primary btn-outline">View Details</Link>
                </div>
            </div>
        </div>
    );
}
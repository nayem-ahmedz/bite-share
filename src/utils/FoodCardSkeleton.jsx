import { motion } from "motion/react";

export default function FoodCardSkeleton() {
    return (
        <motion.div
            className="card bg-base-100 shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {/* Image skeleton */}
            <figure className="relative aspect-3/2">
                <div className="skeleton w-full h-full"></div>

                {/* Avatar skeleton */}
                <div className="absolute right-1 bottom-1">
                    <div className="skeleton w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"></div>
                </div>
            </figure>
            <div className="card-body space-y-3">
                {/* Title */}
                <div className="skeleton h-6 w-3/4"></div>

                {/* Donator */}
                <div className="skeleton h-5 w-1/2"></div>

                {/* Quantity */}
                <div className="skeleton h-4 w-2/3"></div>

                {/* Location */}
                <div className="skeleton h-4 w-full"></div>

                {/* Expire date */}
                <div className="skeleton h-4 w-1/3"></div>

                {/* Button */}
                <div className="card-actions justify-end mt-2">
                    <div className="skeleton h-10 w-32 rounded-lg"></div>
                </div>
            </div>
        </motion.div>
    );
}
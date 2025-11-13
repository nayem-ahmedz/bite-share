import { Link } from 'react-router';
import HeroImg from '../assets/hero-2.webp';
import { motion } from "motion/react"

export default function Banner() {
    return (
        <section
            className="hero min-h-[80vh] bg-cover bg-no-repeat md:bg-center"
            style={{ backgroundImage: `url('${HeroImg}')` }}
        >
            <div className="hero-overlay bg-black/50"></div>
            <div className="hero-content text-neutral-content md:text-center">
                <motion.div
                    className="max-w-md"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <motion.h1
                        className="mb-5 text-5xl font-bold"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        Bite Share
                    </motion.h1>

                    <motion.p
                        className="mb-5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        Tired of eating? Don't waste your food. Share it with someone and share love. Hungry? Don’t worry! Check out the donated food items and choose one and get it at your door by our community-driven food sharing platform.
                    </motion.p>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link to='/available-foods' className="btn btn-primary">
                            View All Foods
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
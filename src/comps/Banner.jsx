import { Link } from 'react-router';
import HeroImg from '../assets/hero-2.webp';
export default function Banner() {
    return (
        <section className="hero min-h-[80vh] bg-position-[80%] md:bg-center" style={{ backgroundImage: `url('${HeroImg}')`,}}>
            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content md:text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Bite Share</h1>
                    <p className="mb-5">
                        Tired of eating? Don't waste your food. Share it with someone and share love. Hungry? Dont worry! Check out the donated food items and choose one and get it in your door by our community driven food sharing platform
                    </p>
                    <Link to='/available-foods' className="btn btn-primary">View All Foods</Link>
                </div>
            </div>
        </section>
    );
}
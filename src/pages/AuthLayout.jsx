import { Outlet } from 'react-router';
import HeroImg from '../assets/hero-2.png';

export default function Auth() {
    return (
        <section className="hero min-h-[80vh] bg-position-[80%] md:bg-center" style={{ backgroundImage: `url('${HeroImg}')`, }}>
            <div className="hero-overlay"></div>
            <Outlet />
        </section>
    );
}
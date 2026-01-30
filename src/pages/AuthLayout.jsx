import { Navigate, Outlet } from 'react-router';
import HeroImg from '../assets/hero-2.webp';
import useAuth from '../hooks/useAuth';
import Loading from '../utils/Loading';

export default function Auth() {
    const { currentUser, loading } = useAuth();
    if(loading) return <Loading />
    if(currentUser) return <Navigate to='/dashboard' replace />
    return (
        <section className="hero min-h-[80vh] bg-position-[80%] md:bg-center" style={{ backgroundImage: `url('${HeroImg}')`, }}>
            <div className="hero-overlay"></div>
            <Outlet />
        </section>
    );
}
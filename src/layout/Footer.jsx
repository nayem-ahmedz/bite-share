import { Link } from 'react-router';
import Logo from '../assets/logo2-nobg.png';

export default function Footer() {
    return (
        <footer className='bg-neutral'>
            <section className="footer sm:footer-horizontal text-neutral-content p-6 md:p-10 items-center containerr">
                <aside>
                    <img src={Logo} alt="bite share logo" className='w-24' />
                    <h2 className='text-2xl font-bold'>Bite Share</h2>
                    <p className="font-bold text-base">
                        A community food sharing platform since 2025
                    </p>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
                </aside>
                <nav>
                    <h6 className="footer-title mt-4">Quick Links</h6>
                    <nav className="grid grid-flow-col gap-4">
                        <Link to='/' className="link link-hover text-base">Home</Link>
                        <Link to='/available-foods' className="link link-hover text-base">Available Foods</Link>
                        <Link to='/auth/login' className="link link-hover text-base">Login</Link>
                        <Link to='/auth/register' className="link link-hover text-base">Register</Link>
                    </nav>
                    <h6 className="footer-title mt-4">Social</h6>
                    <div className="grid grid-flow-col gap-5">
                        <a className='text-2xl'> <i className="fa-brands fa-facebook-f"></i> </a>
                        <a className='text-2xl'> <i className="fa-brands fa-x-twitter"></i> </a>
                        <a className='text-2xl'> <i className="fa-brands fa-instagram"></i> </a>
                        <a className='text-2xl'> <i className="fa-brands fa-youtube"></i> </a>
                    </div>
                </nav>
            </section>
        </footer>
    );
}
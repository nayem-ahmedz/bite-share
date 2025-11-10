import { Link, NavLink } from 'react-router';
import Logo from '../assets/logo2-nobg.png';

export default function Header() {
    const navLinks = <>
        <li> <NavLink to='/' className='text-base'>Home</NavLink> </li>
        <li> <NavLink to='/available-foods' className='text-base'>Available Foods</NavLink> </li>
    </>;
    return (
        <header className="bg-base-100 shadow-sm">
            <nav className="navbar containerr py-0">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {
                                navLinks
                            }
                        </ul>
                    </div>
                    <img src={Logo} alt="bite share logo" className='w-24' />
                    <Link to='/' className="btn btn-ghost text-xl">BiteShare</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {
                            navLinks
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    <button className="btn">Login</button>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li> <Link to='/' className='text-sm'>Add Food</Link> </li>
                            <li> <Link to='/' className='text-sm'>Manage My Foods</Link> </li>
                            <li> <Link to='/' className='text-sm'>My Food Requests</Link> </li>
                            <li> <button className='text-sm'>Logout</button> </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
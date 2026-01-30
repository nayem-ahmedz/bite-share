import { Link, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import { RiDashboardFill } from "react-icons/ri";
import { IoAddCircle } from "react-icons/io5";
import { MdFastfood } from "react-icons/md";
import { BiSolidFoodMenu } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import ThemeToggler from "../utils/ThemeToggler";
import { ToastContainer } from "react-toastify";

export default function Dashboard() {
    const { currentUser } = useAuth();
    const navLinks = [
        { id: 1, text: 'Dashboard Home', link: '/dashboard/home', icon: RiDashboardFill },
        { id: 2, text: 'Add Food', link: '/dashboard/add-food', icon: IoAddCircle },
        { id: 3, text: 'Manage Foods', link: '/dashboard/manage-foods', icon: MdFastfood},
        { id: 4, text: 'My Food Requests', link: '/dashboard/my-request', icon: BiSolidFoodMenu },
        { id: 5, text: 'My Profile', link: '/dashboard/my-profile', icon: FaUser }
    ];
    return (
        <div className="drawer lg:drawer-open">
            <title>Dashboard | Bite Share</title>
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300 gap-2">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        {/* Sidebar toggle icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                    </label>
                    <div className="px-2 grow">User Dashboard</div>
                    <div>
                        <Link to='/' className="btn btn-secondary btn-outline">Exit Dashboard</Link>
                    </div>
                    <ThemeToggler />
                </nav>
                {/* Page content here */}
                <Outlet />
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow">
                        <li className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-base mb-4">
                            <div className="avatar justify-center cursor-default hover:bg-transparent">
                                <div className="w-6 is-drawer-open:w-20 rounded">
                                    <img src={currentUser?.photoURL} alt={currentUser?.displayName} />
                                </div>
                            </div>
                            <div className="is-drawer-close:hidden flex flex-col gap-0 cursor-default hover:bg-transparent">
                                <h2 className="text-2xl">{currentUser?.displayName}</h2>
                                <p>User</p> {/* <p>{role}</p> */}
                            </div>
                        </li>
                        {/* List item */}
                        {
                            navLinks.map(link => <li key={link.id}>
                                <Link to={link.link} className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-base" data-tip={link.text}>
                                    <link.icon className="text-xl md:text-2xl" />
                                    <span className="is-drawer-close:hidden"> {link.text} </span>
                                </Link>
                            </li>)
                        }
                    </ul>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
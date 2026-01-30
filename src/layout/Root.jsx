import './root.css';
import Header from "./Header";
import { Outlet, useNavigation } from 'react-router';
import Footer from './Footer';
import ScrollToTop from '../utils/ScrollToTop';
import { ToastContainer } from 'react-toastify';

export default function Root() {
    return (
        <ScrollToTop>
            <Header />
            <main className='containerr'>
                <Outlet />
            </main>
            <ToastContainer />
            <Footer />
        </ScrollToTop>
    );
}
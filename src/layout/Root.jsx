import './root.css';
import Header from "./Header";
import { Outlet } from 'react-router';
import Footer from './Footer';
import ScrollToTop from '../utils/ScrollToTop';
import { Suspense } from 'react';
import Loading from '../utils/Loading';
import { ToastContainer } from 'react-toastify';
import AuthProvider from '../context/AuthProvider';

export default function Root() {
    return (
        <ScrollToTop>
            <AuthProvider>
                <Header />
                <main className='containerr'>
                    <Suspense fallback={<Loading />}>
                        <Outlet />
                    </Suspense>
                </main>
                <ToastContainer />
                <Footer />
            </AuthProvider>
        </ScrollToTop>
    );
}
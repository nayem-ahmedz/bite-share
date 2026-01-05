import './root.css';
import Header from "./Header";
import { Outlet, useNavigation } from 'react-router';
import Footer from './Footer';
import ScrollToTop from '../utils/ScrollToTop';
import { Suspense } from 'react';
import Loading from '../utils/Loading';
import { ToastContainer } from 'react-toastify';

export default function Root() {
    const navigation = useNavigation();
    const isLoading = navigation.state === 'loading' || navigation.state === 'submitting';
    return (
        <ScrollToTop>
            <Header />
            <main className='containerr'>
                {
                    isLoading ? <Loading /> : (
                        <Suspense fallback={<Loading />}>
                            <Outlet />
                        </Suspense>
                    )
                }
            </main>
            <ToastContainer />
            <Footer />
        </ScrollToTop>
    );
}
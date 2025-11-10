import './root.css';
import Header from "./Header";
import { Outlet } from 'react-router';
import Footer from './Footer';
import ScrollToTop from '../utils/ScrollToTop';
import { Suspense } from 'react';
import Loading from '../utils/Loading';

export default function Root(){
    return(
        <ScrollToTop>
            <Header />
            <main className='containerr'>
                <Suspense fallback={<Loading />}>
                    <Outlet />
                </Suspense>
            </main>
            <Footer />
        </ScrollToTop>
    );
}
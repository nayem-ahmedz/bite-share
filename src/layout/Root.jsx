import './root.css';
import Header from "./Header";
import { Outlet } from 'react-router';
import Footer from './Footer';

export default function Root(){
    return(
        <>
            <Header />
            <main className='containerr'>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
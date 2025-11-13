import { Link } from "react-router";
import BG from '../assets/error-404.webp';

export default function NoPage(){
    return(
        <section className="pt-10 pb-20 flex flex-col gap-4 justify-center items-center">
            <img src={BG} alt="baby cry on error" className="w-full max-w-xs" />
            <h2 className="text-3xl">404 Page Not Found</h2>
            <Link to='/' className="btn btn-primary">Back to Home</Link>
        </section>
    );
}
import { Link } from "react-router";

export default function NoPage(){
    return(
        <section className="min-h-[60vh] flex flex-col gap-4 justify-center items-center">
            <h2 className="text-3xl">404 Page Not Found</h2>
            <Link to='/' className="btn btn-primary">Home</Link>
        </section>
    );
}
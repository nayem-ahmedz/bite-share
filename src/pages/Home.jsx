import { Suspense } from "react";
import Banner from "../comps/Banner";
import FeaturedFood from "../comps/FeaturedFood";
import Loading from "../utils/Loading";

const foodPromise = fetch(`${import.meta.env.VITE_BACKEND_URL}featured-foods`).then(res => res.json());

export default function Home(){
    return(
        <>
            <Banner />
            <Suspense fallback={<Loading />}>
                <FeaturedFood foodPromise={foodPromise} />
            </Suspense>
        </>
    );
}
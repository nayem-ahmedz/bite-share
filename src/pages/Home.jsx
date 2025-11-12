import { Suspense } from "react";
import Banner from "../comps/Banner";
import FeaturedFood from "../comps/FeaturedFood";
import Loading from "../utils/Loading";

const foodPromise = fetch('http://localhost:3000/featured-foods').then(res => res.json());

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
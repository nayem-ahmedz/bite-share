import Banner from "../comps/home/Banner";
import FAQ from "../comps/home/FAQ";
import FeaturedFood from "../comps/home/FeaturedFood";
import Procedures from "../comps/home/Procedures";

export default function Home(){
    return(
        <>
            <Banner />
            <FeaturedFood />
            <Procedures />
            <FAQ />
        </>
    );
}
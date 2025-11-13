import BG from '../assets/error-404.webp';

export default function ErrorPage(){
    console.log('loading...');
    return(
        <section className='min-h-[70vh] flex flex-col justify-center items-center'>
            <img src={BG} alt='baby cry on server issue' className='w-40 md:w-60 animate-ping' />
            <h1 className='text-3xl'>Internal Server Error!</h1>
        </section>
    );
}
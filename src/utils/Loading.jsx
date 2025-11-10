import Logo from '../assets/logo2-nobg.png';

export default function Loading(){
    console.log('loading...');
    return(
        <section className='min-h-[70vh] flex justify-center items-center'>
            <img src={Logo} alt='bite share logo' className='w-40 md:w-60 animate-ping' />
        </section>
    );
}
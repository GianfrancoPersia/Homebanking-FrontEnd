import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCreditCard, faLandmark, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'




const Home = () => {
    const user = useSelector(store => store.authReducer.user)
    console.log(user)


    return (
        <main className=' bg-blue-900 flex flex-col items-center pt-10 gap-8'>
            <h1 className='w-full text-3xl text-center text-white font-semibold'>Register today and get an account free!</h1>
            <Link to={"/register"} className='font-semibold text-xl text-blue-950 bg-blue-500 p-4 rounded-xl shadow-2xl hover:text-white'>Request account</Link>
            <img src="../../public/img/banner-mobile.png" alt="" />
            <section className='flex flex-col gap-6 bg-blue-500 w-full items-center py-6' >
                <div className='flex flex-col gap-2'>
                    <h2 className='w-full text-2xl text-center text-white font-semibold'>Services</h2>
                    <FontAwesomeIcon icon={faArrowDown} className='text-3xl text-white' />
                </div>

                <div className='flex flex-col gap-8 md:flex-row'>        
                    <article className='flex flex-col p-5 items-center bg-stone-100 rounded-xl gap-5 w-[250px] h-[140px] text-center justify-center shadow-2xl'>
                        <p className='text-blue-950 font-medium'>Request up to 3 accounts</p>
                        <div className='flex gap-2 text-blue-950'>
                            <FontAwesomeIcon icon={faUser} className='text-xl' />
                            <FontAwesomeIcon icon={faUser} className='text-xl' />
                            <FontAwesomeIcon icon={faUser} className='text-xl' />
                        </div>
                    </article>


                    <article className='flex flex-col p-5 items-center bg-stone-100 rounded-xl gap-5 w-[250px] h-[140px] text-center shadow-2xl'>
                        <p className='text-blue-950  font-medium'>Request SILVER, GOLD and TITANIUM cards</p>
                        <FontAwesomeIcon icon={faCreditCard} className='text-3xl' />
                    </article>


                    <article className='flex flex-col p-5 items-center bg-stone-100 rounded-xl gap-5 w-[250px] h-[140px] text-center shadow-2xl'>
                        <p className='text-blue-950  font-medium'>Apply for Mortgage, Personal and Auto loans</p>
                        <FontAwesomeIcon icon={faLandmark} className='text-3xl' />
                    </article>
                </div>


            </section>
        </main>
    )
}

export default Home
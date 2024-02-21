import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'


const MainLayout = (props) => {
  return (
    <div className='min-h-dvh w-full'>
        <Header/>
        {props.children}
        <Footer/>
    </div>
  )
}

export default MainLayout
import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'


const MainLayout = (props) => {
  return (
    <div className='main-layout'>
        <Header/>
        {props.children}
        <Footer/>
    </div>
  )
}

export default MainLayout
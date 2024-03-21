import React from 'react';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HeaderHome from '../components/HeaderHome';

const MainLayout = (props) => {
    const user = useSelector(store => store.authReducer.user);
    const isAuthenticated = user.loggedIn;

    return (
        <div className='min-h-dvh w-full'>
            {isAuthenticated ? <Header isAuthenticated={isAuthenticated} /> : <HeaderHome />}
            {props.children}
            <Footer />
        </div>
    );
};

export default MainLayout;

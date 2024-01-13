import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../states/actions/auth';
import Background3d from './Background3d.jsx';
import Navbar from '../Navbar.jsx';
import Footer from '../Footer.jsx';

const LandingPage = () => {

    const navigate = useNavigate();

    return (
        <div>
            <Navbar />

            <Background3d />
            <div className="hero min-h-screen bg-black bg-opacity-40">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Team-up With People Across The World</h1>
                        <p className="py-6">Build your perfect teams or groups of intellectual.</p>
                        <button className="btn btn-primary" onClick={() => navigate('/signup')}>Get Started</button>
                    </div>
                </div>
            </div>

            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src="images/group_vector_art.png" className="max-w-sm rounded-lg" />
                    <div className='max-w-xl mr-20'>
                        <h1 className="text-5xl font-bold">Build Teams!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>

            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <img src="images/idea_vector_art.png" className="max-w-sm rounded-lg" />
                    <div className='max-w-xl ml-20'>
                        <h1 className="text-5xl font-bold">Share Your Ideas!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: !!state.auth?.firstName
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (id) => { dispatch(login(id)); }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
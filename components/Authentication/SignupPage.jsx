import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../../states/actions/auth';
import { fetchAPI } from '../../utils/dataFetching';
import Navbar from '../Navbar.jsx';
import Footer from '../Footer.jsx';

const SignUpPage = ({ login }) => {
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [uName, setUName] = useState('');
    const [password, setPassword] = useState('');

    const signupEventListener = async (e) => {
        e.preventDefault();

        try {
            const body = {
                firstName: fName,
                lastName: lName,
                userName: uName,
                password,
                email
            };
            const { status, data } = await fetchAPI('POST', '/signup', body);

            if (status === 201) {
                login(data.id);
                return;
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Navbar />
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse max-w-4xl">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">SignUp now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mr-8">
                        <div className="card-body">
                            <div>
                                <h2 className='font-black text-xl'>SignUp,</h2>
                            </div>
                            <form onSubmit={signupEventListener}>
                                <div className="form-control mt-2">

                                    <input className="input input-bordered" type='text' value={fName} onChange={e => setFName(e.target.value)} placeholder='First Name' />
                                </div>

                                <div className="form-control mt-2">

                                    <input className="input input-bordered" type='text' value={lName} onChange={e => setLName(e.target.value)} placeholder='Last Name' />
                                </div>

                                <div className="form-control mt-2">

                                    <input className="input input-bordered" type='text' value={uName} onChange={e => setUName(e.target.value)} placeholder='Username' />
                                </div>

                                <div className="form-control mt-2">

                                    <input className="input input-bordered" type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' />
                                </div>

                                <div className="form-control mt-2">

                                    <input className="input input-bordered" type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' />
                                </div>

                                <div className="form-control mt-6">
                                    <button className="btn btn-primary" type='submit'>SignUp</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>




    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (id) => { dispatch(login(id)); }
    };
};

export default connect(undefined, mapDispatchToProps)(SignUpPage);


    // <div>
    //         <Navbar />
    //         <section id='signup'>
    //             <div className='container'>
    //                 <div className='signup_card'>
    //                     <div className='section-sub-title'>Sign Up,</div>
    //                     <input className='text_inputs' type='text' value={fName} onChange={e => setFName(e.target.value)} placeholder='First Name' />
    //                     <input className='text_inputs' type='text' value={lName} onChange={e => setLName(e.target.value)} placeholder='Last Name' />
    //                     <input className='text_inputs' type='text' value={uName} onChange={e => setUName(e.target.value)} placeholder='Username' />
    //                     <input className='text_inputs' type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' />
    //                     <input className='text_inputs' type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' />
    //                     <button className='round-button' onClick={signupEventListener}><h3>Sign Up</h3></button>
    //                     <div className='null_1'></div>
    //                 </div>

    //                 <div className='signup_image'>
    //                     <img src='images/group_vector_art.png'></img>
    //                 </div>
    //             </div>
    //         </section>
    //     </div>
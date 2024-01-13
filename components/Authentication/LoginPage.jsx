import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../../states/actions/auth';
import { fetchAPI } from '../../utils/dataFetching';
import Navbar from '../Navbar.jsx';
import Footer from '../Footer.jsx';

const LoginPage = ({ login }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const resetForm = () => {
        setEmail('');
        setPassword('');
    };

    const loginEPEventListener = async (e) => {
        e.preventDefault();
        try {
            const body = { email, password };
            const { status, data } = await fetchAPI('POST', '/login', body);
            console.log(data);

            if (status === 202) {
                login(data);
                return;
            }
            resetForm();
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
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mr-8">
                        <div className="card-body">
                            <div>
                                <h2 className='font-black text-xl'>Login,</h2>
                            </div>
                            <form onSubmit={loginEPEventListener}>
                                <div className="form-control mt-2">

                                    <input className="input input-bordered" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>

                                <div className="form-control mt-2">

                                    <input className="input input-bordered" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>

                                <div className="form-control mt-6">
                                    <button className="btn btn-primary" type="submit">Login</button>
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

export default connect(undefined, mapDispatchToProps)(LoginPage);


// <div>
//             <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//             <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//             <button type="submit" onClick={loginEPEventListener}>Login</button>
//         </div>
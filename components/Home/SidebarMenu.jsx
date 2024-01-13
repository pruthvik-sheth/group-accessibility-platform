import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../states/actions/auth';
import { RiDashboardFill, RiProfileFill, RiLightbulbFlashFill, RiGroupFill, RiLogoutBoxFill } from 'react-icons/ri/'
import { MdOutlineTravelExplore } from 'react-icons/md'
import { fetchAPI } from '../../utils/dataFetching.js';

const SidebarMenu = ({ user, logout }) => {

    const navigate = useNavigate();

    const toggleGroupFormVisibility = () => {
        setGroupIsOpen(prevState => !prevState);
    };

    const toggleIdeaFormVisibility = () => {
        setIdeaIsOpen(prevState => !prevState);
    };

    const toggleJoinFormVisibility = () => {
        setJoinIsOpen(prevState => !prevState);
    };

    const signoutEventListener = async () => {
        try {
            const { status } = await fetchAPI('POST', '/logout', null);

            if (status === 200) {
                logout();
                navigate('/', { replace: true });
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            <div className="relative max-w-md mx-auto md:max-w-2xl min-w-0 break-words bg-base-100 w-full mb-6 rounded-xl mt-16">
                <div className="px-6">
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full flex justify-center">
                            <div className="relative">
                                <img
                                    src="/images/user.jpg"
                                    className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                                />
                            </div>
                        </div>
                        <div className="w-full text-center mt-20">
                            <div className="flex justify-center lg:pt-4 pt-8 pb-0">
                                <div className="p-3 text-center">
                                    <span className="text-xl font-bold block uppercase tracking-wide text-slate-100">
                                        3,360
                                    </span>
                                    <span className="text-sm text-slate-400">Ideas</span>
                                </div>
                                <div className="p-3 text-center">
                                    <span className="text-xl font-bold block uppercase tracking-wide text-slate-100">
                                        564
                                    </span>
                                    <span className="text-sm text-slate-400">Following</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-2">
                        <h3 className="text-2xl text-white font-black leading-normal mb-1">
                            {user.firstName} {user.lastName}
                        </h3>
                        <div className="text-xs mt-0 mb-2 pb-4 text-slate-400 font-bold uppercase">
                            <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75" />
                            Paris, France
                        </div>
                    </div>
                </div>
            </div>

            <li><a onClick={() => navigate('/dashboard')}><RiDashboardFill /> Dashboard</a></li>
            <li>
                <label htmlFor="my-modal-profile"><RiProfileFill />Profile</label>
            </li>
            <li>
                <label htmlFor="my-modal-idea"><RiLightbulbFlashFill /> Create Idea</label>
            </li>
            <li>
                <label htmlFor="my-modal-3"><RiGroupFill />Create Group</label>
            </li>
            <li>
                <a onClick={() => navigate('/explore')}><MdOutlineTravelExplore /> Explore Groups</a>
            </li>
            <li><a onClick={signoutEventListener}><RiLogoutBoxFill />Logout</a></li>
        </ul>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => { dispatch(logout()); }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarMenu);




{/* <div className='py-8 flex items-center justify-center flex-col border-b border-gray-400 mb-4'>
                <div className="avatar">
                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src="/images/user.jpg" />
                    </div>
                </div>
                <h2 className='font-black text-lg text-center my-4'>Tony Sheth</h2>
                <div className='flex items-center justify-between w-full px-4'>
                    <div className='text-center'>
                        <h4 className='font-bold'>Ideas</h4>
                        <p>64</p>
                    </div>
                    <div className='text-center'>
                        <h4 className='font-bold'>Ideas</h4>
                        <p>64</p>
                    </div>
                    <div className='text-center'>
                        <h4 className='font-bold'>Ideas</h4>
                        <p>64</p>
                    </div>
                </div>
            </div> */}
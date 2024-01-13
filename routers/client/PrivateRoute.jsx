import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import SidebarMenu from '../../components/Home/SidebarMenu.jsx';
import CreateGroup from '../../components/Group/CreateGroup.jsx';
import AddIdea from '../../components/Idea/AddIdea.jsx';
import Profile from '../../components/Profile/Profile.jsx';

const PrivateRoute = ({ auth, component: Component }) => {
    return auth?.id ? (
        // <div className="drawer drawer-mobile">
        //     <input id="my-drawer-2" type="checkbox" className="drawer-toggle absolute bottom-0" />
        //     <div className="drawer-content flex flex-col items-center justify-center">
        //         <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
        //         <Component />
        //         <CreateGroup />
        //         <AddIdea />
        //         <Profile />
        //     </div>
        //     <div className="drawer-side">
        //         <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        //         {/* <!-- Sidebar content here --> */}
        //         <SidebarMenu />

        //     </div>
        // </div>

        <Component />


    ) : <Navigate to='/' replace />;
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps)(PrivateRoute);
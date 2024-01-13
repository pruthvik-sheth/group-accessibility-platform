import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute.jsx';
import PublicRoute from './PublicRoute.jsx';
import LandingPage from '../../components/Authentication/LandingPage.jsx';
import LoginPage from '../../components/Authentication/LoginPage.jsx';
import SignUpPage from '../../components/Authentication/SignupPage.jsx';
import Dashboard from '../../components/Home/Dashboard.jsx';
import PageNotFound from '../../components/PageNotFound.jsx';
import UserProfile from '../../components/Home/UserProfile.jsx';
import IdeaPage from '../../components/Idea/IdeaPage.jsx';
import GroupPage from '../../components/Group/GroupPage.jsx';
import UserPage from '../../components/User/UserPage.jsx';
import VideoMeetingPage from '../../components/VideoMeeting/VideoMeetingPage.jsx';
import ExplorePage from '../../components/ExploreGroups/ExplorePage.jsx';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<PublicRoute component={LandingPage} />} />
                {/* <Route path="/" element={<LandingPage />} /> */}
                <Route path="/signup" element={<PublicRoute component={SignUpPage} />} />
                <Route path="/login" element={<PublicRoute component={LoginPage} />} />
                <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
                {/* <Route path="/idea/create" element={<PrivateRoute component={AddIdea} />} /> */}
                {/* <Route path="/group/create" element={<PrivateRoute component={CreateGroup} />} /> */}
                <Route path="/profile" element={<PrivateRoute component={UserProfile} />} />
                <Route path="/explore" element={<PrivateRoute component={ExplorePage} />} />
                <Route path="/idea/:id" element={<PrivateRoute component={IdeaPage} />} />
                <Route path="/group/:id" element={<PrivateRoute component={GroupPage} />} />
                {/* <Route path="/join" element={<PrivateRoute component={Join} />} /> */}
                <Route path="/user/:id" element={<PrivateRoute component={UserPage} />} />
                <Route path="/meet/:id" element={<PrivateRoute component={VideoMeetingPage} />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchAPI } from '../../utils/dataFetching.js';
import IdeaPostsList from '../Idea/IdeaPostsList.jsx';
import MeetingList from '../VideoMeeting/MeetingList.jsx';
import GroupsList from '../Group/GroupsList.jsx';
import { mockMeetings } from '../../utils/mockData.js';
import SidebarMenu from './SidebarMenu.jsx';

const Dashboard = () => {
    const [groups, setGroups] = useState([]);
    const [ideas, setIdeas] = useState([]);

    const fetchData = async () => {
        try {
            const { status, data } = await fetchAPI('GET', '/page/dashboard', null);

            if (status === 200) {
                setGroups(data.groups);
                setIdeas(data.ideas);
                return;
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => { fetchData(); }, []);

    return (


        <>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle absolute bottom-0" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                    <div className='w-full min-h-screen flex'>
                        <div className='w-7/12 md:px-8 px-2'>
                            <IdeaPostsList ideaPosts={ideas} />
                        </div>

                        <div className='w-5/12 md:pr-8 pr-2'>
                            <MeetingList meetingsList={mockMeetings} />
                            <GroupsList groupsList={groups} />
                        </div>
                    </div>

                    {/* <CreateGroup />
                    <AddIdea />
                    <Profile /> */}
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    {/* <!-- Sidebar content here --> */}
                    <SidebarMenu />

                </div>
            </div>
            {/* <div className='w-full min-h-screen flex'>
                <div className='w-7/12 md:px-8 px-2'>
                    <IdeaPostsList ideaPosts={ideas} />
                </div>

                <div className='w-5/12 md:pr-8 pr-2'>
                    <MeetingList meetingsList={mockMeetings} />
                    <GroupsList groupsList={groups} />
                </div>
            </div> */}
        </>
    );
};

export default connect()(Dashboard);
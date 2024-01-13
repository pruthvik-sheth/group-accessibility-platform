import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchAPI } from '../../utils/dataFetching.js';
import GroupsList from '../Group/GroupsList.jsx';
import Join from '../Join Group/Join.jsx';
import SearchBar from '../SearchBar.jsx';

const ExplorePage = () => {

    const [groups, setGroups] = useState([]);

    const fetchData = async () => {
        try {
            const { status, data } = await fetchAPI('GET', '/page/explore', null);

            if (status === 200) {
                setGroups(data.groups);
                console.log(data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='w-full min-h-screen flex'>
            <div className='w-7/12 md:px-8 px-2'>
                <SearchBar />
                <GroupsList groupsList={groups} isExplore={true} />
            </div>

            <div className='w-5/12 md:pr-8 pr-2'>
                <Join />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps)(ExplorePage);
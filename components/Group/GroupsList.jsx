import React from 'react';
import GroupListItem from './GroupListItem.jsx';
import ExploreGroupsItem from './ExploreGroupsItem.jsx';

const GroupsList = ({ groupsList, isExplore = false }) => {
    return (
        <div>
            <h1 className='font-black text-2xl mt-10 mb-4'>{isExplore ? 'Groups' : 'Joined Groups'}</h1>
            {isExplore ? (
                groupsList.map(group => {
                    return <ExploreGroupsItem key={group.id} details={group} />
                })
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Members</th>
                                <th>Ideas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                groupsList.map(group => {
                                    return <GroupListItem key={group.id} details={group} />
                                })
                            }
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default GroupsList;

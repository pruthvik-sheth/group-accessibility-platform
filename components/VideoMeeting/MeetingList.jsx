import React from 'react';
import MeetingListItem from './MeetingListItem.jsx';

const MeetingList = ({ meetingsList }) => {
    return (
        <div>
            <h1 className='font-black text-2xl mt-10 mb-4'>Scheduled Meetings</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Meet</th>
                            <th>Group</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            meetingsList?.map(meet => {
                                return (
                                    <MeetingListItem key={meet.id} details={meet} />
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <button className='btn btn-primary mt-10 w-full'>Start an Instant Meeting</button>
        </div>
    );
}

export default MeetingList;

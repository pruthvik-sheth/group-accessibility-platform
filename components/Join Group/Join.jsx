import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAPI } from '../../utils/dataFetching.js';

const Join = ({ auth }) => {

    const navigate = useNavigate();
    const [groupID, setGroupID] = useState('');

    const joinGroupListener = async () => {

        try {
            const body = {
                groupID,
                userID: auth.id
            };
            console.log(body);
            const { status } = await fetchAPI('POST', '/join/group', body);

            if (status === 200) {
                navigate(`/group/${details.id}`);
                return;
            }

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='p-10 mt-4 w-full bg-base-200 rounded-md flex flex-col items-start justify-center'>
            <h2 className='mb-4 uppercase font-bold'>Join Group</h2>
            <input
                className="w-full my-4 input input-bordered input-primary"
                type="text"
                value={groupID}
                onChange={e => { setGroupID(e.target.value); }}
                placeholder="Group ID" />
            <button onClick={joinGroupListener} className="btn btn-primary mt-4">Join Group</button>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps)(Join);
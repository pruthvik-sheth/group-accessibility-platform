import React from 'react'
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAPI } from '../../utils/dataFetching';

const ExploreGroupsItem = ({ auth, details }) => {
    const navigate = useNavigate();

    const joinGroupListener = async () => {

        try {
            const body = {
                groupID: details.id,
                userID: auth.id
            };
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

        <div className='p-4 bg-base-200 mb-4 rounded-md flex w-full items-center justify-between'>
            <div>
                <div className='text-2xl font-black'>
                    {details?.name}
                </div>
                <div className='flex mt-2'>
                    <h3 className='mr-4'>Ideas: {details?.ideas}</h3>
                    <h3>Members: {details?.members}</h3>
                </div>
            </div>

            <div>
                <button onClick={joinGroupListener} className='btn btn-accent'>Join</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps)(ExploreGroupsItem)
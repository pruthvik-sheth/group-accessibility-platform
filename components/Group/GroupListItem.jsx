import React from 'react';
import { useNavigate } from 'react-router-dom';

const GroupListItem = ({ details }) => {

    const navigate = useNavigate();

    const goToGroup = () => {
        navigate(`/group/${details.id}`);
    };

    return (
        <tr className='cursor-pointer'>
            <th onClick={goToGroup}>{details?.name}</th>
            <td>{details?.members}</td>
            <td>{details?.ideas}</td>
        </tr>
        // <div>
        //     <h4 onClick={goToGroup}>{details.name}</h4>
        //     <p>Total Members: {details.members}</p>
        //     <p>Total Ideas: {details.ideas}</p>
        // </div>
    );
};

export default GroupListItem;
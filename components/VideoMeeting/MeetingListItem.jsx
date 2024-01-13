import React from 'react'

const MeetingListItem = ({ details }) => {
    return (
        <tr>
            <th>{details?.time}</th>
            <td>{details?.title}</td>
            <td>{details?.group}</td>
        </tr>
        // <div className='meeting-item'>
        //     <div className='meeting-item_time'><div>{details?.time}</div></div>
        //     <div className='meeting-item_details'>
        //         <div className='content'>{details?.title}</div>
        //         <div className='content'>Group: {details?.group}</div>
        //     </div>
        // </div>
    )
}

export default MeetingListItem
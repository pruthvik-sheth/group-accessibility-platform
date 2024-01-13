import React from 'react'
import { useNavigate } from 'react-router-dom'

const MemberListItem = ({ details }) => {

    const navigate = useNavigate()

    const goToMember = () => {
        navigate(`/user/${details.id}`)
    }

    return (
        <div className='p-2 bg-base-100 w-full rounded-sm mb-2 flex items-center'>
            <div className="avatar placeholder mr-2">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                    <span className='uppercase'>{details?.userName.substring(0, 1)}</span>
                </div>
            </div>
            <p className='font-semibold' onClick={goToMember}>{details?.userName}</p>
        </div>
    )
}

export default MemberListItem
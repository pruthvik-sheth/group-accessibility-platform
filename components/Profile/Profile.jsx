import React from 'react'
import ProfileCard from './ProfileCard.jsx'

const Profile = () => {

    return (
        <>
            <input
                type="checkbox"
                id="my-modal-profile"
                className="modal-toggle" />

            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="my-modal-profile" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <ProfileCard />
                </div>
            </div>
        </>
    )
}

export default Profile
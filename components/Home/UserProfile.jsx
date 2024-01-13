import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchAPI } from '../../utils/dataFetching.js'
import IdeaListItem from '../Idea/IdeaListItem.jsx'

const UserProfile = ({ auth }) => {

    const [profile, setProfile] = useState(null)
    const [ideas, setIdeas] = useState(null)

    const fetchData = async () => {
        try {
            let response = await fetchAPI('POST', '/me', null)

            if (response.status === 200) {
                setProfile(response.data.user)
            }

            response = await fetchAPI('GET', '/me/ideas', null)

            if (response.status === 200) {
                setIdeas(response.data.ideas)
                return
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => { fetchData() }, [])

    return (
        <div>
            <div className='container'>
                <h1>User Profile</h1>
                <h5>User ID : {auth.uid}</h5>
                <p>Full Name : {profile?.firstName} {profile?.lastName}</p>
                <p>Username : {profile?.userName}</p>
                <p>Email : {profile?.email}</p>

                <h3>{profile?.firstName}'s Ideas</h3>
                {
                    ideas?.map(idea => {
                        return (
                            <IdeaListItem key={idea.id} author={false} details={idea} />
                        )
                    })
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(UserProfile)
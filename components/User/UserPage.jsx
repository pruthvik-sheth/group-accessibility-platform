import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchAPI } from '../../utils/dataFetching.js'

const UserPage = () => {
    const { id } = useParams()
    const [details, setDetails] = useState(null)

    const fetchData = async () => {
        try {
            const body = { id }
            const { status, data } = await fetchAPI('POST', '/get/user', body)

            if (status === 200) {
                setDetails(data.user)
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
                <h3>FullName : {details?.firstName} {details?.lastName}</h3>
                <p>Username : {details?.userName}</p>
                <p>Email : {details?.email}</p>
                <h5>User ID : {details?.id}</h5>
                <br />
                <br />
                <h3>Common Groups</h3>
                <p>Coming Soon...</p>
                <br />
                <br />
                <h3>Popular Ideas</h3>
                <p>Coming Soon...</p>
            </div>
        </div>
    )
}

export default connect()(UserPage)
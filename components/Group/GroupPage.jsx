import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchAPI } from '../../utils/dataFetching.js'
import MemberListItem from './MemberListItem.jsx'
import IdeaListItem from '../Idea/IdeaListItem.jsx'

const GroupPage = ({ uid }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [details, setDetails] = useState(null)

    const fetchData = async () => {
        try {
            const body = { id }
            const { status, data } = await fetchAPI('POST', '/get/group', body)

            if (status === 200) {
                setDetails(data.group)
                return
            }
        } catch (err) {
            console.error(err)
        }
    }

    const leaveGroupListener = async () => {
        try {
            const body = {
                userID: uid,
                groupID: id
            }
            const { status } = await fetchAPI('POST', '/leave/group', body)
            if (status === 200) {
                alert('Left group Successfully.')
                navigate('/dashboard', { replace: true })
                return
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => { fetchData() }, [])

    return (

        <div className='w-full min-h-screen flex'>

            <div className='w-7/12 md:px-8 px-2'>
                <div className='min-h-16 py-14 glass mt-4 w-full bg-primary rounded-md flex flex-col items-center justify-center'>
                    <h1 className='font-black text-4xl uppercase'>{details?.name}</h1>
                    <p className='mt-2 italic'>{details?.description}</p>
                </div>
                <h1 className='font-black text-2xl mt-10 mb-4'>Group Ideas</h1>
                {
                    details?.ideas?.map(idea => {
                        return <IdeaListItem key={idea.id} author={true} details={idea} />
                    })
                }
            </div>

            <div className='w-5/12 md:pr-8 pr-2'>

                <div className='p-10 mt-4 w-full bg-base-200 rounded-md flex flex-col items-start justify-center'>
                    <h2 className='mb-4 uppercase font-bold'>Group Details</h2>
                    <h3>Admin : {details?.admin?.userName}</h3>
                    <h3>Group ID: {details?.id}</h3>
                </div>

                <div className='p-10 mt-4 w-full bg-base-200 rounded-md flex flex-col items-start justify-center'>
                    <h2 className='mb-4 uppercase font-bold'>Group Members</h2>
                    {
                        details?.members?.map(member => {
                            return (
                                <MemberListItem key={member.id} details={member} />
                            )
                        })
                    }
                </div>
                <button className='btn btn-error mt-4 w-full' onClick={leaveGroupListener}>Leave Group</button>

            </div>
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        uid: state.auth.uid
    }
}

export default connect(mapStateToProps)(GroupPage)


{/* <div>
            <div className='container'>
                
                <br />
                <br />
                
                <br />
                <br />
                <h2>Popular Ideas</h2>
                <p>Coming Soon...</p>
            </div>
        </div> */}
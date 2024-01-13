import React from 'react'
import Message from './Message.jsx'

const ChatWindow = ({ submitHandler, messageData }) => {
    return (
        <>
            <div className='relative h-custom p-10 mt-4 w-full bg-base-200 rounded-md overflow-y-scroll'>
                <h2 className='mb-4 uppercase font-bold'>Idea Discussion</h2>
                <div className='h-full flex items-end'>
                    <div className='w-full'>
                        {
                            messageData.map(message => <Message key={message.id} data={message} />)
                        }
                    </div>
                </div>
            </div>
            <div>
                <form onSubmit={submitHandler}>
                    <div className='flex my-4'>
                        <input className="w-full input input-bordered input-primary" type='text' name='message' placeholder='Message' required />
                        <button className='btn btn-primary' type='submit'>Send</button>
                    </div>
                </form>
            </div>

        </>
    )
}

export default ChatWindow
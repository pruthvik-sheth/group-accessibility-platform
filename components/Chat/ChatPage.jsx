import React from 'react'
import ReactModal from 'react-modal'
import Message from './Message.jsx'

const ChatPage = ({ submitHandler, messageData, isOpen, onRequestClose }) => {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
        >
            {
                messageData.map(message => <Message key={message.id} data={message} />)
            }
            <form onSubmit={submitHandler}>
                <input type='text' name='message' placeholder='Message' required />
                <button type='submit'>Send</button>
            </form>
        </ReactModal>
    )
}

export default ChatPage
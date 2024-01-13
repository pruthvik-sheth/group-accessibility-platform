import React, { useState } from 'react';

const Message = ({ data }) => {

    const setAuthor = () => {
        if (data.meta === 'SYSTEM')
            return 'System';
        else if (data.meta === 'RECEIVER')
            return data.from;
        else
            return undefined;
    };
    const [author] = useState(setAuthor());


    return (
        <div>
            <div className={`chat ${(data.meta === 'RECEIVER' || data.meta === 'SYSTEM') ? 'chat-start' : 'chat-end'}`}>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img src="/images/user.jpg" />
                    </div>
                </div>
                <div className="chat-header">
                    {author && <h3>{author}</h3>}
                    {/* <time className="text-xs opacity-50">12:45</time> */}
                </div>
                <div className="chat-bubble">{data.text}</div>
                {/* <div className="chat-footer opacity-50">
                    Delivered
                </div> */}
            </div>
        </div>
    );
};

export default Message;
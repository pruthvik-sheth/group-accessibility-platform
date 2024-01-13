import React, { useEffect, useState, useMemo } from 'react';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { fetchAPI } from '../../utils/dataFetching';
import IdeaListItem from './IdeaListItem.jsx';
import ChatWindow from '../Chat/ChatWindow.jsx';

const IdeaPage = ({ uid }) => {

    const { id } = useParams();
    const [details, setDetails] = useState(null);
    const [showChat, setShowChat] = useState(false);
    const [messageData, setMessageData] = useState([]);

    const toggleChatDisplay = () => {
        setShowChat(prevState => !prevState);
    };

    const socket = useMemo(() => {
        return io({
            path: '/socket/chat',
            query: { roomId: id }
        });
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        const text = e.target.elements.message.value;

        socket.emit('send', text, (err) => {
            err && console.error(err.message);
        });

        const message = {
            id: uuid(),
            meta: 'SENDER',
            text,
            createdAt: moment().format('hh:mm a')
        };

        setMessageData(prevState => prevState.concat(message));
    };

    const fetchData = async () => {
        try {
            const body = { id };
            const { status, data } = await fetchAPI('POST', '/get/idea', body);

            if (status === 200) {
                setDetails(data.idea);
                return;
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();

        // A Testing Socket Listener
        socket.on('Hello World', () => {
            console.log('Hello World from Server');
        });

        socket.emit('join', (error) => {
            error && console.error(error.message);
        });

        socket.on('system', (message) => {
            // console.log(message)
            setMessageData(prevState => prevState.concat(message));
        });

        socket.on('roomStatus', (data) => {
            console.log(data);
        });

        socket.on('receive', (message) => {
            // console.log(message)
            setMessageData(prevState => prevState.concat(message));
        });

        return () => {
            socket.close();
        };
    }, []);

    const authorListener = () => {
        console.log(details.author.id);
    };

    const groupListener = () => {
        console.log(details.group.id);
    };


    return (

        <div className='w-full min-h-screen flex'>

            <div className='w-7/12 md:px-8 px-2'>
                <IdeaListItem details={details} isUnique={true} />
            </div>

            <div className='w-5/12 md:pr-8 pr-2'>
                <ChatWindow submitHandler={submitHandler} messageData={messageData} />
            </div>
        </div>

    );
};

const mapStateToProps = (state) => {
    return {
        uid: state.auth.uid,
    };
};

export default connect(mapStateToProps)(IdeaPage);

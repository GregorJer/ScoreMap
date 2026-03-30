import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OldMessages = ({ gameId, gameType }) => {
    const displayed_messages_count = 7;
    const [messages, setMessages] = useState([]);
    const [displayCount, setDisplayCount] = useState(displayed_messages_count);  // Number of messages to display

    useEffect(() => {
        // Fetch the messages from the server using the gameId and gameType
        axios.get(`http://localhost:3000/messages/${gameType}/${gameId}`)
            .then(response => {
                setMessages(response.data);
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
            });
    }, [gameId, gameType]);

    const loadMoreMessages = () => {
        setDisplayCount(prevCount => prevCount + displayed_messages_count);  // Load 7 more messages
    };

    // Slice the array to get the portion to display
    const messagesToDisplay = messages.slice(0, displayCount);

    return (
        <div>
            {displayCount < messages.length && (
                <div className='load-more-messages' onClick={loadMoreMessages}>Load more messages</div>
            )}
            {messagesToDisplay.map(message => (
                <div className='message-container' key={message._id}>
                    <div className='message-element message-username'><span className="message-element-description">Username: </span>{message.createdBy.username}</div>
                    <div className='message-element'>{message.contents}</div>
                    <div className='message-element message-date'>{message.created}</div>
                </div>
            ))}
        </div>
    );
    
};

export default OldMessages;

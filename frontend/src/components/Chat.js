import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { UserContext } from "../userContext";
import Error from './Error';
import OldMessages from './OldMessages';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const socket = io('http://localhost:3000');  // Connect to the server



const Chat = () => {
    const { user } = useContext(UserContext);
    const userId = user && user._id;
    const username = user && user.username;
    const { gameId, gameType } = useParams();
    const gameName = gameType.split('_')[0];

    const [message, setMessage] = useState({
        contents: '',
        userId: userId,
        username: username,
        gameId: gameId,  // The ID of the volleyball game
        gameType: gameType,  // The type of the game
    });
    const [messages, setMessages] = useState([]);
    const [game, setGame] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/${gameName}/games/${gameId}`)
            .then(response => {
                setGame(response.data);
            })
            .catch(error => {
                console.error('Error fetching game:', error);
            });
    }, [gameId]);

    useEffect(() => {
        // Listen for 'chat message' event from the server
        socket.on('chat message', (msg) => {
            setMessages((messages) => [...messages, msg]);
        });

        return () => {
            socket.off('chat message');  // Unsubscribe from 'chat message' when unmounting
        };
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();

        // Emit a 'chat message' event to the server
        socket.emit('chat message', message);
        setMessage({ ...message, contents: '' });
    };
    if (!userId) {
        return <Error errorCode={401} errorMessage="User not logged in" />;
    }

    return (

        <div className='messages-container'>
            {game && (
                <div className="message-game-info">
                    <h2>
                        {gameType === "handball_game"
                            ? `${game.homeTeam} vs. ${game.awayTeam}`
                            : `${game.firstOpponent} vs. ${game.secondOpponent}`}
                    </h2>
                    <div>
                    Sport: {gameName}
                    </div>
                    <div>
                        Score:{" "}
                        {gameType === "handball_game"
                            ? `${game.homeGoals} : ${game.awayGoals}`
                            : game.score}
                    </div>
                    <div>Location: {game.location}</div>
                    <div>
                        Date and Time:{" "}
                        {new Date(
                            gameType === "football_game" ? game.date : game.dateTime
                        ).toLocaleString()}
                    </div>

                </div>
            )}


            <OldMessages gameId={gameId} gameType={gameType} />
            <div>
                {messages.map((msg, index) => (
                    <div className="message-container" key={index}>
                        <div className='message-element message-username'><span className="message-element-description">Username: </span>{msg.createdBy}</div>
                        <div className='message-element'>{msg.contents}</div>
                        <div className='message-element message-date'>{msg.created}</div>
                    </div>
                ))}
            </div>
            <form className='send-message-form' onSubmit={sendMessage}>
                <textarea
                    className='message-input'
                    value={message.contents}
                    onChange={(e) => setMessage({ ...message, contents: e.target.value })}
                />
                <button className='message-submit' type="submit">Send</button>
            </form>



        </div>
    );

};

export default Chat;

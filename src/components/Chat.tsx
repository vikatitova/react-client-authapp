import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import io from 'socket.io-client';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import { uri } from '../shared/constants';
const socket = io(uri);

const Head: any = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #435d7d;
    color: #fff;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    padding: 15px;
    width: 100%;
`;

const Main: any = styled.main`
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-template-rows: 10fr 1fr;
    max-height: 500px;
    width: 100%;
`;

const ChatSidebar: any = styled.div`
    background: #435d7d;
    opacity: 0.8;
    color: #fff;
    padding: 20px 20px 60px;
    overflow-y: scroll;
    grid-row-start: 1;
    grid-row-end: 3;
`;

const Rooms: any = styled.div``;
const Room: any = styled.button`
    width: 100%;
    font-size: 20px;
    background: rgba(0, 0, 0, 0.1);
    color: white;
    padding: 10px;
    border: solid 1px white;
    margin-bottom: 5px;
`;

const ChatMessages: any = styled.div`
    padding: 30px;
    max-height: 500px;
    overflow-y: scroll;
    width: 100%;
    background-image: linear-gradient(to bottom, #fff, #fff 50%, #e3e3e3);
`;

const StyledForm: any = styled(Form)`
    display: flex;
`;

const ChatMessage: any = styled.div`
    padding: 10px;
    margin-bottom: 15px;
    background-color: #e6e9ff;
    border-radius: 5px;
`;

const ChatMeta: any = styled.p`
    font-size: 15px;
    font-weight: bold;
    color: #7386ff;
    opacity: 0.7;
    margin-bottom: 7px;
`;

const ChatMessageTime: any = styled.span`
    color: #777;
    padding-left: 5px;
`;

const ChatText: any = styled.p`
    font-size: 15px;
    font-weight: bold;
    color: var(--dark-color-b);
    opacity: 0.7;
    margin-bottom: 7px;
`;

const CustomerList: any = styled.div`
    display: grid;
`;

interface IChatCustomer {
    id: string;
    customerName: string;
    room: string;
}

interface IMessage {
    customerName: string;
    time: string;
    text: string;
}

const Chat = () => {
    const [room, setRoom] = useState('');
    const [input, setInput] = useState('');
    const [customers, setCustomers] = useState<IChatCustomer[]>([]);
    const [messages, setMessages] = useState<IMessage[]>([]);
    const authContext = useContext(AuthContext);
    const chatRef = useRef<any>(null);
    const inputRef = useRef<any>(null);

    const getRoom = () => {
        const roomList: string[] = ['Cat', 'Fox', 'Lion'];
        return roomList.map((room, i) => (
            <Room
                onClick={() => {
                    setMessages([]);
                    setRoom(room);
                }}
                key={i}
            >
                {room}
            </Room>
        ));
    };

    const outputMessage = (message: IMessage) => {
        setMessages((messages) => [...messages, ...[message]]);
    };

    const changeHandler = (e: any): void => {
        setInput(e.target.value);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (input !== '') {
            // Emit message to server
            socket.emit('chatMessage', input);
            setInput('');
            inputRef.current.focus();
        }
    };

    useEffect(() => {
        // Join chatroom
        if (room) {
            socket.emit('joinRoom', { customerName: authContext.email, room });
        }
        console.log(`${authContext.email} has joined room: ${room}`);
    }, [room]);

    useEffect(() => {
        // Get room and users
        socket.on(
            'roomCustomers',
            ({
                room,
                customers,
            }: {
                room: string;
                customers: IChatCustomer[];
            }) => {
                setCustomers(customers);
                console.log(customers);
            }
        );
    }, []);

    useEffect(() => {
        socket.on('message', (message: IMessage) => {
            outputMessage(message);

            // Scroll down
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        });
    }, []);

    return (
        <Container>
            <Row>
                <Head>
                    <h1>Chat</h1>
                    <h2>{room}</h2>
                    <CustomerList>
                        {customers.map((customer, i) => {
                            return <span key={i}>{customer.customerName}</span>;
                        })}
                    </CustomerList>
                </Head>
                <Main>
                    <ChatSidebar>
                        <h3>Room Name:</h3>
                        <Rooms>{getRoom()}</Rooms>
                    </ChatSidebar>
                    <ChatMessages ref={chatRef}>
                        {messages.map((message, i) => {
                            return (
                                <ChatMessage key={i}>
                                    <ChatMeta>
                                        {message.customerName}
                                        <ChatMessageTime>
                                            {message.time}
                                        </ChatMessageTime>
                                    </ChatMeta>
                                    <ChatText>{message.text}</ChatText>
                                </ChatMessage>
                            );
                        })}
                    </ChatMessages>
                    <StyledForm noValidate onSubmit={handleSubmit}>
                        <Form.Control
                            ref={inputRef}
                            required
                            type='text'
                            placeholder='Write a message...'
                            name='message'
                            value={input}
                            onChange={changeHandler}
                        />
                        <Button variant='primary' type='submit'>
                            Send
                        </Button>
                    </StyledForm>
                </Main>
            </Row>
        </Container>
    );
};

export default Chat;

import React, { useEffect, useRef, useState } from 'react';
import { Button, Menu, Avatar, List, Drawer } from 'antd';
import { useAppSelector } from '../../../redux/hooks';
import { apiGetFriend } from '../../../apis/apiGetFriend';
import { TypeListFriend } from '../../../types/typeListFriend';
import './listFriend.css'
import { io } from 'socket.io-client';
import { apiGetMessage } from '../../../apis/apiGetMessage';
import { TypeMessage } from '../../../types/typeMessage';
import { TypeUser } from '../../../types/typeUser';
import moment from 'moment';

interface ContentMessage {
    message: []
    sender: TypeUser
}
const ListFriend: React.FC = () => {
    // const socket = io('http://localhost:5000')

    const { currentUser } = useAppSelector(state => state.currentUser)
    const [open, setOpen] = useState(false);
    const [openMessageBox, setOpenMessageBox] = useState(false)
    const [showListFriend, isShowListFriend] = useState<TypeListFriend[] | undefined>([])
    const [chatWith, setChatWith] = useState<TypeListFriend>()
    const [messages, setMessages] = useState<TypeMessage[]>([]); // Lưu trữ các tin nhắn
    const [contentMessages, setContentMessages] = useState<ContentMessage>()
    const [roomChat, setRoomChat] = useState<string>("")
    const chatEndRef = useRef<HTMLDivElement | null>(null);

    // show drawer
    const showDrawer = (data?: any) => {
        setOpen(!open);
        if (data) {
            setChatWith(data)
            setOpenMessageBox(true)
            createRoomChat(currentUser.user.userId, data.friendId)
        }
    };

    // close drawer
    const onClose = () => {
        setOpen(false);
    };

    // call api get message
    const callApiGetMessage = async () => {
        if (roomChat) {
            const result = await apiGetMessage(roomChat)
            setContentMessages(result)
        }
    }

    // func api get ListFriend
    const callApiGetListFriend = async (id: any) => {
        const result = await apiGetFriend(id)
        if (result) {
            isShowListFriend(result)
        }
    }

    // call function api getListFriend
    useEffect(() => {
        if (currentUser) {
            callApiGetListFriend(currentUser.user.userId)
        }
    }, [currentUser])

    // call api getMessage
    useEffect(() => {
        callApiGetMessage()
    }, [roomChat])

    // handler render listFriend
    const renderListFriend = () => {
        if (showListFriend) {
            return <List
                dataSource={showListFriend}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={item.User_ListFriends_friendIdToUser.avatar} />}
                            title={<button onClick={() => { showDrawer(item) }} className='font-medium'>{item.User_ListFriends_friendIdToUser.name}</button>}
                        />
                    </List.Item>
                )}
            />

        }
    }

    const createRoomChat = (user1: string, user2: string) => {
        setRoomChat([user1, user2].sort().join('-'))
    }

    // Lắng nghe tin nhắn từ socket
    // useEffect(() => {
    //     socket.on('receive_message', (message: Message) => {
    //         setMessages((prevMessages: any) => [...prevMessages, message]);
    //     });
    // }, []);

    const handleSendMessage = (content: string) => {
        const date = new Date()
        if (chatWith) {
            const newMessage: TypeMessage = {
                idSender: currentUser?.user.userId,
                timeSend: date,
                contentMess: content,
                roomChat: roomChat
            };
            // socket.emit('send_message', newMessage); // Gửi tin nhắn qua socket
            setMessages((prevMessages: any) => [...prevMessages, newMessage]); // Cập nhật tin nhắn
        }
    };

    // Scroll to the bottom when the component is first rendered
    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        setTimeout(() => {
            scrollToBottom(); // Cuộn đến cuối khi messages thay đổi
        }, 480)
    }, [messages, openMessageBox]);

    const handleShowMessage = () => {
        // const date = new Date()
        if (contentMessages) {
            return contentMessages.message.map((message: TypeMessage, index) => {
                const date = moment(message.timeSend).format('DD/MM/YYYY HH:mm:ss')
                return (
                    <>
                        <div key={index}
                            className={`message-item my-2 p-2 max-w-xs rounded-lg w-3/6 ${message.idSender !== 1
                                ? 'ml-auto bg-blue-500 text-white'
                                : 'mr-auto bg-white text-black'
                                }`}>
                            {message.contentMess}
                            <p className='contentMessage text-xs mt-2'>{date}</p>
                        </div>
                        <div ref={chatEndRef} />
                    </>
                )
            })
        }
    }

    return (
        <>
            <div>
                <Button className='btn-show-listFriend mb-1' type="primary" onClick={() => { showDrawer(null) }}>
                    <i className="fa-solid fa-user-group"></i>
                </Button>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                />
                <Drawer
                    title="List Friend"
                    onClose={onClose}
                    open={open}
                    width={250}
                >
                    {renderListFriend()}
                </Drawer>

                {chatWith && openMessageBox && (
                    <div className="message-box bg-slate-900 h-96 flex flex-col justify-between"
                        style={{
                            width: '320px'
                        }}
                    >
                        <div className='flex items-center'>
                            <button onClick={() => { setOpenMessageBox(false) }}>
                                <i className="fa-solid fa-x mr-3 text-white"></i>
                            </button>
                            <img style={{
                                width: '25px',
                                height: '25px',
                                objectFit: 'cover',
                                borderRadius: '50%',
                                marginRight: '10px'
                            }}
                                src={chatWith.User_ListFriends_friendIdToUser?.avatar}></img>
                            <h2 className='text-white'>Chat with {chatWith.User_ListFriends_friendIdToUser?.name}</h2>
                        </div>
                        <div className="message-list"
                        >
                            {handleShowMessage()}
                        </div>
                        <MessageInput onSend={handleSendMessage} />
                    </div>
                )}
            </div>
        </>
    );
};
interface MessageInputProps {
    onSend: (content: string) => void;
}
const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
    const [inputValue, setInputValue] = useState('');
    const handleSend = () => {
        onSend(inputValue);
        setInputValue(''); // Reset input sau khi gửi
    };

    return (
        <div className="message-input">
            <input
                className='text-black'
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};
export default ListFriend;
'use client'
import React, { useContext, useEffect, useState } from 'react'
import ChatHeader from './ChatHeader'
import { Box } from '@mui/material'
import Messages from './Messages'
import { AccountContext } from '@/app/Context/Account'
import { useSession } from 'next-auth/react'

export default function ChatBox() {
    const { person } = useContext(AccountContext)
console.log('✌️person --->', person);
    
    const { data: session } = useSession();
    const [conversation, setConversation] = useState([]);
    
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const senderId = session.user.email;
                const receiverId = person.email;
                
                // Assuming you have the correct API endpoint for fetching conversations
                const response = await fetch(`http://localhost:3000/api/conversation/senderId=${senderId}/receiverId=${receiverId}`);
                
                if (response.ok) {
                    const data = await response.json();
                    // Assuming the response data is an array of messages
                    setConversation(data);
                } else {
                    console.error('Failed to fetch messages');
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [person.user]);

    console.log('conversation --->', conversation);
    return (
        <>
            <Box>
                <ChatHeader person={person} />
                <Messages person={person} conversation={conversation} />
            </Box>
        </>
    )
}

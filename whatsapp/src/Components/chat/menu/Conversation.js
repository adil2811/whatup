'use client'
import {  useContext , useEffect, useState} from 'react';
import userImg from '../../../../public/360_F_65104718_x17a76wzWKIm3BlhA6uyYVkDs9982c6q.jpg'
import { styled, Box, Typography } from "@mui/material";
import { AccountContext } from '@/app/Context/Account';
import { useSession } from 'next-auth/react';
import { SocketContext } from '@/app/Context/Socket';
import { formatDate } from '@/utils/common-utils';

const Component = styled(Box)`
    height: 45px;
    display: flex;
    padding: 13px 0;
    cursor: pointer;
`;
    
const Image = styled('img') ({
    width: 80,
    height: 35,
    marginTop:'10px',
    objectFit: 'cover',
    borderRadius: '50%',
    padding: '0 14px'
});

const Container = styled(Box)`
    display: flex;
`;

const Timestamp = styled(Typography)`
    font-size: 12px;
    margin-left: auto;
    color: #00000099;
    margin-right: 20px;
`;

const Text = styled(Typography)`
  display: block;
  color: green; /* Remove the single quotes */
  font-size: 14px;
`;


const Conversation = ({ users }) => {
    const { data : session} = useSession()
    const [message,setMessage] = useState({})
    const { person ,setPerson} = useContext(AccountContext);
    const { newMessageFLag,} = useContext(SocketContext);
     const url = users.image || userImg;
     console.log('reciver email',users.email)
      console.log('✌️person.email --->', person.email);

    const getUser = async () => {
      setPerson(users); // Assuming users contains receiver information

        try {
          const response = await fetch('http://localhost:3000/api/conversation', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ senderId: session.user.email, receiverId: users.email }),
        });
        
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          // Handle the response or perform actions after successful POST request
          // For example:
          // const data = await response.json();
          // Perform further actions based on 'data' received from the server
        } catch (error) {
          console.error('Error while sending POST request:', error);
          // Handle errors if any
        }
      };
      
      //this is useEffect 
      useEffect(() => {
        const fetchData = async () => {
          try {
            // Assuming you have 'senderId' and 'receiverId' variables defined
            const senderId = session.user.email; // Replace with your sender's ID
            const receiverId = users.email; // Replace with your receiver's ID
            
            const response = await fetch(`http://localhost:3000/api/conversation/receiverId=${senderId}/senderId=${receiverId}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
      
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
      
            const data = await response.json();
            if (data.error) {
              console.log(data.error);
            } else {
              setMessage({text:data?.message,timestamp: data?.updatedAt } );
            }
          } catch (error) {
            console.log(error.message);
          }
        };
      
        fetchData();
      }, [newMessageFLag]);
      


 console.log('ping message',message)
    return (
        <Component onClick={() => getUser()}>
            <Box>
            {users.image  ? (
          <Image src={users.image} alt='dp' />
        ) : (
          <Image  src='/360_F_65104718_x17a76wzWKIm3BlhA6uyYVkDs9982c6q.jpg' alt='default dp' />
        )}            </Box>
       <Box style={{width: '100%'}}>
                <Container>
                    <Typography>{users.name}</Typography>
                    { 
                        message?.text && 
                        <Timestamp>{formatDate(message?.timestamp)}</Timestamp>        
                    }
                </Container>
                <Box>
                    <Text>{message?.text?.includes('localhost') ? 'media' : message.text}</Text>
                </Box>
            </Box>
        </Component>
    )
}

export default Conversation;
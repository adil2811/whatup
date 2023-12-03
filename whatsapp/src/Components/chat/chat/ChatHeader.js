'use client'
import React, { useContext  } from 'react'
import ChatHeader from './ChatHeader'
import Messages from './Messages'
import { Box, Typography, styled } from '@mui/material';
import { AccountContext } from '@/app/Context/Account';
import { SocketContext,  } from '@/app/Context/Socket';

export default function ChatBox({person}) {

    

    const Header = styled(Box)`
    height: 44px;
    background: #ededed;
    display: flex;
    padding: 8px 16px;
    align-items: center;
`;
    
const Image = styled('img')({
    width: 40,
    height: 40,
    objectFit: 'cover',
    borderRadius: '50%'
})

const Name = styled(Typography)`
    margin-left: 12px !important;
`;

const RightContainer = styled(Box)`
    margin-left: auto;
    & > svg {
        padding: 8px;
        font-size: 22px;
        color: #000;
    }
`;

const Status = styled(Typography)`
    font-size: 12px !important;
    color: rgb(0, 0, 0, 0.6);
    margin-left: 12px !important;
`;


const {activeUsers} = useContext(SocketContext)
console.log('✌️activeUsers --->', activeUsers);


  return (
    <>
    <Header>
    {person.image ? (
          <Image src={person.image} alt='dp' />
        ) : (
          <Image  src='/360_F_65104718_x17a76wzWKIm3BlhA6uyYVkDs9982c6q.jpg' alt='default dp' />
        )}            <Box>
                <Name>{person.name}</Name>
                <Status>

                    {activeUsers?.find(user => user.email === person.email) ? 'Online' : 'Offline'}
                    </Status>    
            </Box>   
            <RightContainer>
                {/* <Search /> */}
                {/* <MoreVert />     */}
            </RightContainer> 
        </Header>
    </>
  )
}

'use client'
import { formatDate } from '@/utils/common-utils';
import { Box, styled, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import React, { memo } from 'react';
import { GetApp as GetAppIcon } from '@mui/icons-material';


const Wrapper = styled(Box)`
    background: #FFFFFF;
    padding: 5px;
    max-width: 60%;
    width: fit-content;
    display: flex;
    border-radius: 10px;
    word-break: break-word;
`;
    
const Own = styled(Box)`
    background: #dcf8c6;
    padding: 5px;
    max-width: 60%;
    width: fit-content;
    margin-left: auto;
    margin-top: 5px;
    display: flex;
    border-radius: 10px;
    word-break: break-word;
`;

const Text = styled(Typography)`
    font-size: 14px;
    padding: 0 25px 0 5px;
`;

const Time = styled(Typography)`
    font-size: 10px;
    color: #919191;
    margin-top: 6px;
    word-break: keep-all;
    margin-top: auto;
`;

 

const Message = ({ message }) => {
    const {data: session} = useSession()
console.log('✌️message 11 --->', message.senderId);
            console.log('✌️session.user.email --->', session.user.email);
    
    return (
        <>
        {
            session.user.email ===  message.senderId ?
            <Own>
            {
                message.type === 'file' ? <ImageMessage message={message} /> : <TextMessage message={message} />
            }
        </Own>
            :
            <Wrapper>
            {
                message.type === 'file' ? <ImageMessage message={message} /> : <TextMessage message={message} />
            }
        </Wrapper>
        }
        </>
    )
}


const TextMessage = ({ message }) => {
    
    return (
        <>
            <Text>{message.text}</Text>
            <Time>{formatDate(message.createdAt)}</Time>
        </>
    )
}

const ImageMessage = ({ message }) => {
console.log('✌️message img --->', message);

    return (
        <div style={{ position: 'relative' }}>
            {
                message?.text?.includes('.pdf') ?
                    <div style={{ display: 'flex' }}>
                        <img src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/27_Pdf_File_Type_Adobe_logo_logos-512.png" alt="pdf-icon" style={{ width: 80 }} />
                        <Typography style={{ fontSize: 14 }} >{message.text.split("/").pop()}</Typography>
                    </div>
                : 
                    <img style={{ width: 300, height: '100%', objectFit: 'cover' }} src={message.text} alt={message.text} />
            }
            <Time style={{ position: 'absolute', bottom: 0, right: 0 }}>
                <GetAppIcon 
                    onClick={(e) => downloadMedia(e, message.text)} 
                    fontSize='small' 
                    style={{ marginRight: 10, border: '1px solid grey', borderRadius: '50%' }} 
                />
                {formatDate(message.createdAt)}
            </Time>
        </div>
    )
}




export default memo(Message);

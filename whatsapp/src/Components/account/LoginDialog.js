'use client'
import { Box, Dialog, List, ListItem, Typography,styled } from '@mui/material'
import {signIn} from "next-auth/react";


import React from 'react'

export default function LoginDialog() {


    const dialogStyle = {
        height: '96%',
        marginTop:'12%',
        width: '60%',
        maxWidth: '100%',
        maxHeight: '100%',
        boxShadow: 'none',
        overFlow: 'none'
    }
    const Component = styled(Box)`
    display: flex;
    justify-content: space-between;
  `;
    const Container = styled(Box)`
        padding: 56px 0 56px 56px;
    `

   
  return (
<>
    <Dialog
      open={true}
      PaperProps={{ sx: dialogStyle }}
      >
        <Component>
            <Container>

                <Typography>asd sd</Typography>
                
                <List>
                    <ListItem>1</ListItem>
                    <ListItem>1</ListItem>
                    <ListItem>1</ListItem>
                    <ListItem>1</ListItem>

                </List>
            </Container>
            <Box>
                
            <button type="button" onClick={() => signIn('google', {callbackUrl: '/'})}>
                <img className='h=[256px] w-[256px] mt-[20px] mr-[50px] m-0' src='https://www.ginifab.com/feeds/qr_code/img/qrcode.jpg' alt=''/>

                    </button>
            </Box>
        </Component>

    </Dialog>
</>


    )
}

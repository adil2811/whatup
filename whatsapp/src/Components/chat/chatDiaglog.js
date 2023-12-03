'use client'
import {  Box, Dialog, styled } from '@mui/material'

import React, { useContext } from 'react'
import EmtyChat from './chat/EmtyChat'
import Menu from './menu/Menu'
import ChatBox from './chat/ChatBox'
import { AccountContext } from '@/app/Context/Account'

export default function ChatDialog() {
  
  const Component = styled(Box)`
    display:flex;
  `

  const LeftComponent = styled(Box)`
      min-width:450px;
  `
  const RightComponent = styled(Box)`
      width: 73%;
      min-width: 300px;
      height: 100%;
      border-left: 1px solid rgba(0, 0, 0, 0.14);
`

    const dialogStyle = {
        height: '95%',
        width: '100%',
        margin: '20px',
        maxWidth: '100%',
        maxHeight: '100%',
        boxShadow: 'none',
        overFlow: 'none',
        backgroundColor :`none`
    }



   const { person } = useContext(AccountContext);

  return (
<>
    <Dialog
      open={true}
      PaperProps={{ sx: dialogStyle }}
      hideBackdrop={true}
      maxWidth={'md'}
      >
          <Component>
            
              <LeftComponent>
                <Menu/>
              </LeftComponent>
              <RightComponent>
                {/* <EmtyChat/> */}
                {/* <ChatBox/> */}
            {Object.keys(person).length ? <ChatBox/> :<EmtyChat/>} 
              </RightComponent>
          </Component>

    </Dialog>
</>


    )
}

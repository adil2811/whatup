'use client'
import { Box } from '@mui/material'

import React, { useState } from 'react'
import Header from './Header'
import Search from './Search'
import Conversations from './Conversations'

export default function Menu() {
        const [text, setText] = useState('');
        console.log("text",text)
        return (
<>

        <Box>
                <Header/>
                        <Search setText={setText} text={text}/>
                        <Conversations  text={text} />
                        

        </Box>

</>  )
}

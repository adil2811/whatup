'use client'
import React, { useEffect, useRef } from 'react'
import { createContext, useState } from 'react'
import { io } from 'socket.io-client';
export const AccountContext = createContext();

export const AccountProvider = ({children}) => {
   
const [person,setPerson] = useState({})
const [users, setusers] = useState([]);
const [activeUsers,setActiveUsers] = useState([])

const socket = useRef();


useEffect(() => {
    socket.current = io('ws://localhost:9000');
}, [])


    return (
        <AccountContext.Provider value={{person,setPerson,users,setusers,socket,setActiveUsers,activeUsers,}}>
            <div>{children}</div>
        </AccountContext.Provider>
    )
}   
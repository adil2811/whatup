'use client'
import { createContext, useState } from 'react'
export const SocketContext = createContext();

export const SocketProvider = ({children}) => {
   

const [activeUsers,setActiveUsers] = useState([])
const [newMessageFLag,setNewMessageFlag] = useState(false)




    return (
        <SocketContext.Provider value={{setActiveUsers,activeUsers,newMessageFLag,setNewMessageFlag}}>
            <div>{children}</div>
        </SocketContext.Provider>
    )
}   
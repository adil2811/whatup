"use client";
import React, { useContext, useEffect, useState } from "react";
import { Box, styled, Divider } from "@mui/material";
import Conversation from "./Conversation";
import { AccountContext } from "@/app/Context/Account";
import { useSession } from "next-auth/react";
import { SocketContext } from "@/app/Context/Socket";

export default function Conversations({ text }) {
  const Component = styled(Box)`
    overflow: overlay;
    height: 81vh;
  `;

  const StyledDivider = styled(Divider)`
    margin: 0 0 0 70px;
    background-color: #e9edef;
    opacity: 0.6;
  `;

  const { socket } = useContext(AccountContext);
  const {  setActiveUsers} = useContext(SocketContext);

  const [users, setUsers] = useState([]);
  const { data: session } = useSession();
  // Fetch users based on text input
  useEffect(() => {
    async function fetchUsersData() {
      try {
        const response = await fetch("http://localhost:3000/api/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        let filteredData = data.filter((user) =>
          user.name.toLowerCase().includes(text.toLowerCase())
        );

        setUsers(filteredData);
      } catch (error) {
        console.error("Error fetching users data:", error);
      }
    }

    fetchUsersData();
  }, [text]);

  // Add user to socket on session change
  useEffect(() => {
    if (session && session.user) {
      socket.current.emit('addUser', session.user);
    }
  }, [session, socket]);

  // Listen for changes in users from socket
  useEffect(() => {
    const handleGetUsers = (receivedUsers) => {
      console.log('Received users from socket:', receivedUsers);
      setActiveUsers(receivedUsers)
        };

    socket.current.on("getUsers", handleGetUsers);

    return () => {
      // Clean up socket listener
      socket.current.off("getUsers", handleGetUsers);
    };
  }, [session]);

  
  

  return (
    <Box>
      {users.map((user) => (
        <Conversation key={user.id} users={user} />
      ))}
    </Box>
  );
}


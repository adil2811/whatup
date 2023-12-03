
"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Box, styled } from "@mui/material";
import Footer from "./Footer";
import { useSession } from "next-auth/react";
import { AccountContext } from "@/app/Context/Account";
import Message from "./Message";
import { SocketContext } from "@/app/Context/Socket";

export default function Messages({ conversation }) {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState();
  const [image, setImage] = useState('');
  const [incomingMessage,setIncomingMessage] = useState(null)
  console.log('image all ',image)

  const { person , socket} = useContext(AccountContext);
  const { newMessageFLag,setNewMessageFlag} = useContext(SocketContext);

  const scrollRef = useRef();

  const { data: session } = useSession();
  console.log(session);

  useEffect(() => {
    socket.current.on('getMessage', data => {
        setIncomingMessage({
            ...data,
            createdAt: Date.now()
        })
    })
}, []);

  useEffect(() => {
    if (conversation && conversation._id) {
      const fetchData = async () => {
        try {
          console.log("Fetching messages for conversation:", conversation._id);
          const response = await fetch(
            `http://localhost:3000/api/messages/id=${conversation._id}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const result = await response.json();
          setMessages(result);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [conversation._id, person._id]);

  const sendText = (e) => {
    const code = e.keyCode || e.which;
    if(code === 13) { 
      let message = {};
      if (!file) {
          message = {
              senderId: session.user.email,
              receiverId: person.email,
              conversationId: conversation._id,
              type: 'text',
              text: value
          };
      } else {
          message = {
              senderId: session.user.email,
              conversationId: conversation._id,
              receiverId: person.email,
              type: 'file',
              text: image
          };
      }

      console.log("✌️messagess --->", message);

        socket.current.emit('sendMessage',message)

      // Making a POST request using fetch
      fetch("http://localhost:3000/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "sendMessage", // Specify the action for the API route
          ...message, // Send message object in the body
        }),
      })
      .then((response) => {
        if (response.ok) {
          setValue('');
          setFile();
          setImage('');         
           setNewMessageFlag(prev => !prev);
          return response.json();
        }
          throw new Error("Message sending failed");
        })
        .then((data) => {
          console.log("Message has been sent successfully:", data);
          // Handle any UI updates or other actions after successful message sending
        })
        .catch((error) => {
          console.error("Error sending message:", error);
          // Handle error scenarios or show error to the user
        });
    }

    
  }; //end




  useEffect(() => {
    console.log("Conversation ID changed:", conversation?._id);

  const fetchData = async () => {
    if (conversation && conversation._id) {
      try {
        console.log("Fetching messages for conversation:", conversation._id);
        const response = await fetch(
          `http://localhost:3000/api/messages/id=${conversation._id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
console.log('✌️result --->', result);

        if (result && result.length > 0) {
          console.log("Received new messages:", result);
          setMessages(result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  fetchData();
}, [conversation?._id, person._id,newMessageFLag]);

useEffect(() => {
  scrollRef.current?.scrollIntoView({ transition: "smooth" })
}, [messages]);

useEffect(() => {
  incomingMessage && conversation?.members?.includes(incomingMessage.senderId) && 
      setMessages((prev) => [...prev, incomingMessage]);
  
}, [incomingMessage, conversation]);

  const Wrapper = styled(Box)`
    background-image: url(${"https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png"});
    background-size: 50%;
  `;

  const StyledFooter = styled(Box)`
    height: 55px;
    background: #ededed;
    // position: absolute;
    width: 100%;
    // bottom: 0
  `;

  const Component = styled(Box)`
    height: 80vh;
    overflow-y: scroll;
  `;

  const Container = styled(Box)`
    padding: 1px 80px;
  `;

  return (
    <>
      <Wrapper>
        <Component>
            {messages && messages.map(message => (
                <Container ref={scrollRef}>
                    <Message message={message}/>
                </Container>
            ))}
        </Component>
        <Footer sendText={sendText} setValue={setValue} value={value} setFile={setFile} file={file} image={image} setImage={setImage} />
      </Wrapper>
    </>
  );
}
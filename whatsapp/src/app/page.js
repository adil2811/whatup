'use client'
import Message from '@/Components/Message';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect } from 'react';

export default function Home() {
  const { data: session } = useSession();
  const sendApiRequest = async () => {
    if (session) {
      try {
        const response = await fetch('http://localhost:3000/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(session), // Sending the session data in the request body
        });

        if (response.ok) {
          console.log('API request successful');
        } else {
          console.error('Failed to send API request');
        }
      } catch (error) {
        console.error('Error sending API request:', error);
      }
    }
  };

  // Call the function to send the API request when the component mounts
  useEffect(() => {
    sendApiRequest();
  }, [session]); // Execute whenever the 'session' object changes

  console.log('this is', session);

  return (
    <>
      <Message />
    </>
  );
}

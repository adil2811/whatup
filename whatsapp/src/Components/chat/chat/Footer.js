'use client'
// Import necessary components and styles
import { UploadButton } from "@/utils/uploadthing";
import { styled, Box, InputBase } from '@mui/material';
import { EmojiEmotions, AttachFile, Mic } from '@mui/icons-material';
import { useEffect, useState } from "react";

// Styled components
const Container = styled(Box)`
    height: 55px;
    background: #ededed;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 15px;
    &  > * {
        margin: 5px;
        color: #919191;
    }
`;

const Search = styled(Box)`
    border-radius: 18px;
    background-color: #FFFFFF;
    width: calc(94% - 100px);
`;

const StyledInputBase = styled(InputBase)`
    width: auto;
    padding: 10px;
    padding-left: 25px;
    font-size: 14px;
    height: 40px;
`;

const ClipIcon = styled(AttachFile)`
    transform: rotate(40deg);
`;

// Your functional component
export default function Footer({ sendText, setValue, value , file , setFile, setImage}) {
    
console.log('✌️file NAME --->', file?.name);

    // Customize the appearance of UploadButton
    const uploadButtonAppearance = {
        container: 'bg-red-500', // Set the background color to red
    };
    console.log('✌️value --->', value);



    // useEffect(() => {
    //     console.log('File changed. Updating value:', file?.name);
    //     setValue(file?.name || '');
    // }, [file]);
    
    return (
        <Container>
            <EmojiEmotions />
            <ClipIcon className="mr-[-10px]" />

            {/* Use the UploadButton component with customized appearance */}
            <UploadButton
    className='w-1 h-10 opacity-0'
    endpoint="imageUploader"
    appearance={uploadButtonAppearance}
    onClientUploadComplete={(res) => {
        // Check if res is an array and has at least one item
        if (Array.isArray(res) && res.length > 0) {
            // Extract relevant information from the first item
            const firstFile = res[0];

            // Log the extracted information
            console.log("Files: ", firstFile);

            // Set the extracted information to the file state
            setFile({
                name: firstFile.name,
                // Add other relevant properties if needed
            });
            setValue(firstFile.url);
            setImage(firstFile.url); // Add this line to set the URL in setImage


            alert("Upload Completed");
        } else {
            // Handle the case when res is not as expected
            console.error("Unexpected response format:", res);
        }
    }}
    onUploadError={(error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
    }}
/>


            <Search>
                <StyledInputBase
                    placeholder="Type a message"
                    inputProps={{ 'aria-label': 'search' }}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyPress={(e) => sendText(e)}
                />
            </Search>
            <Mic />
        </Container>
    );
}

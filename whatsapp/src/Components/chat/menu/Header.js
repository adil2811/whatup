'use client'
import { useContext, useState } from 'react';

import { Box, styled } from '@mui/material';
import { Chat as MessageIcon } from '@mui/icons-material';


//components
import HeaderMenu from './HeaderMenu';
import { useSession } from 'next-auth/react';
import InfoDrawer from '@/Components/drawer/infoDrawer';

const Component = styled(Box)`
    height: 44px;
    background: #ededed;
    display: flex;
    padding: 8px 16px;
    align-items: center;
`;

const Wrapper = styled(Box) `
    margin-left: auto;
    & > * {
        margin-left: 2px;
        padding: 8px;
        color: #000;
    };
    & :first-child {
        font-size: 40px;
        margin-right: 8px;
        margin-top: 3px;
    }
`;
    
const Image = styled('img') ({
  height: 40,
  width: 40,
  borderRadius: '50%',
  cursor: 'pointer',
  marginTop: '22px',
})

const Header = () => {
    
    const [openDrawer, setOpenDrawer] = useState(false);

const { data : session} = useSession()    
console.log(session)
    const toggleDrawer = () => {
        setOpenDrawer(true);
    }

    return (
        <>
        
            <Component>
            {session && session.image ? (
        <Image src={session.image} alt='dp' onClick={() => toggleDrawer()} />
      ) : (
        <Image onClick={() => toggleDrawer()}  className='h-[40px] w-[40px] mb-5 rounded-full' src='/360_F_65104718_x17a76wzWKIm3BlhA6uyYVkDs9982c6q.jpg' alt='default dp' />
      )}             
         <Wrapper>
                    <MessageIcon />
                    <HeaderMenu/>
                </Wrapper>
            </Component>
            <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} profile={true} />
        </>
    )
}

export default Header;
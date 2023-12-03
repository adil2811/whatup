'use client'
import { Box, styled, Typography } from "@mui/material";
import { useSession } from "next-auth/react";

const ImageContainer = styled(Box)`
  display: flex;
  justify-content: center;
`;

const Image = styled('img') ({
  width: 180,
  height: 200,
  borderRadius: '50%',
  padding: '25px 0'
});

const BoxWrapper = styled(Box)`
  background: #FFFFFF;
  padding: 12px 30px 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  & :first-child {
    font-size: 13px;
    color: #009688;
    font-weight: 200;
  }
  & :last-child {
    margin: 14px 0;
    color: #4A4A4A;
  }
`;

const DescriptionContainer = styled(Box)`
  padding: 15px 20px 28px 30px;
  & > p {
    color: #8696a0;
    font-size: 13px;
  }
`;

const Profile = () => {
  const { data: session } = useSession();
  

  return (
    <>
      <ImageContainer>
        {session && session.user && session.user.image ? (
          <Image src={session.user.image} alt='dp' />
        ) : (
          <Image  src='/360_F_65104718_x17a76wzWKIm3BlhA6uyYVkDs9982c6q.jpg' alt='default dp' />
        )}
      </ImageContainer>
      <BoxWrapper>
        <Typography variant="subtitle1">Your name</Typography>
        <Typography variant="body1">{session && session.user ? session.user.name : 'Name not available'}</Typography>
      </BoxWrapper>
      <DescriptionContainer>
        <Typography variant="body2">This is not your username or pin. This name will be visible to your WhatsApp contacts.</Typography>
      </DescriptionContainer>
      <BoxWrapper>
        <Typography variant="subtitle1">About</Typography>
        <Typography variant="body1">{session && session.user ? session.user.about : 'No information available'}</Typography>
      </BoxWrapper>
    </>
  );
};

export default Profile;

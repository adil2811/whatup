'use client'
import React, { useState } from 'react';
import { Box, InputBase } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import styled from '@emotion/styled';

const Component = styled(Box)`
  background: #fff;
  height: 45px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f2f2f2;
`;

const Wrapper = styled(Box)`
  position: relative;
  border-radius: 10px;
  background-color: #f0f2f5;
  margin: 0 13px;
  width: 100%;
`;

const Icon = styled(Box)`
  color: #919191;
  padding: 8px;
  height: 100%;
  position: absolute;
`;

const StyledInputBase = styled(InputBase)`
  width: calc(100% - 65px);
  padding: 16px;
  padding-left: 65px;
  font-size: 14px;
  height: 40px;
`;

export default function Search( { text,setText }) {


  return (
    <Component>
      <Wrapper>
        <Icon>
          <SearchIcon fontSize="small" />
        </Icon>
        <StyledInputBase
          placeholder="Search or start new chat"
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="search"
        />
      </Wrapper>
    </Component>
  );
}


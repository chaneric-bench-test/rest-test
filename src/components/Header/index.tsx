import { Box, Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';


const StyledBox = styled(Box)`
  background: #098b8c;
`;

const StyledTypography = styled(Typography)`
  color: white;
`

const Header: React.FC<{ title: string }> = (props) => {
  const { title } = props;

  return (
    <StyledBox justifyContent='center' p={4}>
      <StyledTypography>{title}</StyledTypography>
    </StyledBox>
  )
};

export default Header;

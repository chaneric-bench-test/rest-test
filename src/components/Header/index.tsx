import { Box, Typography } from '@material-ui/core';
import React from 'react';


const Header: React.FC<{ title: string }> = (props) => {
  const { title } = props;

  return (
    <Box>
      <Typography variant='h4'>{title}</Typography>
    </Box>
  )
};

export default Header;

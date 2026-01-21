import type { ReactNode } from 'react';
import { AppBar, Box, Typography } from '@mui/material';

interface LayoutProps {
  children: ReactNode;
}


export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <AppBar position="static" className="bg-white shadow-sm p-4 ">
      <Box className="flex items-center gap-2 container mx-auto">
      {/* Icon Container */}
      <Box className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
        <Typography 
          component="span" 
          className="text-white font-bold text-xl italic leading-none"
        >
          S
        </Typography>
      </Box>
      
      {/* Title Text */}
      <Typography 
        component="h1" 
        sx={{fontWeight:'bold', fontSize:'20px',color:'#000'}}
      >
        SMD
      </Typography>
    </Box>
      </AppBar>
      <div className="container mt-4">
        {children}
      </div>
    </>
  );
}

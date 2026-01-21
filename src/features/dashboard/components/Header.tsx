import { Box,  Typography } from "@mui/material";

export default function Header({children}: {children: React.ReactNode}) {
  return (
    <Box 
    component="header" 
    className="flex items-center justify-between gap-4 mb-10"
  >
    {/* Text Section */}
    <Box>
      <Typography component="h2" sx={{fontWeight:'bold', fontSize:{xs:'24px', md:'32px'}}} className="text-3xl font-bold text-slate-900">
        General Overview
      </Typography>
      <Typography 
        component="p" 
        sx={{fontSize:'14px'}}
        className="text-slate-500"
      >
        Welcome back. Here's what's happening today.
      </Typography>
    </Box>
    
    {/* Action Section */}
    <Box className="flex items-center gap-3">        
      {/* Add Account Button */}
      {children}
    </Box>
  </Box>
  );
}
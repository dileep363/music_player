import { Box } from '@mui/material';
import MainPage from './pages/MainPage';
import { useState } from 'react';

function App() {
  const [bgColor,setBgColor]=useState("black")
  return (
    <Box sx={{backgroundColor:bgColor,color:"white",scrollbarWidth: "none", msOverflowStyle: "none"}} >
      <MainPage setBgColor={setBgColor}/>
    </Box>
  );
}

export default App;

import { Box, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const SideBar = () => {
  return (
    <Box sx={{ height: "100vh", width: "300px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <Box sx={{ height: "40px",  display: "flex",paddingLeft: "20px",paddingTop:"20px" }}>
            <img src='https://logodownload.org/wp-content/uploads/2016/09/spotify-logo-branca-white.png' alt='no image' width={"135px"} />
        </Box>
        <AccountCircleIcon sx={{paddingBottom:"20px",paddingLeft:"20px"}}/>
    </Box>

  )
}

export default SideBar;

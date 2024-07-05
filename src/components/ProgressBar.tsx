import { Box } from "@mui/material";

const ProgressBar = ({
    progressBarRef,
    audioRef,
    timeProgress,
    duration,
  }:any) => {
    const handleProgressChange = () => {
      audioRef.current.currentTime = progressBarRef.current.value;
    };
  
    
  
    return (
      <Box className="progress" sx={{marginTop:"20px",justifyContent:"center"}}>
        {/* <span className="time current">{formatTime(timeProgress)}</span> */}
        <input
        style={{width:"500px"}}
          type="range"
          ref={progressBarRef}
          defaultValue="0"
          onChange={handleProgressChange}
        />
        {/* <span className="time">{formatTime(duration)}</span> */}
      </Box>
    );
  };
  
  export default ProgressBar;
  
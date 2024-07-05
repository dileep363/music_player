import { Box, Typography } from '@mui/material';
import { BsMusicNoteBeamed } from 'react-icons/bs';

const DisplayTrack = ({
  currentTrack,
  audioRef,
  setDuration,
  progressBarRef,
  handleNext,
}:any) => {
  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };

  return (
    <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"10px"}}>
      <audio
        src={currentTrack.url}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleNext}
      />
      <Box className="audio-info" sx={{display:"flex",flexDirection:"column"}}>
      <Box className="text">
          <Typography variant='h4'>{currentTrack.name}</Typography>
          <Typography>{currentTrack.artist}</Typography>
        </Box>
        <Box className="audio-image" sx={{height:"400px",width:"480px",marginTop:"20px"}}>
          {currentTrack.cover ? (
            <img src={`https://cms.samespace.com/assets/${currentTrack.cover}`} alt="audio avatar" height={"400px"} style={{borderRadius:"8px"}} />
          ) : (
            <Box className="icon-wrapper">
              <span className="audio-icon">
                <BsMusicNoteBeamed />
              </span>
            </Box>
          )}
        </Box>
        
      </Box>
    </Box>
  );
};
export default DisplayTrack;

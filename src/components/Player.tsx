import { Box, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import Controls from './Controls';
import DisplayTrack from './DisplayTrack';
import ProgressBar from './ProgressBar';

interface PlayerProps {
  isLoading: boolean;
  songs: any[];
  setBgColor: any;
  currentTrack: any;
  setCurrentTrack: (track: any) => void;
}

export default function Player({ isLoading, songs, setBgColor, currentTrack, setCurrentTrack }: PlayerProps) {
  const [trackIndex, setTrackIndex] = useState(0);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);

  // Update currentTrack when songs or trackIndex changes
  useEffect(() => {
    if (!isLoading && songs.length > 0) {
      setCurrentTrack(songs[trackIndex]);
      setBgColor(songs[trackIndex].accent);
    }
  }, [isLoading, songs, trackIndex]);

  const handleNext = () => {
    if (trackIndex >= songs.length - 1) {
      setTrackIndex(0);
    } else {
      setTrackIndex(trackIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (trackIndex <= 0) {
      setTrackIndex(songs.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  };

  useEffect(() => {
    if (currentTrack) {
      const index = songs.findIndex((song) => song.id === currentTrack.id);
      setTrackIndex(index);
      setBgColor(currentTrack.accent);
    }
  }, [currentTrack, songs]);

  return (
    <Box className="audio-player" sx={{ width: "60%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box sx={{ width: "480px", display: "flex", flexDirection: "column", height: "600px", justifyContent: "center", alignItems: "center" }}>
        {isLoading ? (
          <Typography>Loading player...</Typography>
        ) : (
          currentTrack && (
            <>
              <DisplayTrack
                currentTrack={currentTrack}
                audioRef={audioRef}
                setDuration={setDuration}
                progressBarRef={progressBarRef}
                handleNext={handleNext}
              />
              <ProgressBar
                progressBarRef={progressBarRef}
                audioRef={audioRef}
                timeProgress={timeProgress}
                duration={duration}
                setTimeProgress={setTimeProgress}
              />
              <Controls
                audioRef={audioRef}
                progressBarRef={progressBarRef}
                duration={duration}
                setTimeProgress={setTimeProgress}
                tracks={songs}
                trackIndex={trackIndex}
                setTrackIndex={setTrackIndex}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
              />
            </>
          )
        )}
      </Box>
    </Box>
  );
}

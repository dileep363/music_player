import React, { useCallback, useEffect, useRef, useState } from 'react';

// Icons
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { Box, Button, Popover } from '@mui/material';
import {
  IoMdVolumeHigh,
  IoMdVolumeLow,
  IoMdVolumeOff,
} from 'react-icons/io';

const Controls = ({
  audioRef,
  progressBarRef,
  duration,
  setTimeProgress,
  tracks,
  trackIndex,
  setTrackIndex,
  setCurrentTrack,
  handleNext,
  handlePrevious
}: any) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const playAnimationRef = useRef<any>();

  const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      '--range-progress',
      `${(progressBarRef.current.value / duration) * 100}%`
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  // const handlePrevious = () => {
  //   if (trackIndex === 0) {
  //     let lastTrackIndex = tracks.length - 1;
  //     setTrackIndex(lastTrackIndex);
  //     setCurrentTrack(tracks[lastTrackIndex]);
  //   } else {
  //     setTrackIndex((prev: any) => prev - 1);
  //     setCurrentTrack(tracks[trackIndex - 1]);
  //   }
  // };

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  }, [volume, audioRef, muteVolume]);

  const handleVolumeClick = (event: any) => {
    // setMuteVolume((prev) => !prev);
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleVolumeChange = (e: any) => {
    setVolume(e.target.value);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box className="controls-wrapper" sx={{width:"100%",display:"flex",flexDirection:"row",marginTop:"20px",alignItems:"center",justifyContent:"space-between"}}>
      <Box>
        <Button sx={{ color: "white" }}>
          <MoreHorizIcon sx={{ fontSize: "40px" }} />
        </Button>
      </Box>
      <Box>
        <Button onClick={handlePrevious} sx={{ color: "grey" }}>
          <FastRewindIcon sx={{ fontSize: "40px" }} />
        </Button>
        <Button onClick={togglePlayPause} sx={{ color: "white" }}>
          {isPlaying ? (
            <PauseCircleFilledIcon sx={{ fontSize: "40px" }} />
          ) : (
            <PlayCircleFilledIcon sx={{ fontSize: "40px" }} />
          )}
        </Button>
        <Button onClick={handleNext} sx={{ color: "grey" }}>
          <FastForwardIcon sx={{ fontSize: "40px" }} />
        </Button>
      </Box>
      <Box >
        <Button onClick={handleVolumeClick} sx={{ color: "white" }}>
          {muteVolume || volume < 5 ? (
            <IoMdVolumeOff style={{ fontSize: "35px" }} />
          ) : volume < 40 ? (
            <IoMdVolumeLow style={{ fontSize: "35px" }} />
          ) : (
            <IoMdVolumeHigh style={{ fontSize: "35px" }} />
          )}
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Box sx={{ padding: 2 }}>
            <input
              type="range"
              min={0}
              max={50}
              value={volume}
              onChange={handleVolumeChange}
              style={{
                WebkitAppearance: 'slider-vertical', // For Safari
                background: `linear-gradient(to top, black ${volume}%, #ccc ${volume}%)`,
                height: '100px',
                width:"20px"
              }}
            />
          </Box>
        </Popover>
      </Box>
    </Box>
  );
};

export default Controls;

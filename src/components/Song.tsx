import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const Song = ({ songData, isPlaying, onPlay }: any) => {
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    const fetchSongDuration = async () => {
      try {
        const audio = new Audio(songData.url);

        await new Promise((resolve, reject) => {
          audio.onloadedmetadata = resolve;
          audio.onerror = reject;
        });

        const songDuration = audio.duration;
        audio.remove();

        setDuration(songDuration);
      } catch (error) {
        console.error('Error fetching song duration:', error);
      }
    };

    fetchSongDuration();
  }, [songData.url]);

  return (
    <Box
      sx={{
        width: "85%",
        marginTop: "25px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: isPlaying ? "#000000" : "transparent",
        borderRadius: "8px",
        padding: "10px",
        cursor: "pointer",
        '&:hover': {
          backgroundColor: "#f0f0f0",
        },
      }}
      onClick={onPlay}
    >
      <Box sx={{ display: "flex", flexDirection: "row", gap: "20px", alignItems: "center" }}>
        <Box style={{ width: "50px", height: "50px", borderRadius: "50%", overflow: "hidden" }}>
          <img
            src={`https://cms.samespace.com/assets/${songData.cover}`}
            alt="no image"
            style={{ width: "100%", height: "100%", }}
          />
        </Box>
        <Stack>
          <Typography variant='body1' sx={{ fontWeight: "500" }}>{songData.name}</Typography>
          <Typography variant='body2' sx={{ fontWeight: "100", color: "grey" }}>{songData.artist}</Typography>
        </Stack>
      </Box>
      <Box>
        {duration !== null && (
          <Typography variant='body1' sx={{ fontWeight: "100", color: "grey" }}>{`${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, '0')}`}</Typography>
        )}
      </Box>
    </Box>
  );
}

export default Song;

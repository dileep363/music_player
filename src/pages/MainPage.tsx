import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import Player from '../components/Player';
import SearchIcon from '@mui/icons-material/Search';
import Song from '../components/Song';

function MainPage({ setBgColor }: any) {
  const [selectedTab, setSelectedTab] = useState<'forYou' | 'topTracks'>('forYou');
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [currentTrack, setCurrentTrack] = useState<any>(null);

  const handleTabClick = (tab: 'forYou' | 'topTracks') => {
    setSelectedTab(tab);
  };

  const fetchData = async () => {
    setIsLoading(true); // Set loading state to true before fetching
    try {
      const response = await fetch('https://cms.samespace.com/items/songs');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = selectedTab === 'forYou' ? data?.data : data?.data?.filter((song: any) => song.top_track);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', overflow: "none" }}>
      <SideBar />
      <Box>
        <Box sx={{ width: "450px", display: 'flex', flexDirection: 'row', gap: '10%', whiteSpace: 'nowrap', paddingTop: "20px" }}>
          <Typography variant='h6' sx={{ fontWeight: '600', opacity: selectedTab === 'forYou' ? 1 : 0.5, cursor: 'pointer' }} onClick={() => handleTabClick('forYou')}>
            For You
          </Typography>
          <Typography variant='h6' sx={{ fontWeight: '600', opacity: selectedTab === 'topTracks' ? 1 : 0.5, cursor: 'pointer' }} onClick={() => handleTabClick('topTracks')}>
            Top Tracks
          </Typography>
        </Box>
        <Box sx={{ paddingTop: "30px" }}>
          <TextField
            type='text'
            sx={{ width: "90%" }}
            placeholder='Search Song, Artist'
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
              sx: {
                backgroundColor: "white",
                borderRadius: "8px",
                height: "50px"
              }
            }}
          />
          <Box sx={{ height: "82vh", overflow: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {isLoading ? (
              <Typography>Loading...</Typography>
            ) : (
              filteredData?.map((songData: any, index: number) => (
                <Song key={index} songData={songData} isPlaying={currentTrack?.id === songData.id} onPlay={() => setCurrentTrack(songData)} />
              ))
            )}
          </Box>
        </Box>
      </Box>
      <Player setBgColor={setBgColor} isLoading={isLoading} songs={data?.data || []} currentTrack={currentTrack} setCurrentTrack={setCurrentTrack} />
    </Box>
  );
}

export default MainPage;

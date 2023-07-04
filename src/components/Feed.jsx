import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import Videos from "./Videos";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import CircularIndeterminate from "./Loading";
const BASE_URL = "https://youtube-v31.p.rapidapi.com";
const options = {
  url: BASE_URL,
  params: {
    regionCode: "US",
    maxResults: "50",
    order: "date",
  },
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};
const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const { isLoading, error, data } = useQuery({
    queryKey: ["youtubeData", selectedCategory],
    queryFn: () =>
      axios.get(
        `${BASE_URL}/search?part=snippet&q=${selectedCategory}`,
        options
      ),
  });
  if (error) {
    return <div>Sorry there is some error</div>;
  }
  return (
    <Stack
      sx={{
        flexDirection: { sx: "column", md: "row" },
      }}
    >
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRightWidth: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Typography
          className="copyright"
          variant="body2"
          sx={{
            m5: 1.5,
            color: "#fff",
          }}
        >
          Copyright {new Date().getFullYear()} Subhash Kandhway
        </Typography>
      </Box>
      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography
          variant="h5"
          fontWeight={"bold"}
          mb={2}
          sx={{
            color: "white",
          }}
        >
          {selectedCategory} <span style={{ color: "#F31503" }}>Videos</span>
        </Typography>
        {isLoading ? (
          <CircularIndeterminate />
        ) : (
          <Videos videos={data?.data.items} />
        )}
      </Box>
    </Stack>
  );
};

export default Feed;

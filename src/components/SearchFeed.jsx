import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { Videos } from "./";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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

const SearchFeed = () => {
  const { searchTerm } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["youtubeData", searchTerm],
    queryFn: () =>
      axios.get(`${BASE_URL}/search?part=snippet&q=${searchTerm}`, options),
  });

  return (
    <Box p={2} minHeight="95vh">
      <Typography
        variant="h4"
        fontWeight={900}
        color="white"
        mb={3}
        ml={{ sm: "100px" }}
      >
        Search Results for{" "}
        <span style={{ color: "#FC1503" }}>{searchTerm}</span> videos
      </Typography>
      <Box display="flex">
        <Box sx={{ mr: { sm: "100px" } }} />
        {isLoading ? (
          <CircularIndeterminate />
        ) : (
          <Videos videos={data?.data.items} />
        )}
      </Box>
    </Box>
  );
};

export default SearchFeed;

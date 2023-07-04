/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { Videos } from "./";

////
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CircularIndeterminate from "./Loading";
import ChannelCard from "./ChannelCard";
const BASE_URL = "https://youtube-v31.p.rapidapi.com";
const options = {
  url: BASE_URL,
  params: {
    regionCode: "US",
    maxResults: "100",
    order: "date",
  },
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

////
const ChannelDetail = () => {
  const { id } = useParams();
  const {
    isLoading: channelLoading,
    error: channelError,
    data: channelData,
  } = useQuery({
    queryKey: ["channelData", id],
    queryFn: () =>
      axios.get(`${BASE_URL}/channels?part=snippet&id=${id}`, options),
  });

  console.log(channelData?.data);

  const {
    isLoading: youtubeLoading,
    error: youtubeError,
    data: videoData,
  } = useQuery({
    queryKey: ["youtubeData", id],
    queryFn: () =>
      axios.get(
        `${BASE_URL}/search?channelId=${id}&part=snippet&order=date`,
        options
      ),
  });

  return (
    <Box minHeight={"95vh"}>
      <Box>
        <div
          style={{
            backgroundImage: `url("${channelData?.data?.items[0]?.brandingSettings?.image?.bannerExternalUrl}")`,
            zIndex: 10,
            height: "300px",
          }}
        ></div>
        {/* <CircularIndeterminate /> */}
        {channelLoading ? (
          <CircularIndeterminate />
        ) : (
          <ChannelCard
            channelDetail={channelData?.data?.items[0]}
            marginTop="-165px"
          />
        )}
      </Box>
      <Box p={2} display="flex">
        <Box sx={{ mr: { sm: "100px" } }} />
        {/* <CircularIndeterminate /> */}
        {youtubeLoading ? (
          <CircularIndeterminate />
        ) : (
          <Videos videos={videoData?.data?.items} />
        )}
      </Box>
    </Box>
  );
};

export default ChannelDetail;

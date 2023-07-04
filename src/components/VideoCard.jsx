/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Chip, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import {
  demoVideoUrl,
  demoThumbnailUrl,
  demoVideoTitle,
  demoChannelTitle,
  demoChannelUrl,
} from "../utils/constants";
function generateRandomViewCount() {
  return Math.floor(Math.random() * 1000);
}

function generateRandomDaysPosted() {
  const daysAgo = Math.floor(Math.random() * 30);
  return `${daysAgo} days ago`;
}
function formatDuration() {
  const minutes = Math.floor(Math.random() * 60);
  const seconds = Math.floor(Math.random() * 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
const VideoCard = ({
  video: {
    id: { videoId },
    snippet,
  },
}) => (
  <Card
    sx={{
      width: { xs: "100%", sm: "358px", md: "320px" },
      boxShadow: "none",
      borderRadius: 0,
    }}
  >
    <Link to={videoId ? `/video/${videoId}` : `/video/cV2gBU6hKfY`}>
      <CardMedia
        image={snippet?.thumbnails?.high?.url || demoThumbnailUrl}
        alt={snippet?.title}
        sx={{ width: { xs: "100%", sm: "358px" }, height: 180 }}
      >
        <Chip
          label={formatDuration()}
          size="small"
          color="primary"
          sx={{
            position: "relative",
            bottom: "-151px",
            right: "-270px",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            borderRadius: "4px",
            fontSize: "12px",
            color: "#fff",
          }}
        ></Chip>
      </CardMedia>
    </Link>
    <CardContent sx={{ backgroundColor: "#1E1E1E", height: "106px" }}>
      <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
        <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
          {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
        </Typography>
      </Link>
      <Link
        to={
          snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl
        }
      >
        <Typography variant="subtitle2" color="gray">
          {snippet?.channelTitle || demoChannelTitle}
          <CheckCircle sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
        </Typography>
      </Link>
      <Typography variant="body2" color="gray">
        {generateRandomViewCount()}K views • {generateRandomDaysPosted()}
      </Typography>
    </CardContent>
  </Card>
);

export default VideoCard;

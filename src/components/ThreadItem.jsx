import React from "react";
import { useNavigate } from "react-router-dom";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { formatDate } from "../utils/format";

const ThreadItem = ({ thread }) => {
  const navigate = useNavigate();
  const {
    id,
    title,
    body,
    category,
    createdAt,
    ownerId,
    upVotesBy,
    totalComments,
  } = thread;

  const onThreadClick = () => {
    navigate(`/threads/${id}`);
  };

  const onThreadPress = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      navigate(`/threads/${id}`);
    }
  };

  return (
    <Card variant="outlined" sx={{ overflow: "visible" }}>
      <CardContent sx={{ pb: 1 }}>
        <Box sx={{ display: "flex", gap: 1, mb: 2, alignItems: "center" }}>
          <Chip
            label={`#${category}`}
            size="small"
            color="primary"
            variant="outlined"
            onClick={(e) => {
              e.stopPropagation();
            }}
            sx={{ borderRadius: 1, fontWeight: 600 }}
          />
          <Typography variant="caption" color="text.secondary">
            • Posted by {ownerId} • {formatDate(createdAt)}
          </Typography>
        </Box>

        <Typography
          variant="h6"
          component="div"
          tabIndex={0}
          role="button"
          sx={{
            mb: 1,
            lineHeight: 1.3,
            cursor: "pointer",
            "&:hover": { textDecoration: "underline" },
          }}
          onClick={onThreadClick}
          onKeyDown={onThreadPress}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            mb: 2,
          }}
        >
          {body}
        </Typography>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mr: 2 }}>
          <IconButton size="small" color="inherit">
            <ThumbUpOutlinedIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2" fontWeight="bold">
            {upVotesBy.length}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mr: 2 }}>
          <IconButton size="small" color="inherit">
            <ChatBubbleOutlineIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2" fontWeight="bold">
            {totalComments}
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton size="small" color="inherit">
          <ShareOutlinedIcon fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

ThreadItem.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    ownerId: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    totalComments: PropTypes.number.isRequired,
  }).isRequired,
};

export default ThreadItem;

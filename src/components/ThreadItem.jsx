import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import parse from "html-react-parser";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  asyncToggleDownVoteThread,
  asyncToggleNeutralVoteThread,
  asyncToggleUpVoteThread,
} from "../states/threads/action";
import { setNotifActionCreator } from "../states/notification/action";
import { getTimeAgo } from "../utils/format";

function ThreadItem({ thread }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const authUser = useSelector((state) => state.authUser);

  const {
    id,
    title,
    body,
    category,
    createdAt,
    ownerId,
    user,
    upVotesBy = [],
    downVotesBy = [],
    totalComments,
  } = thread;

  const isUpVoted = authUser && upVotesBy.includes(authUser.id);
  const isDownVoted = authUser && downVotesBy.includes(authUser.id);
  const voteScore = upVotesBy.length - downVotesBy.length;

  function onThreadClick() {
    navigate(`/threads/${id}`);
  }

  function onThreadPress(event) {
    if (event.key === "Enter" || event.key === " ") {
      navigate(`/threads/${id}`);
    }
  }

  function handleUpVote(e) {
    e.stopPropagation();
    if (!authUser) {
      dispatch(
        setNotifActionCreator({
          type: "error",
          message: "You need to login to vote.",
        })
      );
      navigate("/login");
      return;
    }
    if (isUpVoted) {
      dispatch(asyncToggleNeutralVoteThread(id));
    } else {
      dispatch(asyncToggleUpVoteThread(id));
    }
  }

  function handleDownVote(e) {
    e.stopPropagation();
    if (!authUser) {
      dispatch(
        setNotifActionCreator({
          type: "error",
          message: "You need to login to vote.",
        })
      );
      navigate("/login");
      return;
    }
    if (isDownVoted) {
      dispatch(asyncToggleNeutralVoteThread(id));
    } else {
      dispatch(asyncToggleDownVoteThread(id));
    }
  }

  return (
    <Card
      sx={{
        display: "flex",
        overflow: "visible",
        cursor: "pointer",
        "&:hover": {
          borderColor: alpha(theme.palette.primary.main, 0.3),
        },
      }}
      onClick={onThreadClick}
    >
      {/* Voting Sidebar */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          p: 1.5,
          pt: 2,
          bgcolor: alpha(theme.palette.text.primary, 0.02),
          borderRadius: "12px 0 0 12px",
          minWidth: 52,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Tooltip title="Upvote" placement="left">
          <IconButton
            size="small"
            onClick={handleUpVote}
            sx={{
              color: isUpVoted ? "#f97316" : "text.secondary",
              bgcolor: isUpVoted ? alpha("#f97316", 0.1) : "transparent",
              "&:hover": {
                color: "#f97316",
                bgcolor: alpha("#f97316", 0.1),
              },
            }}
          >
            <ArrowUpwardRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Typography
          variant="body2"
          sx={{
            fontWeight: 700,
            py: 0.5,
            color: isUpVoted
              ? "#f97316"
              : isDownVoted
              ? "#8b5cf6"
              : "text.primary",
          }}
        >
          {voteScore}
        </Typography>

        <Tooltip title="Downvote" placement="left">
          <IconButton
            size="small"
            onClick={handleDownVote}
            sx={{
              color: isDownVoted ? "#8b5cf6" : "text.secondary",
              bgcolor: isDownVoted ? alpha("#8b5cf6", 0.1) : "transparent",
              "&:hover": {
                color: "#8b5cf6",
                bgcolor: alpha("#8b5cf6", 0.1),
              },
            }}
          >
            <ArrowDownwardRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 2, pl: 2 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 1.5,
            flexWrap: "wrap",
          }}
        >
          <Chip
            label={`#${category}`}
            size="small"
            color="primary"
            variant="outlined"
            sx={{
              borderRadius: 2,
              fontWeight: 600,
              fontSize: "0.7rem",
              height: 24,
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
            <Avatar
              src={user?.avatar}
              sx={{
                width: 20,
                height: 20,
                fontSize: "0.7rem",
                bgcolor: "primary.main",
              }}
            >
              {user?.name.charAt(0)?.toUpperCase() || "U"}
            </Avatar>
            <Typography variant="caption" color="text.secondary">
              <Box
                component="span"
                sx={{ color: "text.primary", fontWeight: 600 }}
              >
                {user?.name}
              </Box>
              {" • "}
              {getTimeAgo(createdAt)}
            </Typography>
          </Box>
        </Box>

        {/* Title */}
        <Typography
          variant="h6"
          component="div"
          tabIndex={0}
          role="button"
          sx={{
            mb: 1,
            lineHeight: 1.35,
            fontWeight: 600,
            fontSize: "1.1rem",
            "&:hover": {
              color: "primary.main",
            },
          }}
          onClick={onThreadClick}
          onKeyDown={onThreadPress}
        >
          {title}
        </Typography>

        {/* Body */}
        <Typography
          component="div"
          variant="body1"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            mb: 2,
            "& div": { margin: 0 },
            "& p": { margin: 0 },
          }}
        >
          {parse(body)}
        </Typography>

        {/* Actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              px: 1.5,
              py: 0.75,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.text.primary, 0.05),
              cursor: "pointer",
              "&:hover": {
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: "primary.main",
              },
            }}
            onClick={(e) => {
              e.stopPropagation();
              onThreadClick();
            }}
          >
            <ChatBubbleOutlineRoundedIcon sx={{ fontSize: 18 }} />
            <Typography variant="caption" fontWeight={600}>
              {totalComments} {totalComments === 1 ? "comment" : "comments"}
            </Typography>
          </Box>

          <Tooltip title="Share">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                px: 1.5,
                py: 0.75,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.text.primary, 0.05),
                cursor: "pointer",
                "&:hover": {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: "primary.main",
                },
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <ShareRoundedIcon sx={{ fontSize: 18 }} />
              <Typography
                variant="caption"
                fontWeight={600}
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                Share
              </Typography>
            </Box>
          </Tooltip>

          <Tooltip title="Save">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                px: 1.5,
                py: 0.75,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.text.primary, 0.05),
                cursor: "pointer",
                "&:hover": {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: "primary.main",
                },
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <BookmarkBorderRoundedIcon sx={{ fontSize: 18 }} />
              <Typography
                variant="caption"
                fontWeight={600}
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                Save
              </Typography>
            </Box>
          </Tooltip>
        </Box>
      </Box>
    </Card>
  );
}

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

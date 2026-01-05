import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { alpha, useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import { getTimeAgo } from "../utils/format";

function ThreadDetail({ thread, authUser }) {
  const theme = useTheme();

  const {
    title,
    body,
    category,
    createdAt,
    owner,
    comments,
    upVotesBy = [],
    downVotesBy = [],
  } = thread;

  const voteScore = upVotesBy.length - downVotesBy.length;
  const isUpVoted = authUser && upVotesBy.includes(authUser?.id);
  const isDownVoted = authUser && downVotesBy.includes(authUser?.id);

  return (
    <Card sx={{ overflow: "visible" }}>
      <Box sx={{ display: "flex" }}>
        {/* Voting Sidebar */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 2,
            bgcolor: alpha(theme.palette.text.primary, 0.02),
            borderRadius: "12px 0 0 12px",
            minWidth: 60,
          }}
        >
          <Tooltip title="Upvote" placement="left">
            <IconButton
              size="small"
              sx={{
                color: isUpVoted ? "#f97316" : "text.secondary",
                bgcolor: isUpVoted ? alpha("#f97316", 0.1) : "transparent",
                "&:hover": {
                  color: "#f97316",
                  bgcolor: alpha("#f97316", 0.1),
                },
              }}
            >
              <ArrowUpwardRoundedIcon />
            </IconButton>
          </Tooltip>

          <Typography
            variant="h6"
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
              sx={{
                color: isDownVoted ? "#8b5cf6" : "text.secondary",
                bgcolor: isDownVoted ? alpha("#8b5cf6", 0.1) : "transparent",
                "&:hover": {
                  color: "#8b5cf6",
                  bgcolor: alpha("#8b5cf6", 0.1),
                },
              }}
            >
              <ArrowDownwardRoundedIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Thread Content */}
        <Box sx={{ flex: 1, p: 3 }}>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mb: 2,
              flexWrap: "wrap",
            }}
          >
            <Chip
              label={`#${category}`}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ borderRadius: 2, fontWeight: 600 }}
            />
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar
                src={owner.avatar}
                alt={owner.name}
                sx={{ width: 28, height: 28, bgcolor: "primary.main" }}
              >
                {owner.name?.charAt(0)?.toUpperCase()}
              </Avatar>
              <Typography variant="body2" color="text.secondary">
                <Box
                  component="span"
                  sx={{ color: "text.primary", fontWeight: 600 }}
                >
                  {owner.name}
                </Box>
                {" • "}
                {getTimeAgo(createdAt)}
              </Typography>
            </Box>
          </Box>

          {/* Title */}
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 700, mb: 3, lineHeight: 1.3 }}
          >
            {title}
          </Typography>

          {/* Body */}
          <Typography
            variant="body1"
            sx={{
              whiteSpace: "pre-line",
              lineHeight: 1.8,
              color: "text.secondary",
              mb: 3,
            }}
          >
            {body}
          </Typography>

          {/* Actions */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                px: 2,
                py: 1,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.text.primary, 0.05),
                cursor: "pointer",
                "&:hover": {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: "primary.main",
                },
              }}
            >
              <ChatBubbleOutlineRoundedIcon sx={{ fontSize: 18 }} />
              <Typography variant="body2" fontWeight={600}>
                {comments.length} comments
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                px: 2,
                py: 1,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.text.primary, 0.05),
                cursor: "pointer",
                "&:hover": {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: "primary.main",
                },
              }}
            >
              <ShareRoundedIcon sx={{ fontSize: 18 }} />
              <Typography variant="body2" fontWeight={600}>
                Share
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                px: 2,
                py: 1,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.text.primary, 0.05),
                cursor: "pointer",
                "&:hover": {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: "primary.main",
                },
              }}
            >
              <BookmarkBorderRoundedIcon sx={{ fontSize: 18 }} />
              <Typography variant="body2" fontWeight={600}>
                Save
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

ThreadDetail.propTypes = {
  thread: PropTypes.object.isRequired,
  authUser: PropTypes.object,
};

export default ThreadDetail;

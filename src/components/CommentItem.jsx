import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import parse from "html-react-parser";
import PropTypes from "prop-types";
import { getTimeAgo } from "../utils/format";

function CommentItem({ comment }) {
  return (
    <Card>
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* Comment Voting */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              pt: 0.5,
            }}
          >
            <IconButton
              size="small"
              sx={{
                color: "text.secondary",
                "&:hover": {
                  color: "#f97316",
                  bgcolor: alpha("#f97316", 0.1),
                },
              }}
            >
              <ArrowUpwardRoundedIcon fontSize="small" />
            </IconButton>
            <Typography variant="caption" fontWeight={700}>
              {(comment.upVotesBy?.length || 0) -
                (comment.downVotesBy?.length || 0)}
            </Typography>
            <IconButton
              size="small"
              sx={{
                color: "text.secondary",
                "&:hover": {
                  color: "#8b5cf6",
                  bgcolor: alpha("#8b5cf6", 0.1),
                },
              }}
            >
              <ArrowDownwardRoundedIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Comment Content */}
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 1,
              }}
            >
              <Avatar
                src={comment.owner.avatar}
                alt={comment.owner.name}
                sx={{ width: 24, height: 24, bgcolor: "primary.main" }}
              >
                {comment.owner.name?.charAt(0)?.toUpperCase()}
              </Avatar>
              <Typography variant="body2" fontWeight={600}>
                {comment.owner.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                • {getTimeAgo(comment.createdAt)}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              {parse(comment.content)}
            </Typography>

            {/* Comment Actions */}
            <Box sx={{ display: "flex", gap: 2, mt: 1.5 }}>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  cursor: "pointer",
                  fontWeight: 600,
                  "&:hover": { color: "primary.main" },
                }}
              >
                Reply
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  cursor: "pointer",
                  fontWeight: 600,
                  "&:hover": { color: "primary.main" },
                }}
              >
                Share
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default CommentItem;

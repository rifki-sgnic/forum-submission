import SendRoundedIcon from "@mui/icons-material/SendRounded";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import CommentItem from "./CommentItem";

function CommentSection({ comments, authUser }) {
  return (
    <Box sx={{ mt: 4 }}>
      {/* Add Comment */}
      <Card sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Avatar sx={{ width: 40, height: 40, bgcolor: "primary.main" }}>
            {authUser?.name?.charAt(0)?.toUpperCase() || "?"}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <TextField
              placeholder={
                authUser ? "What are your thoughts?" : "Login to comment..."
              }
              multiline
              rows={3}
              fullWidth
              disabled={!authUser}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button
                variant="contained"
                endIcon={<SendRoundedIcon />}
                disabled={!authUser}
              >
                Comment
              </Button>
            </Box>
          </Box>
        </Box>
      </Card>

      {/* Comments Header */}
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
        💬 Comments ({comments.length})
      </Typography>

      {/* Comments List */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </Box>
    </Box>
  );
}

CommentSection.propTypes = {
  comments: PropTypes.array.isRequired,
  authUser: PropTypes.object,
};

export default CommentSection;

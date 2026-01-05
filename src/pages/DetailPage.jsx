import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { alpha, useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ThreadDetail from "../components/ThreadDetail";
import CommentSection from "../components/CommentSection";
import { detailThread } from "../utils/mockData";

function DetailPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.authUser);

  // In a real app, we would fetch the thread detail based on ID
  const thread = detailThread;

  return (
    <Box sx={{ minHeight: "calc(100vh - 80px)", pb: 4 }}>
      <Container maxWidth="md" sx={{ pt: 3 }}>
        {/* Back Button */}
        <Button
          startIcon={<ArrowBackRoundedIcon />}
          onClick={() => navigate("/")}
          sx={{
            mb: 3,
            color: "text.secondary",
            "&:hover": {
              color: "primary.main",
              bgcolor: alpha(theme.palette.primary.main, 0.08),
            },
          }}
        >
          Back to Threads
        </Button>

        {/* Main Thread Content */}
        <ThreadDetail thread={thread} authUser={authUser} />

        {/* Comments Section */}
        <CommentSection comments={thread.comments} authUser={authUser} />
      </Container>
    </Box>
  );
}

export default DetailPage;

import React from "react";
// import { useParams } from "react-router-dom"; // unused for now
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { detailThread } from "../utils/mockData";
import { formatDate } from "../utils/format";

const DetailPage = () => {
  // const { id } = useParams(); // ID will be used for fetching in real app

  // In a real app, we would dispatch an action to fetch the thread detail by ID.
  // For now, we use the static mock detailThread.
  // const dispatch = useDispatch();
  // useEffect(() => { dispatch(asyncReceiveThreadDetail(id)); }, [id, dispatch]);

  const { title, body, category, createdAt, owner, comments } = detailThread;

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 2 }}>
        <Chip
          label={`#${category}`}
          color="primary"
          variant="outlined"
          sx={{ mb: 2, fontWeight: 600 }}
        />
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          {title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "text.secondary",
            mb: 4,
          }}
        >
          <Avatar
            src={owner.avatar}
            alt={owner.name}
            sx={{ width: 24, height: 24 }}
          />
          <Typography variant="body2">
            Posted by {owner.name} • {formatDate(createdAt)}
          </Typography>
        </Box>
        <Typography
          variant="body1"
          sx={{ whitespace: "pre-line", mb: 4, lineHeight: 1.6 }}
        >
          {body}
        </Typography>
      </Box>

      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
        Comments ({comments.length})
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {comments.map((comment) => (
          <Card key={comment.id} variant="outlined">
            <CardContent sx={{ py: 2 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar
                    src={comment.owner.avatar}
                    alt={comment.owner.name}
                    sx={{ width: 24, height: 24 }}
                  />
                  <Typography variant="subtitle2" fontWeight="bold">
                    {comment.owner.name}
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {formatDate(comment.createdAt)}
                </Typography>
              </Box>
              <Typography variant="body2">{comment.content}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default DetailPage;

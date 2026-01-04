import { Box } from "@mui/material";
import ThreadItem from "./ThreadItem";

export default function ThreadList({ threads }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {threads.map((thread) => (
        <ThreadItem key={thread.id} thread={thread} />
      ))}
    </Box>
  );
}

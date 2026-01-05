import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import ThreadItem from "./ThreadItem";
import ThreadSkeleton from "./ThreadSkeleton";
import EmptyState from "./EmptyState";

function ThreadList({ threads, loading = false }) {
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {[1, 2, 3].map((i) => (
          <ThreadSkeleton key={i} />
        ))}
      </Box>
    );
  }

  if (!threads || threads.length === 0) {
    return <EmptyState />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {threads.map((thread) => (
        <ThreadItem key={thread.id} thread={thread} />
      ))}
    </Box>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
  loading: PropTypes.bool,
};

export default ThreadList;

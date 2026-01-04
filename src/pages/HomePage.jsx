import FilterListIcon from "@mui/icons-material/FilterList";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveThreadsActionCreator } from "../states/threads/action";
import { mockThreads } from "../utils/mockData";
import ThreadList from "../components/ThreadList";

function HomePage() {
  const dispatch = useDispatch();
  const threads = useSelector((state) => state.threads);

  useEffect(() => {
    dispatch(receiveThreadsActionCreator(mockThreads));
  }, [dispatch]);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1">
          Explore
        </Typography>
        <Button startIcon={<FilterListIcon />} variant="outlined" size="small">
          Filter
        </Button>
      </Box>

      <ThreadList threads={threads} />
    </Container>
  );
}

export default HomePage;

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import { alpha, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ThreadList from "../components/ThreadList";
import { asyncPopulateUsersAndThreads } from "../states/shared/action";

function HomePage() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const users = useSelector((state) => state.users);
  const threads = useSelector((state) => state.threads);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("hot");

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
  }));

  const categories = [
    "all",
    ...new Set(threadList.map((t) => t.category.toLowerCase())),
  ];

  const filteredThreads =
    selectedCategory === "all"
      ? threadList
      : threadList.filter((t) => t.category.toLowerCase() === selectedCategory);

  const sortedThreads = [...filteredThreads].sort((a, b) => {
    if (sortBy === "hot") {
      return (
        b.upVotesBy.length -
        b.downVotesBy.length -
        (a.upVotesBy.length - a.downVotesBy.length)
      );
    }
    if (sortBy === "new") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sortBy === "top") {
      return b.upVotesBy.length - a.upVotesBy.length;
    }
    return 0;
  });

  const sortOptions = [
    {
      id: "hot",
      label: "Hot",
      icon: <LocalFireDepartmentIcon sx={{ fontSize: 18 }} />,
    },
    {
      id: "new",
      label: "New",
      icon: <NewReleasesIcon sx={{ fontSize: 18 }} />,
    },
    {
      id: "top",
      label: "Top",
      icon: <TrendingUpIcon sx={{ fontSize: 18 }} />,
    },
  ];

  return (
    <Box sx={{ minHeight: "calc(100vh - 80px)", pb: 4 }}>
      {/* Header */}
      <Box sx={{ pt: { xs: 3, md: 4 }, pb: { xs: 2, md: 3 } }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
            Explore Threads
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Discover conversations, share ideas, and connect with the community.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* Main Content */}
          <Box sx={{ flex: 1 }}>
            {/* Filters */}
            <Card sx={{ p: 2, mb: 3 }}>
              {/* Sort Buttons */}
              <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
                {sortOptions.map((option) => (
                  <Button
                    key={option.id}
                    variant={sortBy === option.id ? "contained" : "text"}
                    size="small"
                    startIcon={option.icon}
                    onClick={() => setSortBy(option.id)}
                    sx={{
                      borderRadius: 2,
                      px: 2,
                      color: sortBy === option.id ? "#fff" : "text.secondary",
                    }}
                  >
                    {option.label}
                  </Button>
                ))}
              </Box>

              <Divider sx={{ my: 1.5 }} />

              {/* Category Chips */}
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  overflowX: "auto",
                  pb: 1,
                  "&::-webkit-scrollbar": {
                    height: 4,
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: alpha(theme.palette.text.primary, 0.2),
                    borderRadius: 2,
                  },
                }}
              >
                {categories.map((cat) => (
                  <Chip
                    key={cat}
                    label={cat === "all" ? "All Topics" : `#${cat}`}
                    onClick={() => setSelectedCategory(cat)}
                    variant={selectedCategory === cat ? "filled" : "outlined"}
                    color={selectedCategory === cat ? "primary" : "default"}
                    sx={{
                      borderRadius: 2,
                      fontWeight: 600,
                      textTransform: "capitalize",
                      flexShrink: 0,
                    }}
                  />
                ))}
              </Box>
            </Card>

            {/* Thread List */}
            <ThreadList threads={sortedThreads} />
          </Box>

          {/* Sidebar */}
          <Box
            sx={{
              width: { xs: "100%", md: 280 },
              flexShrink: 0,
              display: { xs: "none", md: "block" },
            }}
          >
            {/* Trending Topics */}
            <Card sx={{ p: 2.5, mb: 2 }}>
              <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                🔥 Trending Topics
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  mt: 2,
                }}
              >
                {categories.slice(1, 6).map((cat, index) => (
                  <Box
                    key={cat}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      p: 1.5,
                      borderRadius: 2,
                      cursor: "pointer",
                      "&:hover": {
                        bgcolor: alpha(theme.palette.primary.main, 0.08),
                      },
                    }}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        width: 20,
                        height: 20,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 1,
                        bgcolor: "primary.main",
                        color: "#fff",
                        fontWeight: 700,
                      }}
                    >
                      {index + 1}
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      sx={{ textTransform: "capitalize" }}
                    >
                      #{cat}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Card>

            {/* Community Stats */}
            <Card sx={{ p: 2.5 }}>
              <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                📊 Community Stats
              </Typography>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" color="text.secondary">
                    Total Threads
                  </Typography>
                  <Typography variant="body2" fontWeight={700}>
                    {threads.length}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" color="text.secondary">
                    Categories
                  </Typography>
                  <Typography variant="body2" fontWeight={700}>
                    {categories.length - 1}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" color="text.secondary">
                    Total Users
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {users.length}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default HomePage;

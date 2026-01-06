import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncReceiveLeaderboards } from "../states/leaderboards/action";
import LeaderboardSkeleton from "../components/LeaderboardSkeleton";

function LeaderboardPage() {
  const dispatch = useDispatch();
  const leaderboards = useSelector((state) => state.leaderboards);
  const isLoading = useSelector((state) => state.loading > 0);
  const theme = useTheme();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <Box sx={{ minHeight: "calc(100vh - 80px)", pb: 4 }}>
      <Container maxWidth="md" sx={{ pt: { xs: 3, md: 4 } }}>
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
            Leaderboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            See who's contributing the most to the community.
          </Typography>
        </Box>

        <Card sx={{ overflow: "hidden" }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 2,
              p: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.05),
              borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
            }}
          >
            <Typography variant="subtitle2" fontWeight={700}>
              User
            </Typography>
            <Typography variant="subtitle2" fontWeight={700} align="right">
              Score
            </Typography>
          </Box>

          <Box>
            {isLoading
              ? [1, 2, 3, 4, 5].map((i) => <LeaderboardSkeleton key={i} />)
              : leaderboards.map((item, index) => (
                  <Box
                    key={item.user.id}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "auto 1fr auto",
                      alignItems: "center",
                      gap: 2,
                      p: 2,
                      borderBottom:
                        index !== leaderboards.length - 1
                          ? `1px solid ${theme.palette.divider}`
                          : "none",
                      transition: "background-color 0.2s ease-in-out",
                      "&:hover": {
                        bgcolor: alpha(theme.palette.primary.main, 0.08),
                      },
                    }}
                  >
                    {/* User Info */}
                    <Avatar
                      src={item.user.avatar}
                      alt={item.user.name}
                      sx={{ width: 40, height: 40 }}
                    />
                    <Box>
                      <Typography variant="body1" fontWeight={600}>
                        {item.user.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.user.email}
                      </Typography>
                    </Box>

                    {/* Score */}
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      color="primary.main"
                    >
                      {item.score}
                    </Typography>
                  </Box>
                ))}
          </Box>
        </Card>
      </Container>
    </Box>
  );
}

export default LeaderboardPage;

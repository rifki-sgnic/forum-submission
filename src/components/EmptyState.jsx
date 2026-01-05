import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";

function EmptyState() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
        px: 3,
        textAlign: "center",
        background: alpha(theme.palette.primary.main, 0.03),
        borderRadius: 4,
        border: `2px dashed ${alpha(theme.palette.primary.main, 0.2)}`,
      }}
    >
      <Box
        sx={{
          fontSize: 64,
          mb: 2,
          filter: "grayscale(50%)",
        }}
      >
        💬
      </Box>
      <Typography variant="h6" fontWeight={700} gutterBottom>
        No threads yet
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300 }}>
        Be the first to start a conversation! Create a new thread to get the
        discussion going.
      </Typography>
    </Box>
  );
}

export default EmptyState;

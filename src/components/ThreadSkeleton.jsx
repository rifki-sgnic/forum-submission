import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Skeleton from "@mui/material/Skeleton";

function ThreadSkeleton() {
  return (
    <Card sx={{ display: "flex", p: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          mr: 2,
        }}
      >
        <Skeleton variant="circular" width={28} height={28} />
        <Skeleton variant="text" width={24} />
        <Skeleton variant="circular" width={28} height={28} />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: "flex", gap: 1, mb: 1.5 }}>
          <Skeleton variant="rounded" width={80} height={24} />
          <Skeleton variant="text" width={150} />
        </Box>
        <Skeleton variant="text" width="90%" height={28} />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="70%" />
        <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
          <Skeleton variant="rounded" width={100} height={32} />
          <Skeleton variant="rounded" width={70} height={32} />
          <Skeleton variant="rounded" width={60} height={32} />
        </Box>
      </Box>
    </Card>
  );
}

export default ThreadSkeleton;

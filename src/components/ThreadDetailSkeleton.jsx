import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Skeleton from "@mui/material/Skeleton";

function ThreadDetailSkeleton() {
  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Skeleton variant="text" width={100} height={32} />
        <Skeleton variant="text" width="60%" height={48} />
      </Box>

      <Box sx={{ display: "flex", gap: 1, my: 2 }}>
        <Skeleton variant="text" width={80} />
        <Skeleton variant="text" width={120} />
      </Box>

      <Card sx={{ p: 3, mb: 4 }}>
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="90%" />
        <Box sx={{ mt: 3, display: "flex", gap: 1 }}>
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="circular" width={32} height={32} />
        </Box>
      </Card>

      <Box sx={{ mt: 4 }}>
        <Skeleton variant="text" width={150} height={32} sx={{ mb: 2 }} />
        {[1, 2, 3].map((i) => (
          <Card key={i} sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Skeleton variant="circular" width={40} height={40} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width={120} />
                <Skeleton variant="text" width="100%" />
              </Box>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default ThreadDetailSkeleton;

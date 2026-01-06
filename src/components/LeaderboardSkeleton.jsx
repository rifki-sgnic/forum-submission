import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

function LeaderboardSkeleton() {
  return (
    <Box sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
      <Skeleton variant="circular" width={40} height={40} />
      <Box sx={{ flex: 1 }}>
        <Skeleton variant="text" width={120} height={24} />
        <Skeleton variant="text" width={180} />
      </Box>
      <Skeleton variant="text" width={40} height={32} />
    </Box>
  );
}

export default LeaderboardSkeleton;

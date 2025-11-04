import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
};

export default function Loading() {
  return (
    <Box sx={style}>
      <CircularProgress />
    </Box>
  );
}
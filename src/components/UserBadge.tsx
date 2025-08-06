import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const UserBadge = () => {
  return (
    <Stack
      direction="row"
      sx={{
        gap: 1,
        alignItems: 'center',
      }}
    >
      <Avatar
        sizes="small"
        alt="Riley Carter"
        src="/assets/react.svg"
        sx={{ width: 36, height: 36 }}
      />

      <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
        Riley Carter
      </Typography>
    </Stack>
  );
};

export default UserBadge;

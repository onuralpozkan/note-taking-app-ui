import { Typography } from '@mui/material';
import Link from '@mui/material/Link';

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Designed by '}
      <Link color="inherit" href="https://onuralpozkan.com.tr/" target="_blank">
        Onuralp Özkan
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;

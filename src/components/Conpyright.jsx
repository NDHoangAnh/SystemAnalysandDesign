import Typography from "@mui/material/Typography";

const Copyright = () => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ mt: 5 }}
    >
      {`Copyright © PTTK ${new Date().getFullYear()}.`}
    </Typography>
  );
};

export default Copyright;

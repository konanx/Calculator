import React from "react";
import { Typography, Switch, Container, Stack } from "@mui/material";
function ThemeMode({ ...props }) {
  const { darkMode, setDarkMode } = props;
  return (
    <Container
      maxWidth="md"
      sx={{ mt: 2 }}
    >
      <Stack
        direction="row"
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
        <Typography variant="h6">Dark mode</Typography>
        <Switch
          checked={darkMode}
          onChange={(e) => {
            setDarkMode(e.target.checked);
          }}
        />
      </Stack>
    </Container>
  );
}

export default ThemeMode;

import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";
import { useState } from "react";
import Calculator from "./assets/components/Calculator/Calculator";
import { CssBaseline, Switch, Typography } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ThemeMode from "./assets/components/ThemeMode/ThemeMode";
function App() {
  const [darkMode, setDarkMode] = useState(true);
  let darkTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });
  darkTheme = responsiveFontSizes(darkTheme);
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <ThemeMode
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        <Calculator />
      </ThemeProvider>
    </>
  );
}

export default App;

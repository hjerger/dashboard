import "./App.css"
import Dashboard from "./components/Dashboard"

import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
})

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <Dashboard id="myDash" />
      </div>
    </ThemeProvider>
  )
}

export default App

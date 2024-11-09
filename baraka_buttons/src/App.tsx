import { Box, Typography } from "@mui/material"
import { AddRoomBox } from "./components/RoomBoxs"
import { Spacer } from "./components/Spacer"
import { theme } from "./Theme"
import { ThemeProvider } from "@mui/material/styles"
import { CssBaseline } from "@mui/material"
import MainIPField from "./components/MainIPField"

const App = () => {
    return (
        <Box sx={{ padding: '5vw', paddingTop: '2vw', paddingBottom: '2vw', width: '100vw', height: '100vh' }}>
            <ThemeProvider theme={theme}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant="h1">Baraka Buttons</Typography>
                    <Box sx={{ paddingTop: '3vw' }}>
                        <MainIPField />
                    </Box>
                </Box>
                <Spacer height="2vw" />
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '2vw' }}>
                    <AddRoomBox />
                </Box>
                <CssBaseline />
            </ThemeProvider>
        </Box >
    )
}

export default App

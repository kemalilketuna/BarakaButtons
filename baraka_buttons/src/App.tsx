import { theme } from "./Theme"
import { ThemeProvider } from "@mui/material/styles"
import { CssBaseline } from "@mui/material"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainContent from "./components/MainContent"
import { Provider } from 'react-redux';
import { store } from './redux/store';

const App = () => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <MainContent />
                </Provider>
                <CssBaseline />
            </ThemeProvider>
            <ToastContainer />
        </>
    )
}

export default App

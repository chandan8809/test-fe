import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import MainWindow from './components/testWindow/MainWindow';
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import NotFound from './components/notFound/NotFound';
import SignIn from './components/auth/Signin';
import SignUp from './components/auth/Signup';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResponsiveDrawer from './components/dashboard/MainContainer';
import LoadingPage from './components/loadingPage/LoadingPage';
import { initializeAxios } from './utils/axiosUtility';
import { AuthProvider } from './contexts/UserContext';
import Reports from './components/testWindow/Reports';


initializeAxios()

function App() {
  return (
    <div className="App">
    
      <CssBaseline />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        />
     
      <BrowserRouter>
      {/* <div>
        <Link to="/" className="link">
          Home
        </Link>
        <Link to="/apple" className="link">
          Apple
        </Link>
        <Link to="/applet" className="link">
          Applet
        </Link>
        <Link to="/test" className="link">
          Test
        </Link>
      </div> */}
      <Routes>
        <Route path="/" element={ <LoadingPage/>} />
        <Route path="/test/:exam_id" element={ <MainWindow/>} />
        <Route path="/result/:report_id" element={ <Reports/>} />
        <Route path="/login" element={ <SignIn/>} />
        <Route path="/register" element={ <SignUp/>} />
        <Route path="/dashboard" element={ <ResponsiveDrawer/>} />
        <Route path="/404" element={<NotFound/>} />

        {/* <Route path="/apple">
          <Route path="/" element={<ApplePage />} />
          <Route path="*" element={<Navigate replace to="/apple" />} />
        </Route> */}
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </BrowserRouter>
   
    </div>
  );
}

export default App;

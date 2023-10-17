import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import MainWindow from './components/testWindow/MainWindow';
import useMediaQuery from '@mui/material/useMediaQuery';

function App() {
  const matches = useMediaQuery('(min-width:600px)');

  return (
    <div className="App">
      <CssBaseline />
      <MainWindow/>
    </div>
  );
}

export default App;

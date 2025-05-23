import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import FormationLab from './components/FormationLab';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/formation" element={<FormationLab />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;

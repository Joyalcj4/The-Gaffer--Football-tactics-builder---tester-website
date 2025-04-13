import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import FormationLab from './components/FormationLab';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/formation" element={<FormationLab />} />
    </Routes>
  );
}

export default App;

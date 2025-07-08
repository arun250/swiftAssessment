import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import CommentScreen from './components/CommentScreen';
import ProfileScreenWrapper from './components/ProfileScreenWrapper';  


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ProfileScreenWrapper />} />
        <Route path="/comments" element={<CommentScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

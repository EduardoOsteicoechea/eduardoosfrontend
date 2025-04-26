import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import LogIn from './pages/LogIn';
import SignIn from './pages/SingIn';
import LogOut from './pages/LogOut';
import Header001 from './components/Header/Header001';
import AHealthyLoneliness from './pages/AHealthyLoneliness';

function App()
{
   return (
      <BrowserRouter>
         <Header001 />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/singin" element={<SignIn />} />
            <Route path="/logout" element={<LogOut />} />
            <Route path="/a_healthy_lonelyness" element={<AHealthyLoneliness />} />
         </Routes>
      </BrowserRouter>
   );
}

export default App;

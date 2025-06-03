import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Contact from './pages/Contact';
import LogIn from './pages/LogIn';
import SignIn from './pages/SingIn';
import LogOut from './pages/LogOut';
import ChurchMembership from './pages/ChurchMembership';
import AHealthyLoneliness from './pages/AHealthyLoneliness';
import Responding_to_hard_discipline from './pages/Responding_to_hard_discipline/Responding_to_hard_discipline';
import BeforeTheRoleAndTheTragedy from './pages/BeforeTheRoleAndTheTragedy/BeforeTheRoleAndTheTragedy';
import MGLearningStart from './pages/MGLearning/MGLearningStart';
import Home_002 from './pages/Home/Home_002';

function App()
{
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Home_002 />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/singin" element={<SignIn />} />
            <Route path="/logout" element={<LogOut />} />
            <Route path="/a_healthy_lonelyness" element={<AHealthyLoneliness />} />
            <Route path="/church_membership" element={<ChurchMembership />} />
            <Route path="/responding_to_hard_discipline" element={<Responding_to_hard_discipline />} />
            <Route path="/before_the_role_and_the_tragedy" element={<BeforeTheRoleAndTheTragedy />} />
            <Route path="/mglearning" element={<MGLearningStart />} />
         </Routes>
      </BrowserRouter>
   );
}

export default App;

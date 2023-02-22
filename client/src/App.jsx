import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { Header } from './components/index.js';
import { Dashboard, Login, Register } from './pages/index.js';

// 📦 App
const App = () => (
  <Router>
     <Header />
     <Routes>
       <Route path='/' element={<Dashboard />} />
       <Route path='/login' element={<Login />} />
       <Route path='/register' element={<Register />} />
     </Routes>
     <Toaster position='bottom-left' />
   </Router>
);

export default App;

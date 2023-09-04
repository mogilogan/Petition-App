
//imports
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

// components
import Login from './components/login/Logins'

import Getcomplain from './components/public/Getcomplain';
import Postpetition from './components/formpage/Postpetition';
import Home from './components/Home';
import Navbar from './components/Navbar/Navbar';


function App() {

  const user = JSON.parse(localStorage.getItem('profile'));
  return (
   <>
      {/* //static for all pages */}
      <Navbar/>
      <Home/>

      {/* //route through */}
       <Routes>
        <Route path='/' Component={Getcomplain}/>
        <Route path='/petition/add' Component={Postpetition}/>
        <Route path="/login" Component={Login}/>
    
       </Routes>
       </>
  );
}

export default App;


//imports
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

// components
import Login from './components/login/Logins'

import Getcomplain from './components/Status/Getcomplain';
import Postpetition from './components/formpage/Postpetition';
import Home from './components/Home';
import Navbar from './components/Navbar/Navbar';
import Petitions from './components/petitions/petitions';


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
        <Route path='/add' Component={Postpetition}/>
        <Route path='/petitions' Component={Petitions}/>
        <Route path="/login" Component={Login}/>
    
       </Routes>
       </>
  );
}

export default App;

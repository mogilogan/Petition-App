
//imports
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

// components
import Login from './components/login/Logins'
import Signup from './components/login/Signup';
import Getcomplain from './components/public/Getcomplain';
import Postpetition from './components/formpage/Postpetition';
import Home from './components/Home';


function App() {

  const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <BrowserRouter>
      {/* //static for all pages */}
      <Home/>

      {/* //route through */}
       <Routes>
        <Route path='/' Component={Getcomplain}/>
        <Route path='/petition/add' Component={Postpetition}/>
        <Route path="/login" Component={Login}/>
        <Route path="/signup" Component={Signup}/>
       </Routes>
   </BrowserRouter>
  );
}

export default App;

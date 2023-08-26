
import { Route, Routes } from 'react-router-dom';

import './App.css';
import Login from './components/login/Logins'
import Signup from './components/login/Signup';
import Getcomplain from './components/public/Getcomplain';
import Postpetition from './components/formpage/Postpetition';


function App() {
  return (
    <div className="App">
       <Routes>
        <Route path='/' Component={Getcomplain}/>
        <Route path='/petition/add' Component={Postpetition}/>
      <Route path="/login" Component={Login}/>
      <Route path="/signup" Component={Signup}/>
      </Routes>
    </div>
  );
}

export default App;

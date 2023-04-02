import './App.css';
import {
  Routes,
  Route,
  Link,
  useNavigate
} from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import CreatePost from './Components/CreatePost';
import Post from './Components/Post';
import { useEffect, useState } from 'react';
import Navigation from './Components/OtherSmallComponents/Navigation';
import Footer from './Components/Footer';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))
const navigate = useNavigate();
// useEffect(()=>{
//   navigate("/")
// })
  return (
    <div className='App'>
      
      <Routes>
        <Route exact path='/' element={< Home />}></Route>
        <Route exact path='/create' element={< CreatePost />}></Route>
        <Route exact path='/login' element={< Login setIsAuth={setIsAuth}/>}></Route>
        <Route exact path='/post/:id' element={<Post />}></Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;

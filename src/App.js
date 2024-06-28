import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import CreateAccountPage from "./Pages/CreateAccountPage";
import Toolbar from "./Components/Toolbar";
import LoginPage from "./Pages/LoginPage";
import PostsPage from "./Pages/PostsPage";
import {useState} from "react";
import CreatePostPage from "./Pages/CreatePostPage";
import UserPostsPage from "./Pages/UserPostsPage";
import UpdatePostPage from "./Pages/UpdatePostPage";
import SinglePostPage from "./Pages/SinglePostPage";
import FavoritesPage from "./Pages/FavoritesPage";

function App() {
    const [loggedIn, setLoggedIn]=useState(null)
  return (
    <div className="App">
      <BrowserRouter>
          <Toolbar logged={loggedIn} setLoggedIn={setLoggedIn}/>
        <Routes>
            <Route element={<CreateAccountPage/>} path="/createaccount"/>
            <Route element={<LoginPage setLogged={setLoggedIn}/>} path="/login"/>
            <Route element={<PostsPage logged={loggedIn}/>} path="/allposts"/>
            <Route element={<CreatePostPage/>} path="/createpost"/>
            <Route element={<SinglePostPage/>} path="/getsinglepost/:username/:id"/>
            <Route element={<UserPostsPage/>} path="/getuserpost/:username"/>
            <Route element={<UpdatePostPage/>} path="/updatepost/:username/:id"/>
            <Route element={<FavoritesPage/>} path="/favorites"/>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App;

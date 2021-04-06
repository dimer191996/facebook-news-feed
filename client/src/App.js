import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/auth";

import NavBar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AuthRouter from "./util/AuthRouter";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
function App() {
  return (
    <AuthProvider>
      <Router className="App">
        <NavBar />
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/posts/:postId" component={Post} />
        <AuthRouter exact path="/create_post" component={CreatePost} />
        <AuthRouter exact path="/profile" component={Profile} />
      </Router>
    </AuthProvider>
  );
}

export default App;

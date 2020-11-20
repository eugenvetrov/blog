import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

  import { PostsList, PostsInsert, PostsUpdate } from '../pages'

var Links = () => {
        return (
            <Router>
                <div className='navbar  navbar-expand-lg navbar-dark bg-dark'>
                    <nav>
                <Link to="/" className="navbar-brand">
                    My first MERN Application
                </Link>
                <Link to="/post/list" className="nav-link">
                    List Posts
                </Link>
                <Link to="/posts/create" className="nav-link">
                    Create Post
                </Link>
                    </nav>
                </div>
                <div>
                <Switch>
                <Route path="/posts/create" exact component={PostsInsert} />
                <Route path="/post/list" exact component={PostsList} />
                <Route path="/posts/update/:id"
                    exact
                    component={PostsUpdate} />
            </Switch>
                </div>
            </Router>
        )

    }

export default Links
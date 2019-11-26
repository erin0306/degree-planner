import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import logo from './img/logo.png';

class App extends Component {
    render() {
        return (
            <div id="mainBody">
                <div className="body-flex">
                    <div id="element-1">
                        <Nav/>
                    </div>
                    <Main/>
                </div>
                <footer></footer>
            </div>
        )
    }
}

class Nav extends Component {
    render() {
        return (
            <nav>
                <div className="logo">
                    <img src={logo} alt="logo"></img>
                </div>
                <ul>
                    <li id="dashboard"><a href="#dashboard" role="tab"><i className="fas fa-columns"
                                aria-hidden="true"><span>&nbsp;&nbsp;</span></i>Dashboard</a></li>
                    <li id="courses"><a href="#courses" role="tab" className="active"><i className="fas fa-book-reader"
                                aria-hidden="true"></i><span>&nbsp;&nbsp;</span>Courses</a></li>
                    <li><a href="#programs" role="tab"><i className="fas fa-graduation-cap"
                                aria-hidden="true"></i><span>&nbsp;</span>Programs</a></li>
                    <li><a href="#profile" role="tab"><i className="fas fa-user-alt"
                                aria-hidden="true"></i><span>&nbsp;&nbsp;</span>Profile</a></li>
                </ul>
            </nav>
        );
    }
}

class Main extends Component {
    render() {
        return (
            <div id="element-2">
                <header>
                    <h1>
                        <div class="hamburger-menu"><a href="#"><i class="fa fa-bars" aria-label="menu"></i></a></div>
                        Courses<button><i class="fas fa-sign-out-alt" aria-label="Log out"></i></button>
                    </h1>
                </header>
                <main>

                </main>
            </div>
        )
    }
}

export default App;

//Import Packages
import React, { Component } from 'react';
import { faSpinner, faGripLines, faHome, faBookOpen, faGraduationCap, faUserAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as d3 from 'd3';

//Import Local Files and Components
import { DashboardPage } from './Dashboard.js';
import { CoursePage } from './Courses.js'
import {ProgramPage} from './Programs.js'
import { Plan } from './Plan.js'
import { SignIn } from './SignIn.js'
import logo from './img/logo.png';
import data from './data/uwcourses.csv';
import firebase from 'firebase/app';

// Router
import { BrowserRouter as Router, Route, Link, Switch, NavLink, Redirect } from 'react-router-dom';
//App Render
class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            allCourses: [],
            page: "Dashboard",
            loading: true,
        };
    }

    componentDidMount() {
        this.render();
        d3.csv(data)
            .then((data) => {
                this.setState({ allCourses: data })
            }).catch((error) => { alert(error) });

        this.authUnregFunc = firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) { //firebaseUser defined: is logged in
                this.setState({ user: firebaseUser })
                //do something with firebaseUser (e.g. assign with this.setState())
            }
            else { //firebaseUser undefined: is not logged in
                this.setState({ user: null });
            }
            this.setState({ loading: false });
        });

    }

    // componentDidMount() {

    //   }

    componentWillUnmount() {
        this.authUnregFunc();
    }
    //A callback function for registering new users
    handleSignUp = (email, password, name) => {
        this.setState({ errorMessage: null }); //clear any old errors

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((credentials) => {
                return credentials.user.updateProfile({
                    displayName: name
                })
            }).catch((error) => {
                this.setState({ errorMessage: error.message });
                console.log(this.state.errorMessage);
            })

    }

    //A callback function for logging in existing users
    handleSignIn = (email, password) => {
        this.setState({ errorMessage: null }); //clear any old errors
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch((error) => {
                this.setState({ errorMessage: error.message });
            }); //log any errors for debugging

        //sign out a user

    }

    //A callback function for logging out the current user
    handleSignOut = () => {
        this.setState({ errorMessage: null }); //clear any old errors
        firebase.auth().signOut()
            .catch((error) => {
                this.setState({ errorMessage: error.message });
            }); //log any errors for debugging
    }


    changePage = (newPage) => {
        this.setState({ page: newPage });
    }


    render() {
        let content = null; //content to render

        if (!this.state.user) { //if logged out, show signup form
            if (this.state.loading === true) {
                content = (<div className="text-center">
                    <h2>Loading...</h2>
                </div>)
            } else {
                content = (

                    <SignIn signUpCallback={this.handleSignUp}
                        signInCallback={this.handleSignIn} errorMessage={this.state.errorMessage}/>
                );
            }
        } else { //if logged in, show welcome message
            content = (
                <div className="body-flex">
                    <div id="nav-element">
                        <RenderNav pageCallback={this.changePage} />
                    </div>
                    <RenderMain user={this.state.user} signoutCallback={this.handleSignOut} page={this.state.page} allCourses={this.state.allCourses} />
            </div>
            );
        }

        return content;
            // <div className="body-flex">
            //     <div id="nav-element">
            //         <RenderNav pageCallback={this.changePage} />
            //     </div>
                
            //     {content}
            //     {/* <SignIn signUpCallback={this.handleSignUp}
            //         signInCallback={this.handleSignIn} /> */}
            //     {/* <RenderMain page={this.state.page} allCourses={this.state.allCourses} /> */}
            // </div>
    }
}

class RenderNav extends Component {
    

    render() {
        return (
            <nav>
                <div className="logo">
                    <img src={logo} alt="logo"></img>
                </div>
                <ul>
                    <li ><NavLink to="/dashboard" activeClassName="activeLink"><FontAwesomeIcon icon={faHome} aria-hidden="true" /><span>&nbsp;&nbsp;</span>Dashboard</NavLink></li>
                    <li><NavLink to="/findcourses" activeClassName="activeLink"><FontAwesomeIcon icon={faBookOpen} aria-hidden="true" /><span>&nbsp;&nbsp;</span>Courses</NavLink></li>
                    <li><NavLink to="/findprograms" activeClassName="activeLink"><FontAwesomeIcon icon={faGraduationCap} aria-hidden="true" /><span>&nbsp;</span>Programs</NavLink></li>
                    <li><NavLink to="/yourplan" activeClassName="activeLink"><FontAwesomeIcon icon={faUserAlt} aria-hidden="true" /><span>&nbsp;&nbsp;</span>Your Plan</NavLink></li>
                </ul>
            </nav>
        );
    }
}

class RenderMain extends Component {
    // choosePage() {
    //     if (this.props.page === "Courses") {
    //         return <CoursePage isLoading={this.props.isLoading} allCourses={this.props.allCourses} />
    //     }
    //     return <DashboardPage />
    // }

    render() {
        return (
            <div id="main-element">
                <header>
                    <h1>
                        <div className="dropdown">
                            <div><button id="hamburger-menu" className="nav-buttons"><FontAwesomeIcon icon={faGripLines} aria-label="Menu" /></button></div>
                            <div className="dropdown-content">
                                <nav>
                                    <ul>
                                        <li><NavLink to="/dashboard" activeClassName="activeLink"><FontAwesomeIcon icon={faHome} aria-hidden="true" /><span>&nbsp;&nbsp;</span>Dashboard</NavLink></li>
                                        <li><NavLink to="/findcourses" activeClassName="activeLink"><FontAwesomeIcon icon={faBookOpen} aria-hidden="true" /><span>&nbsp;&nbsp;</span>Courses</NavLink></li>
                                        <li><NavLink to="/findprograms" activeClassName="activeLink"><FontAwesomeIcon icon={faGraduationCap} aria-hidden="true" /><span>&nbsp;</span>Programs</NavLink></li>
                                        <li><NavLink to="/yourplan" activeClassName="activeLink"><FontAwesomeIcon icon={faUserAlt} aria-hidden="true" /><span>&nbsp;&nbsp;</span>Your Plan</NavLink></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        {this.props.page}
                        <div ><button className="nav-buttons"><FontAwesomeIcon icon={faSignOutAlt} aria-label="Sign out" onClick={this.props.signoutCallback} /></button></div>
                    </h1>
                </header>

                <main>
                    {/* {this.choosePage()} */}
                    <Switch>
                        <Route path='/dashboard' render={(routerProps) => (
                            <DashboardPage {...routerProps} user={this.props.user} />
                        )} />
                        <Route path='/findcourses' render={(routerProps) => (
                            <CoursePage {...routerProps} allCourses={this.props.allCourses} />
                        )} />
                        <Route path='/findprograms' component={ProgramPage}/>
                        <Route path='/yourplan' render={(routerProps) => (
                            <Plan {...routerProps} allCourses={this.props.allCourses} user={this.props.user}/>
                        )} />
                        <Redirect to='/dashboard' />
                    </Switch>
                </main>
                <footer>
                    <p><small>&copy; Copyright 2019, <a href="mailto:erinchang0306@gmail.com">Erin Chang</a>, <a
                        href="mailto:khoa.luong@yahoo.com.vn">Khoa Luong</a></small></p>
                </footer>
            </div>
        );
    }
}

export default App;

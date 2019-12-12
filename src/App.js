//Import Packages
import React, { Component } from 'react';
import { faSpinner, faGripLines, faHome, faBookOpen, faGraduationCap, faUserAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as d3 from 'd3';

//Import Local Files and Components
import { DashboardPage } from './Dashboard.js';
import { CoursePage } from './Courses.js'
import { ProgramPage } from './Programs.js'
import {ProgramDetail} from './ProgramDetail.js'
import { Plan } from './Plan.js'
import { Completed } from './Completed.js'
import { Header } from './Header.js'
import { Footer } from './Footer.js'
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
                        signInCallback={this.handleSignIn} errorMessage={this.state.errorMessage} />
                );
            }
        } else { //if logged in, show welcome message
            content = (
                <div className="body-flex">
                    <div id="nav-element">
                        <RenderNav />
                    </div>
                    {/* <RenderMain user={this.state.user} signoutCallback={this.handleSignOut} page={this.state.page} allCourses={this.state.allCourses} /> */}
                    <Switch>
                        <Route path='/dashboard' render={(routerProps) => (
                            <DashboardPage {...routerProps} user={this.state.user} signoutCallback={this.handleSignOut} allCourses={this.state.allCourses}/>
                        )} />
                        <Route path='/findcourses' render={(routerProps) => (
                            <CoursePage {...routerProps} allCourses={this.state.allCourses} signoutCallback={this.handleSignOut}/>
                        )} />
                        
                        <Route exact path='/findprograms' render={(routerProps) => (
                            <ProgramPage {...routerProps} signoutCallback={this.handleSignOut}/>
                        )} />
                        <Route path='/findprograms/:major' render={(routerProps) => (
                            <ProgramDetail {...routerProps} user={this.state.user} signoutCallback={this.handleSignOut}/>
                        )} />
                        <Route path='/yourplan' render={(routerProps) => (
                            <Plan {...routerProps} allCourses={this.state.allCourses} user={this.state.user} signoutCallback={this.handleSignOut}/>
                        )} />
                        {/* {TODO: completed} */}
                        <Route path='/yourcompleted' render={(routerProps) => (
                            <Completed {...routerProps} allCourses={this.state.allCourses} user={this.state.user} signoutCallback={this.handleSignOut}/>
                        )} />
                        <Redirect to='/dashboard' />
                    </Switch>
                </div>
            );
        }

        return content;

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

// class RenderMain extends Component {

//     render() {
//         return (
//             <div id="main-element">

//                 <Header page={this.props.page} />
//                 <main>
//                     <Switch>
//                         <Route path='/dashboard' render={(routerProps) => (
//                             <DashboardPage {...routerProps} user={this.props.user} />
//                         )} />
//                         <Route path='/findcourses' render={(routerProps) => (
//                             <CoursePage {...routerProps} allCourses={this.props.allCourses} />
//                         )} />
//                         <Route path='/findprograms' component={ProgramPage} />
//                         <Route path='/yourplan' render={(routerProps) => (
//                             <Plan {...routerProps} allCourses={this.props.allCourses} user={this.props.user} />
//                         )} />
//                         <Redirect to='/dashboard' />
//                     </Switch>
//                 </main>
//                 {/* <Footer /> */}
//             </div>
//         );
//     }
// }

export default App;

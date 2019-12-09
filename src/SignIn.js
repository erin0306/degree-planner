import React, { Component } from 'react';
import './index.css';
import { faGripLines, faHome, faBookOpen, faGraduationCap, faUserAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'email': undefined,
            'password': undefined,
            'handle': undefined,
            'avatar': '' //default to blank value
        };
    }

    //update state for specific field
    handleChange = (event) => {
        let field = event.target.name; //which input
        let value = event.target.value; //what value

        let changes = {}; //object to hold changes
        changes[field] = value; //change this field
        this.setState(changes); //update state
    }

    //handle signUp button
    handleSignUp = (event) => {
        event.preventDefault(); //don't submit
        let avatar = this.state.avatar || 'img/no-user-pic.png'; //default to local pic
        this.props.signUpCallback(this.state.email, this.state.password, this.state.handle, avatar);
    }

    //handle signIn button
    handleSignIn = (event) => {
        event.preventDefault(); //don't submit
        this.props.signInCallback(this.state.email, this.state.password);
    }


    render() {
        return (
            <div className="subSection">
                <h2>Log In</h2>
                <form className="searchBox" role="search">
                    <div className="loginBox">
                        {/* <input id="email" type="email" name="email" onChange={this.handleChange} /> */}
                        <div>
                            <input id="email" type="text" name="email" placeholder="Username" onChange={this.handleChange} />

                            {/* <input id="password" type="text" title="searchBox" placeholder="Password"></input> */}

                            <input id="password" type="text" name="password" placeholder="Password" onChange={this.handleChange} />
                        </div>

                        <div>
                            <button className="btn btn-primary mr-2" onClick={this.handleSignUp}>Sign-up</button>
                            <button className="btn btn-primary" onClick={this.handleSignIn}>Log-in</button>
                        </div>
                        <div>
                            {this.props.errorMessage && <p className="alert alert-danger">{this.props.errorMessage}</p>}
                        </div>
                    </div>


                </form>
            </div>
        )
    }
}


import React, { Component } from 'react';
import './index.css';

export class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'email': undefined,
            'password': undefined,
            'name': '',
            'student-id': '' //default to blank value
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
        this.props.signUpCallback(this.state.email, this.state.password, this.state.name);
    }

    //handle signIn button
    handleSignIn = (event) => {
        event.preventDefault(); //don't submit
        this.props.signInCallback(this.state.email, this.state.password);
    }


    render() {
        return (
            <div className="subSection login">
                <h2>Log In</h2>
                <form className="searchBox" role="search">
                    <div className="loginBox">
                        {/* <input id="email" type="email" name="email" onChange={this.handleChange} /> */}
                        <div>
                            <input id="email" type="text" name="email" placeholder="Username" onChange={this.handleChange} />

                            {/* <input id="password" type="text" title="searchBox" placeholder="Password"></input> */}

                            <input id="password" type="password" name="password" placeholder="Password" onChange={this.handleChange} />
                        </div>

                        <div>
                            <button className="btn btn-primary" onClick={this.handleSignIn}>Log-in</button>
                        </div>
                    </div>
                </form>
                <h2>Sign Up</h2>
                <form className="searchBox" role="search">
                    <div className="loginBox">
                        {/* <input id="email" type="email" name="email" onChange={this.handleChange} /> */}
                        <div>
                            <input id="emailSignup" type="text" name="email" placeholder="Username" onChange={this.handleChange} />
                            {/* <input id="password" type="text" title="searchBox" placeholder="Password"></input> */}
                            <input id="passwordSignup" type="password" name="password" placeholder="Password" onChange={this.handleChange} />
                            <input id="name" type="text" name="name" placeholder="Full Name (e.g Joseph Joestar)" onChange={this.handleChange} />
                        </div>

                        <div>
                            <button className="btn btn-primary mr-2" onClick={this.handleSignUp}>Sign-up</button>
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


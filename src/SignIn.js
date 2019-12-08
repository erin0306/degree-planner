import React, {Component} from 'react';
import './index.css';
import { faGripLines, faHome, faBookOpen, faGraduationCap, faUserAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class SignIn extends Component {
    render() {
        return <div className="subSection">
            <h2>Log In</h2>
            <form className="searchBox" role="search">
                    <input id="username" type="text" title="searchBox"
                        placeholder="Username"></input>
                    <input id="password" type="text" title="searchBox" placeholder="Password"></input>
                    <button>Log In</button>
                    <button>Sign Up</button>
            </form>
        </div>
    }
}


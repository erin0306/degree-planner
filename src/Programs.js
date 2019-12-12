import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import firebase from 'firebase/app';
import {Redirect} from 'react-router-dom';

import { Header } from './Header.js'
import { Footer } from './Footer.js'

import MAJORS from './data/major.json'

export class ProgramPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currMajor : "",
        }
    }

    componentDidMount() {
        this.majorRef = firebase.database().ref(this.props.user.uid).child('major');
        this.majorRef.on('value', (snapshot) => {
            let obj = snapshot.val();
            this.setState({ currMajor: obj });
            
        })
        
    }
    componentWillUnmount() {
        this.majorRef.off();
    }

    render() { 
        let data = MAJORS.map((major) => {
            return <RenderData  user={this.props.user} major={major} currMajor={this.state.currMajor}/>
        })
        return (
            
            <div id="main-element">
                <Header page={"Programs"} signoutCallback={this.props.signoutCallback}/>
                <main>
                    {data}
                </main>
                <Footer />
            </div>
        )
            ;
    }
}

class RenderData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clicked : false
        }
    }

    addRemovePlan = () => {
        let majorRef = firebase.database().ref(this.props.user.uid).child('major');
        if (this.props.currMajor === this.props.major.major) {
            majorRef.set("Unknown");
        } else {
            majorRef.set(this.props.major.major);
        }
    }

    handleClick = (event) => {
        this.setState({clicked : true})
        event.preventDefault();
    }

    render() {
        if (this.state.clicked) {
            return <Redirect push to={"/findprograms/" + this.props.major.major}/>
        }
        return (
            <section id="course-results" className="schedule searchResult">
                <h2>{this.props.major.type}</h2>
                <div onClick={this.handleClick} className="clickable card">
                    <h3>{this.props.major.major}</h3>
                </div>
            </section>
        );
    }
}
import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import firebase from 'firebase/app';

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
        this.majorRef = firebase.database().ref('major');
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
            return <RenderData major={major} currMajor={this.state.currMajor}/>
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
        let majorRef = firebase.database().ref('major');
        if (this.props.currMajor === this.props.major.major) {
            majorRef.set("Unknown");
        } else {
            majorRef.set(this.props.major.major);
        }
    }

    handleClick = (event) => {
        let newClicked = !this.state.clicked
        this.setState({ clicked : newClicked });
        event.preventDefault();
    }

    render() {
        this.added = false;
        if (this.props.currMajor === this.props.major.major) {
            this.added = true;
        }
        let popPanel = "";
        if (this.state.clicked) {
            popPanel = <div className="card panel">
                        <span>Credits Required for Graduation: </span>{this.props.major.credits}<br></br>
                        <span>Required Courses</span>Will add later <br></br>
                        <span><button className={"clickable " + (this.state.added ? 'added' : '')} onClick={this.addRemovePlan}>{(this.added ? 'Remove from Plan' : 'Add to Plan')}</button> </span> <br></br>
                    </div>
        }
        return (
            <section id="course-results" className="schedule searchResult">
                <h2>{this.props.major.type}</h2>
                <div onClick={this.handleClick} className="clickable card">
                    <h3>{this.props.major.major}</h3>
                </div>
                {popPanel}
            </section>
        );
    }
}
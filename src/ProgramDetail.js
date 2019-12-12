import React, { Component } from 'react';
import firebase from 'firebase/app';
import _ from 'lodash';

import { Header } from './Header.js'
import { Footer } from './Footer.js'

import MAJORS from './data/major.json'

export class ProgramDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currMajor: "",
            clickedMajor: "",
        }
    }

    componentDidMount() {
        let majorName = this.props.match.params.major;
        let majorObj = _.find(MAJORS, { major: majorName }); //find major in data
        this.setState({ clickedMajor: majorObj });

        this.majorRef = firebase.database().ref(this.props.user.uid).child('major');
        this.majorRef.on('value', (snapshot) => {
            let obj = snapshot.val();
            this.setState({ currMajor: obj });
        })
    }
    componentWillUnmount() {
        this.majorRef.off();
    }

    addRemovePlan = () => {
        let major = this.state.clickedMajor;
        let majorRef = firebase.database().ref(this.props.user.uid).child('major');
        if (this.state.currMajor === major.major) {
            majorRef.set("Unknown");
        } else {
            majorRef.set(major.major);
        }
    }

    render() {
        let major = this.state.clickedMajor;
        this.added = false;
        if (this.state.currMajor === major.major) { // if selected major is user's current major
            this.added = true;
        }
        let requiredCourses = "None"
        if (major['required-courses'] !== undefined) {
            if(major['required-courses'].length > 0) {
                requiredCourses = "";
                for (let i = 0; i < major['required-courses'].length; i++) {
                    requiredCourses += major['required-courses'][i]['Department'] + " " + major['required-courses'][i]['Code'] + " ";
                }
            }
        }
        return (
            <div id="main-element">
                <Header page={"Programs"} signoutCallback={this.props.signoutCallback} />
                <main>
                    <section id="course-results" className="schedule searchResult">
                        <h2>More About {major.major} Major</h2>
                        <div className="card panel">
                            <h3>Description</h3>
                            <p>{major.description}</p>
                            <h3>Program Type: </h3>
                            <p>{major.type}</p>
                            <h3>Credits Required for Graduation: </h3>
                            <p>{major.credits}</p>
                            <h3>Required Courses: </h3>
                            <p>{requiredCourses}</p><br></br>
                            <p><a href={major.website}>Click here to access the department website</a></p>
                            <p><button className={"clickable " + (this.state.added ? 'added' : '')} onClick={this.addRemovePlan}>{(this.added ? 'Remove from Plan' : 'Add to Plan')}</button> </p> <br></br>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        );
    }
}
import React, { Component } from 'react';
import firebase from 'firebase/app';

import { Header } from './Header.js'
import { Footer } from './Footer.js'

export class Completed extends Component {
    constructor(props) {
        super(props);
        this.state = { completed: [] };
    }

    componentDidMount() {
        this.completedRef = firebase.database().ref('completedCourses');
        this.completedRef.on('value', (snapshot) => {
            let obj = snapshot.val();
            this.setState({ completed: obj }); 
        })
    }
    componentWillUnmount() {
        this.completedRef.off();
    }

    render() {
        // TODO: test no plans 
        if (!this.state.completed) return (
            <div id="main-element">
                <Header page={"Completed"} signoutCallback={this.props.signoutCallback} />
                <main>
                    <div className="card panel">
                        <p> No completed courses. Go to Courses to add more courses!</p>
                    </div>
                </main>
                <Footer />
            </div>

        );

        let completedKeys = Object.keys(this.state.completed);
        console.log(completedKeys);
        let completedArr = completedKeys.map((key) => {
            let completedObj = this.state.completed[key];
            completedObj.id = key;
            return completedObj;
        })
        console.log(completedArr);

        let data = completedArr.map((course) => {
            return <RenderData key={course.id} course={course} />
        });

        return (
            <div id="main-element">
                <Header page={"Completed"} signoutCallback={this.props.signoutCallback} />
                <main>
                    <section id="course-results" className="schedule searchResult">
                        <h2>Completed Courses</h2>
                        {data}
                    </section>
                </main>
                <Footer />
            </div>
        );
    }
}

class RenderData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            output: "",
        }
    }

    componentDidMount() {
        console.log('componentDidMount');
        this.setState({ loading: 'hidden' });

    }

    remove = () => {
        if (this.state.added) {
            this.setState({ added: false });
        } else {
            this.setState({ added: true });
        }
    }

    addRemove = (event) => {
        let course = this.props.course;

        let completedRef = firebase.database().ref('completedCourses').child(course.Department + course.Code);

        if (course) {
            console.log('planned');
            completedRef.set(null)
                .catch((error) => {
                    console.log(error.message);
                });
        }
    }

    render() {
        let course = this.props.course;
        return (
            <div className="card">
                <div className="card panel">
                    <h3>{course.Department} {course.Code} {course.Name}</h3>
                    <span>Campus: </span>{course.Campus}<br></br>
                    <span>Credits: </span>{course.Credits}<br></br>
                    <span>Areas of Knowledge: </span>{course.AofK}<br></br>
                    <span>Prerequisites: </span>{course.Prereqs}<br></br>
                    <span>Quarter(s) Offered: </span>{course.Quarters}<br></br>

                    <span><button className="clickable added" onClick={this.addRemove}>Remove from Completed</button> </span> <br></br>
                </div>
            </div>
        );
    }
}
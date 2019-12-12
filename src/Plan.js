import React, { Component } from 'react';
import firebase from 'firebase/app';

import { Header } from './Header.js'
import { Footer } from './Footer.js'

export class Plan extends Component {
    constructor(props) {
        super(props);
        this.state = { plans: [] };
    }

    componentDidMount() {
        this.plansRef = firebase.database().ref(this.props.user.uid).child('plannedCourses');
        this.plansRef.on('value', (snapshot) => {
            let obj = snapshot.val();
            this.setState({ plans: obj });
        })
    }
    componentWillUnmount() {
        this.plansRef.off();
    }

    render() {
        // TODO: test no plans 
        if (!this.state.plans) return (
            <div id="main-element">
                <Header page={"Your Plan"} signoutCallback={this.props.signoutCallback} />
                <main>
                    <div className="card panel">
                        <p> No planned courses. Go to Courses to add new plans!</p>
                    </div>
                </main>
                <Footer />
            </div>

        );

        let planKeys = Object.keys(this.state.plans);
        let planArr = planKeys.map((key) => {
            let planObj = this.state.plans[key];
            planObj.id = key;
            return planObj;
        })

        let data = planArr.map((course) => {
            return <RenderData  user={this.props.user} key={course.id} course={course} />
        });

        return (
            <div id="main-element">
                <Header page={"Your Plan"} signoutCallback={this.props.signoutCallback} />
                <main>
                    <section id="course-results" className="schedule searchResult">
                        <h2>Planned Courses</h2>
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

    removePlan = () => {
        if (this.state.added) {
            this.setState({ added: false });
        } else {
            this.setState({ added: true });
        }
    }

    // Using planned courses to test firebase add/remove because the button is always there
    addRemove = (event) => {
        let course = this.props.course;

        let planRef = firebase.database().ref(this.props.user.uid).child('plannedCourses').child(course.Department + course.Code);

        if (course) {
            planRef.set(null)
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

                    <span><button className="clickable added" onClick={this.addRemove}>Remove from Plan</button> </span> <br></br>
                </div>
            </div>
        );
    }
}
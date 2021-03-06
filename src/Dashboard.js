/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';

import { Header } from './Header.js';
import { Footer } from './Footer.js';
import MAJORS from './data/major.json';

export class DashboardPage extends Component {
    constructor(props) {
        super(props);
        this.state = { plans: [], completed: [], major: "Unknown" };
    }

    componentDidMount() {
        this.completedRef = firebase.database().ref(this.props.user.uid).child('completedCourses');
        this.completedRef.on('value', (snapshot) => {
            let obj = snapshot.val();
            this.setState({ completed: obj });
            
        });
        this.plansRef = firebase.database().ref(this.props.user.uid).child('plannedCourses');
        this.plansRef.on('value', (snapshot) => {
            let obj = snapshot.val();
            this.setState({ plans: obj });
        });

        this.majorRef = firebase.database().ref(this.props.user.uid).child('major');
        this.majorRef.on('value', (snapshot) => {
            let obj = snapshot.val();
            this.setState({ major: obj });
        })
    }
    componentWillUnmount() {
        this.plansRef.off();
        this.completedRef.off();
        this.majorRef.off();
    }

    calcCredits() {
        let allCreds = 0;
        let majorCreds = 0;
        if (this.state.completed) { // if completed courses isn't undefined
            let completedKeys = Object.keys(this.state.completed);
            let completedArr = completedKeys.map((key) => {
                let completedObj = this.state.completed[key];
                completedObj.id = key;
                return completedObj;
            })
            // count total credits
            for (let i = 0; i < completedArr.length; i++) {
                if (completedArr[i]['Credits'] !== "") {
                    allCreds += parseInt(completedArr[i]['Credits'], 10);
                }
            }

            // count total in-major credits
            let majorInfo = MAJORS.filter(allMajor => allMajor['major'] === this.state.major);
            let completedInMajor = [];
            for (let k = 0; k < completedArr.length; k++) {
                if (majorInfo[0] !== undefined) {
                    if (completedArr[k]['Department'] === majorInfo[0]['Abrev']) {
                        completedInMajor.push(completedArr[k]);
                    }
                }
            }
            for (let j = 0; j < completedInMajor.length; j++) {
                if (completedInMajor[j]['Credits'] !== "") {
                    majorCreds += parseInt(completedInMajor[j]['Credits'], 10);
                }
            }
        }

        return <div className="card">
            <h3>{allCreds} credits</h3>
            <p>{majorCreds} intended major credits</p>
        </div>
    }

    render() {
        let renderCredits = this.calcCredits();
        return (
            <div id="main-element">
                <Header page={"Dashboard"} signoutCallback={this.props.signoutCallback} />
                <main>
                    <div id="dashboard-page">
                        <div className="flex-container">
                            <section className="subSection">
                                <div className="profile">
                                    <h2>Student Profile</h2>
                                    <div className="card">
                                        <h3>{this.props.user.displayName}</h3>
                                        <p>Junior</p>
                                        <p>ID: 9999999</p>
                                    </div>
                                </div>
                                <div className="profile">
                                    <h2>Intended Major</h2>
                                    <div className="card">
                                        <h3>{this.state.major}</h3>
                                        <p>Custom Track</p>
                                    </div>
                                </div>
                                <div className="profile">
                                    <h2>Graduation Progress</h2>
                                    {renderCredits}
                                </div>
                            </section>

                            <RenderPlanned plans={this.state.plans} user={this.props.user} />
                            <RenderCompleted completed={this.state.completed} user={this.props.user} />
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
}

class RenderPlanned extends Component {
    render() {
        if (this.props.plans === null) {
            return <section className="subSection">
                <h2>Planned Courses</h2>
                <div className="card">
                    <p><Link to='/findcourses'>Click here to add courses</Link></p>
                </div>
            </section>
        }
        let planKeys = Object.keys(this.props.plans);
        let planArr = planKeys.map((key) => {
            let planObj = this.props.plans[key];
            planObj.id = key;
            return planObj;
        })

        let data = planArr.map((course) => {
            return <div key={course.Department + course.Code} className="card">
                <h3>{course['Department'] + ' ' + course['Code']}</h3>
                <p>{course['Credits'] + ' credits | ' + course['AofK']}</p>
            </div>
        });
        if (data.length > 5) {
            data = data.slice(0, 5);
        }
        return (
            <section className="subSection">
                <h2>Planned Courses</h2>
                {data}
                <div className="card">
                    <p><Link to='/yourplan'>View All Planned Courses</Link></p>
                </div>
            </section>
        )
    }
}
class RenderCompleted extends Component {
    render() {
        if (this.props.completed === null) {
            return <section className="subSection">
                <h2>Completed Courses</h2>
                <div className="card">
                    <p><Link to='/findcourses'>Click here to add courses</Link></p>
                </div>
            </section>
        }
        let completedKeys = Object.keys(this.props.completed);
        let completedArr = completedKeys.map((key) => {
            let completedObj = this.props.completed[key];
            completedObj.id = key;
            return completedObj;
        })

        let data = completedArr.map((course) => {
            return <div key={course.Department + course.Code} className="card">
                <h3>{course['Department'] + ' ' + course['Code']}</h3>
                <p>{course['Credits'] + ' credits | ' + course['AofK']}</p>
            </div>
        });
        if (data.length > 5) {
            data = data.slice(0, 5);
        }
        return (
            <section className="subSection">
                <h2>Completed Courses</h2>
                {data}
                <div className="card">
                    <p><Link to='/yourcompleted'>View All Completed Courses</Link></p>
                </div>
            </section>
        )
    }
}


import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Switch, NavLink } from 'react-router-dom';


export class DashboardPage extends Component {
    render() {
        return (
            <div id="dashboard-page">
                <div className="flex-container">
                    <section className="subSection">
                        <div className="profile">
                            <h2>Student Profile</h2>
                            <div className="card">
                                <h3>{this.props.user['displayName']}</h3>
                                <p>Junior</p>
                                <p>ID: 9999999</p>
                            </div>
                        </div>
                        <div className="profile">
                            <h2>Intended Major</h2>
                            <div className="card">
                                <h3>Informatics</h3>
                                <p>HCI Track</p>
                            </div>
                        </div>
                        <div className="profile">
                            <h2>Graduation Progress</h2>
                            <div className="card">
                                <h3>100 credits</h3>
                                <p>40 intended major credits</p>
                            </div>
                        </div>
                    </section>
                    <section className="subSection">
                        <h2>Completed Courses</h2>
                        <div className="card">
                            <h3>INFO 201</h3>
                            <p>AU18 | IS</p>
                        </div>
                        <div className="card">
                                <h3>INFO 200</h3>
                                <p>AU18 | IS</p>
                        </div>
                        <div className="card">
                                <h3>CSE 142</h3>
                                <p>AU17 | NW</p>
                        </div>
                        <div className="card">
                                <h3>CSE 143</h3>
                                <p>AU18 | NW</p>
                        </div>
                        <div className="card">
                            <h3>ECON 200</h3>
                            <p>AU17 | NW</p>
                        </div>
                        <div className="card">
                                <h3>ENGL 131</h3>
                                <p>AU17 | C</p>
                        </div>
                        <div className="card">
                            <p>Click to reveal more</p>
                        </div>
                    </section>
                    <section className="subSection">
                        <h2>Planned Courses</h2>
                        <div className="card">
                            <h3>MATH 126</h3>
                            <p>WIN19 | NW</p>
                        </div>
                        <div className="card">
                                <h3>PSYCH 210</h3>
                                <p>WIN19 | IS</p>
                        </div>
                        <div className="card">
                                <h3>INFO 340</h3>
                                <p>SPR19 | NW</p>
                        </div>
                        <div className="card">
                                <h3>CSE 373</h3>
                                <p>WIN19 | NW</p>
                        </div>
                        <div className="card">
                            <h3>INFO 360</h3>
                            <p>SPR19 | VLPA</p>
                        </div>
                        <div className="card">
                            <h3>INFO 350</h3>
                            <p>SPR19  | I&amp;S W</p>
                        </div>
                        <div className="card">
                            <p><Link to='/yourplan'>View All Planned Courses</Link></p>
                        </div>
                    </section>
                </div>
                <section className="schedule">
                    <h2>Recommended Courses</h2>
                    <div className="clickable card">
                        <h3>INFO 340 Client-Side Development</h3>
                        <p>You have prereqs for this class: CSE 142 or CSE 143; and INFO 201</p>
                    </div>
                    <div className="clickable card">
                        <h3>EDUC 251 Seeking Educational Equity and Diversity</h3>
                        <p>Because you need DIV credits</p>
                    </div>
                    <div className="clickable card">
                        <h3>MKTG 301 Marketing Concepts</h3>
                        <p>You have prereqs for this class: ECON 200 <br></br>>
                            It is an eligible elective for your program</p>
                    </div>
                    <div className="clickable card">
                        <h3>INFO 350 Information Ethics And Policy</h3>
                        <p>It is a graduation requirement <br></br> Because you need W credits</p>
                    </div>
                </section>
            </div>
        );
    }
}
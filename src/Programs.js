import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import _ from 'lodash'

import { Header } from './Header.js'
import { Footer } from './Footer.js'

import MAJORS from './data/major.json'

export class ProgramPage extends Component {
    render() { 
        let a = _.groupBy(MAJORS, 'type');
        let capConstrained = a['Capacity-Constrained'];
        let minimum = a['Minimum'];
        let open = a['Open']
        let capConstrainedOut = capConstrained.map((major) => {
            return <RenderData key={major.major} major={major} />
        });
        let minOut = minimum.map((major) => {
            return <RenderData key={major.major} major={major} />
        });
        let openOut = open.map((major) => {
            return <RenderData key={major.major} major={major} />
        });
        return (
            
            <div id="main-element">
                <Header page={"Programs"} signoutCallback={this.props.signoutCallback}/>
                <main>
                <section id="course-results" className="schedule searchResult">
                    <h2>Capacity-Constrained</h2>
                    {capConstrainedOut}
                    <br></br>
                    <h2>Minimum</h2>
                    {minOut}
                    <br></br>
                    <h2>Open</h2>
                    {openOut}
                </section>
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

    handleClick = (event) => {
        this.setState({clicked : true})
        event.preventDefault();
    }

    render() {
        if (this.state.clicked) {
            return <Redirect push to={"/findprograms/" + this.props.major.major}/>
        }
        return (
            <div onClick={this.handleClick} className="clickable card panel">
                <h3>{this.props.major.major}</h3>
            </div>
        );
    }
}
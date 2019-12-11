import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { Header } from './Header.js'
import { Footer } from './Footer.js'

import MAJORS from './data/major.json'

export class ProgramPage extends Component {
    render() {
        let data = MAJORS.map((major) => {
            return <RenderData major={major} />
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
            output: "",
            added: false,
        }
    }

    removePlan = () => {
        if (this.state.added) {
            this.setState({ added: false });
        } else {
            this.setState({ added: true });
        }
    }

    popPanel() {
        if (this.state.output !== "") {
            return "";
        }
        return <div className="card panel">
            <span>Credits Required for Graduation: </span>{this.props.major.credits}<br></br>
            <span>Required Courses</span>Will add later <br></br>
            <span><button className={"clickable " + (this.state.added ? 'added' : '')} onClick={this.removePlan}>{(this.state.added ? 'Remove from Plan' : 'Add to Plan')}</button> </span> <br></br>
        </div>
    }

    handleClick = (event) => {
        let panel = this.popPanel();
        this.setState({ output: panel });
        event.preventDefault();
    }

    render() {
        console.log(this.state.added);
        return (
            <section id="course-results" className="schedule searchResult">
                <h2>{this.props.major.type}</h2>
                <div onClick={this.handleClick} className="clickable card">
                    <h3>{this.props.major.major}</h3>
                    {this.state.output}
                </div>
            </section>
        );
    }
}
import React, {Component} from 'react';

export class ResultField extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
          displayCourses: [],
        //   loading: '',
        }
    }

    render() {
        // let data = this.props.displayCourses.map((course) => {
        //     return <RenderData course={course} key={course.Department + course.Code}/>
        // });
        console.log(this.props.loading);
        let data = this.props.displayCourses.map((course) => {
            return <RenderData course={course} loadingCallback={this.props.loadingCallback} key={course.Department + course.Code}/>
        });
        let spinner = null;
        if (this.props.loading === 'hidden') {
            spinner = (
                null
            );
        } else {
            spinner = (
                <p>Loading data...</p>   
            );
        }
        console.log(spinner);
        return (
            <section id="course-results" className="schedule searchResult">
                <h2>Recommended Courses</h2>
                
                {/* <p className={this.state.loading}>Loading data...</p> */}
                {spinner}
                {data}
                {/* {result} */}
            </section>
        );
    }
}

class RenderData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            output : "",
            added: false
        }
    }
    componentDidMount() {
        console.log('componentDidMount');
        // this.setState({loading: 'hidden'});
        this.props.loadingCallback();
    }

    handleClick = () => {
        let panel = this.popPanel();
        this.setState({output : panel});
    }

    addToPlan = () => {
        if(this.state.added) {
            this.setState({added: false});
        } else {
            this.setState({added: true});
        }
    }

    popPanel() {
        if (this.state.output !== "") {
            return "";
        }
        let offered = this.props.course.Offered;
        // if (this.props.course.Offered === "A,W,Sp,S" || this.props.Offered === undefined) {
        //     offered = "All";
        // }
        return <div className="card panel">
                <span>Campus: </span>{this.props.course["Campus"]}<br></br> 
                <span>Credits: </span>{this.props.course["Credits"]}<br></br>
                <span>Areas of Knowledge: </span>{this.props.course["Areas of Knowledge"]}<br></br>
                <span>Prerequisites: </span>{this.props.course["Prerequisites"]}<br></br>
                <span>Quarter(s) Offered: </span>{offered}<br></br>
                <span><button className={"clickable " + (this.state.added ? 'added':'')} onClick={this.addToPlan}>{(this.state.added ? 'Remove from Plan' : 'Add to Plan')}</button> </span> <br></br>                
            </div>
    }

    render() {
        console.log(this.state.added);

        // TODO: Need to somehow move panel outside of clickable card div so it wont shrink when adding
        return (
            <div className="clickable card" onClick={this.handleClick}>
                <h3>{this.props.course.Department} {this.props.course.Code} {this.props.course.Name}</h3>
                <p>Because you searched for {this.props.course.Department}</p>
                {this.state.output} 
            </div>
        );
    }
}
import React, { Component } from 'react';
import "../styles/styles.css";
import axios from "axios";

class Chairs extends Component {
    constructor() {
        super();
        this.state = {
            chairsA: [],
            chairsB: [],
            chairsC: [],
            chairsD: [],
            cnt:0,
        };
    }
    componentDidMount() {
        axios
            .get("/chairs.json")
            .then(
                (res) => {
                    var tempA = [];
                    var tempB = [];
                    var tempC = [];
                    var tempD = [];

                    for (let i = 0; i < res.data.length; i++) {

                        if (res.data[i].section === "A") {
                            tempA.push(res.data[i]);
                        }
                        else if (res.data[i].section === "B") {
                            tempB.push(res.data[i]);
                        }
                        else if (res.data[i].section === "C") {
                            tempC.push(res.data[i]);
                        }
                        else if (res.data[i].section === "D") {
                            tempD.push(res.data[i]);
                        }

                    }
                    this.setState({ chairsA: tempA, chairsB: tempB, chairsC: tempC, chairsD: tempD});
                }
            )
            .catch((err) => console.log(err));
    }
    
    changeHandler = (event) => {
        //console.log(event.target.parentElement.className);
    
        
        //console.log(document.getElementById("span1").innerHTML);
        //document.getElementById("span1").innerHTML=cnt;

        var element = event.target.parentElement;
        var classN = event.target.parentElement.className;

        if (classN === "unselected") {
            element.classList.remove(classN);
            element.classList.add("selected");
        }
        else if (classN === "selected") {
            element.classList.remove(classN);
            element.classList.add("prereserve");
        }
        else if (classN === "prereserve") {
            element.classList.remove(classN);
            element.classList.add("reserved");
        }

    }

    render() {
        var cnt=0;
        var sum=0;
        return (

            <div>
                <div className='stage'><span className='sp'>Stage</span></div><br/>

                <div className='test'><span className='span1' id="span1">Count:{cnt}</span><span className='span1'>Sum:{sum}</span></div><br/>

                <div className='box'>
                    <div className='boxB'>
                        <ul className='chairs-box'>
                            {
                                this.state.chairsB.map(chair => (
                                    <li key={chair.number} className={chair.state} onClick={evt => this.changeHandler(evt,cnt)} title={chair.price}>
                                        <p>{chair.number}</p><br />
                                    </li>
                                ))}
                        </ul>
                    </div>

                    <div className='boxA'>
                        <ul className='chairs-box'>
                            {
                                this.state.chairsA.map(chair => (
                                    <li key={chair.number} className={chair.state} onClick={this.changeHandler} title={chair.price}>
                                        <p>{chair.number}</p><br />
                                    </li>
                                ))}
                        </ul>
                    </div>

                    <div className='boxC'>
                        <ul className='chairs-box'>
                            {
                                this.state.chairsB.map(chair => (
                                    <li key={chair.number} className={chair.state} onClick={this.changeHandler} title={chair.price}>
                                        <p>{chair.number}</p><br />
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>

                <div className='boxD'>
                    <ul className='chairs-box'>
                        {
                            this.state.chairsD.map(chair => (
                                <li key={chair.number} id={chair.number} className={chair.state} onClick={this.changeHandler} title={chair.price}>
                                    <p>{chair.number}</p><br />
                                </li>
                            ))}
                    </ul>
                </div>


            </div>
        );
    }
}
export default Chairs;





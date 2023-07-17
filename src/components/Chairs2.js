import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/styles.css";

const Chairs2 = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const USER_API = '/chairs.json';
                const response = await axios.get(USER_API);
                //console.log(response.data);
                // console.log(response.data.number);
                setData(response.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    const changeHandler = (event) => {
        //console.log(event.target.parentElement.className);

        var count = parseInt(document.getElementById("cnt").innerHTML);
        var add = parseInt(document.getElementById("sum").innerHTML);

        var element = event.target;
        var classN = (event.target.className).substring(8);

        if (classN === "unselected") {


            element.classList.remove(classN);
            element.classList.add("selected");

            setTimeout(() => {
                var classN2 = (event.target.className).substring(8);
                if (classN2 !== "reserved") {
                    element.classList.remove(classN2);
                    element.classList.add("unselected");
                }
                console.log(classN2)
            }
                , 5000);

        }
        else if (classN === "selected") {
            element.classList.remove(classN);
            element.classList.add("prereserve");

        }
        else if (classN === "prereserve") {
            element.classList.remove(classN);
            element.classList.add("reserved");

            count = count + 1;
            add += parseInt(element.title);
            document.getElementById("cnt").innerHTML = count;
            document.getElementById("sum").innerHTML = add;

        }

    }

    // setTimeout(() => console.log('Initial timeout!'), 5000);

    var cnt = 0;
    var sum = 0;
    return (
        <div>
            <div className='stage'><span className='sp'>Stage</span></div><br />

            <div className='divspan'>
                <span className='span1' id="span1">Count: <span id="cnt" className='span2'>{cnt}</span></span>
                <span className='span1'>Sum: <span id="sum" className='span2'>{sum}</span></span>
            </div><br />


            <div className='box'>
                <div className='boxB'>
                    <ul className='chairs-box'>
                        {data.map(chair => {
                            if (chair.section === "B") {
                                return <li key={chair.number} className={`liclass ${chair.state}`} title={chair.price} onClick={changeHandler}>
                                    {chair.number}
                                </li>;
                            }
                            return "";
                        })}
                    </ul>
                </div>

                <div className='boxA'>
                    <ul className='chairs-box'>
                        {data.map(chair => {

                            if (chair.section === "A") {
                                return <li key={chair.number} className={`liclass ${chair.state}`} title={chair.price} onClick={changeHandler}>
                                    {chair.number}</li>;
                            }
                            return "";
                        })}
                    </ul>
                </div>

                <div className='boxC'>
                    <ul className='chairs-box'>
                        {data.map(chair => {

                            if (chair.section === "C") {
                                return <li key={chair.number} className={`liclass ${chair.state}`} title={chair.price} onClick={changeHandler}>
                                    {chair.number}</li>;
                            }
                            return "";
                        })}
                    </ul>
                </div>
            </div>
            <div className='box'>
                <div className='boxD'>
                    <ul className='chairs-box'>
                        {data.map((chair) => {
                            if (chair.section === "D") {
                                return <li key={chair.number} className={`liclass ${chair.state}`} title={chair.price} onClick={changeHandler}>
                                    {chair.number}</li>;
                            }
                            return "";
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Chairs2;
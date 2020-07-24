import React, { Component } from 'react'
import Guage from '../Components/Charts/Guage'
import { NumberOfDaysLived } from '../Logic/NumberOfDaysLived'
import '../CSS/Transitions.css'
import '../CSS/Components/Home/Home.css'
import PhysicalChart from '../Components/Charts/PhysicalChart'
import AttributeTabs from '../Components/Home/AttributeTabs'

export class Home extends Component {

    state = {
        user_name: "",
        temp: null,
        number_of_days_lived: -1,
        name_screen_transition: '',
        dob_screen_transition: '',
        result_screen_transition: '',
        activity_screen_transition:''
    }

    setName = (e) => {
        this.setState({ user_name: e })
        this.setState({ name_screen_transition: "exit", dob_screen_transition: "enter" })
    }

    calculate_number_of_days_lived = (dob) => {
        var temp = NumberOfDaysLived(dob);
        this.setState({ number_of_days_lived: temp })
        this.setState({ dob_screen_transition: "exit", result_screen_transition: "enter" })
    }

    show_activity_screen = () => {
        this.setState({ result_screen_transition: "exit", activity_screen_transition: "enter" })
    }

    render() {
        return (
            <div className="wrap" style={{ height: "70vh", flexDirection: "column" }} >

                <div className={this.state.name_screen_transition} >

                    <div className="wrap">
                        <h1>Home</h1>
                    </div>

                    <div className="wrap">
                        <input type="text" placeholder="Enter Name" value={this.state.temp} onChange={(e) => { this.setState({ temp: e.target.value }) }} onSubmit={() => { this.setState({ user_name: this.state.temp }) }} ></input>
                        <button onClick={() => { this.setName(this.state.temp) }} >Submit</button>
                    </div>

                </div>


                {
                    this.state.user_name === "" ? (
                        <div></div>
                    ) : (
                            <div style={{ height: "70vh", flexDirection: "column" }} >

                                <div className="home-name" >
                                    Hey, <b>{this.state.user_name}!</b>
                                </div>

                                {this.state.user_name === "" ? (
                                    <div></div>
                                ) : (
                                        <div className={"wrap " + this.state.dob_screen_transition} style={{ height: "70vh" }} >
                                            <div>
                                                <div className="dob-content" >
                                                    For Mirrage to provide you with further details <br /> please enter your date of birth.
                                                </div>
                                                <div className="wrap" >
                                                    <input type="date" onChange={(e) => { this.calculate_number_of_days_lived(e.target.value) }} ></input>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                {this.state.number_of_days_lived === -1 ? (
                                    <div></div>
                                ) : (
                                        <div className={" " + this.state.result_screen_transition}>
                                            <div>
                                                <PhysicalChart number_of_days_lived={this.state.number_of_days_lived} />
                                            </div>
                                            <div className="guage-playbutton-container" >
                                                <Guage number_of_days_lived={this.state.number_of_days_lived} />
                                                <div className="wrap" style={{ width: "auto" }} >
                                                    <button onClick={this.show_activity_screen} >Next Page</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                {this.state.activity_screen_transition === "" ? (
                                    <div></div>
                                ) : (
                                        <div className={"wrap " + this.state.activity_screen_transition}>
                                            <div className="tabs-container" >
                                                <div>
                                                    Here are most suitable tunes for today.
                                                </div>
                                                <div>
                                                    <AttributeTabs number_of_days_lived={this.state.number_of_days_lived} />
                                                </div>
                                            </div>
                                            <div className="tabs-container" >
                                                <div>
                                                    Here are most suitable tunes for today.
                                                </div>
                                            </div>
                                        </div>
                                    )}
                            </div>
                        )
                }
            </div>
        )
    }
}

export default Home

import React, { Component } from 'react'
import PhysicalChart from '../Components/Charts/PhysicalChart'
import Guage from '../Components/Charts/Guage'
import { NumberOfDaysLived } from '../Logic/NumberOfDaysLived'
import '../CSS/Transitions.css'

export class Home extends Component {

    state = {
        user_name: "",
        temp: null,
        number_of_days_lived: 0,
        name_screen_transition: '',
        dob_screen_transition: '',
        result_screen_transition: '',
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
                            <div className="wrap" style={{ height: "80vh", flexDirection: "column" }} >

                                <div style={{ position: "absolute", top: "10%" }} >
                                    <h2>Hey {this.state.user_name}. Please enter DOB </h2><br />
                                </div>

                                {this.state.user_name === "" || this.state.user_name.length < 2 ? (
                                    <div></div>
                                ) : (
                                        <div className={"wrap " + this.state.dob_screen_transition}>
                                            <div>
                                                <div className="wrap" >
                                                    <input type="date" onChange={(e) => { this.calculate_number_of_days_lived(e.target.value) }} ></input>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                {this.state.number_of_days_lived === 0 ? (
                                    <div></div>
                                ) : (
                                        <div className={"wrap " + this.state.result_screen_transition} style={{ flexDirection: "column" }}>
                                            <div className="wrap" >
                                                <h5>Physical <Guage constant={23} dob={this.state.number_of_days_lived} /></h5>
                                                <h5>Emotional <Guage constant={33} dob={this.state.number_of_days_lived} /></h5>
                                                <h5>Intellectual <Guage constant={25} dob={this.state.number_of_days_lived} /></h5>
                                            </div>

                                            <div className="wrap" >
                                                <div>
                                                    <h4>Graph : Physical </h4>
                                                    <PhysicalChart number_of_days_lived={this.state.number_of_days_lived} />
                                                </div>
                                            </div>

                                            <div className="wrap" >
                                                <button onClick={() => { window.location.reload() }} >START AGAIN</button>
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

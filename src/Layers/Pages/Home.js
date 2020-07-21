import React, { Component } from 'react'
import PhysicalChart from '../Components/Charts/PhysicalChart'
import Guage from '../Components/Charts/Guage'
import { NumberOfDaysLived } from '../Logic/NumberOfDaysLived'

export class Home extends Component {

    state = {
        user_name: "",
        temp: null,
        number_of_days_lived: 0
    }

    setName = (e) => {
        this.setState({ user_name: e.target.value })
    }

    calculate_number_of_days_lived = (dob) => {
        var temp = NumberOfDaysLived(dob);
        this.setState({ number_of_days_lived: temp })
    }

    render() {
        return (
            <div className="wrap" style={{ height: "70vh", flexDirection: "column" }} >

                <div>

                    <div className="wrap">
                        <h1>Home</h1>
                    </div>

                    <div className="wrap">
                        <input type="text" placeholder="Enter Name" value={this.state.temp} onChange={(e) => { this.setState({ temp: e.target.value }) }} onSubmit={() => { this.setState({ user_name: this.state.temp }) }} ></input>
                        <button onClick={() => { this.setName(this.state.temp) }} >Submit</button>
                    </div>
                    
                </div>

                {this.state.user_name === "" || this.state.user_name.length < 2 ? (
                    <div></div>
                ) : (
                        <div className="wrap" >
                            <div>
                                <h2>Hey {this.state.user_name}. Please enter DOB </h2><br />
                                <div className="wrap" >
                                    <input type="date" onChange={(e) => { this.calculate_number_of_days_lived(e.target.value) }} ></input>
                                </div>
                            </div>
                        </div>
                    )}

                {this.state.number_of_days_lived === 0 ? (
                    <div></div>
                ) : (
                        <div>
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
}

export default Home

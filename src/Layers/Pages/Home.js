import React, { Component } from 'react'
import PhysicalChart from '../Components/Charts/PhysicalChart'

export class Home extends Component {

    state = {
        user_name: null,
        dob: null,
        temp: null
    }

    setName = (e) => {
        this.setState({ user_name: e.target.value })
    }

    render() {
        return (
            <div>
                <div className="wrap" >
                    <h1>Home</h1>
                </div>
                <div className="wrap">
                    <input type="text" placeholder="Enter Name" value={this.state.temp} onChange={(e) => { this.setState({ temp: e.target.value }) }} onSubmit={() => { this.setState({ user_name: this.state.temp }) }} ></input>
                    <button onClick={() => { this.setState({ user_name: this.state.temp }) }} >Submit</button>
                </div>

                {this.state.user_name === null || this.state.user_name.length < 2 ? (
                    <div></div>
                ) : (
                        <div className="wrap" >
                            <div>
                                <h2>Hey {this.state.user_name}. Please enter DOB </h2><br/>
                                <div className="wrap" >
                                    <input type="date" onChange={(e) => { this.setState({dob:e.target.value}) } } ></input>
                                </div>
                            </div>
                        </div>
                    )}

                {this.state.dob === null || this.state.user_name.length < 2 ? (
                    <div></div>
                ) : (
                        <div className="wrap" >
                            <div>
                                <h4>Graph : Physical </h4>
                                <PhysicalChart dob={this.state.dob} />
                            </div>
                        </div>
                    )}

                {this.state.dob === null || this.state.user_name.length < 2 ? (
                    <div></div>
                ) : (

                        <div className="wrap" >
                            <button onClick={()=>{window.location.reload()}} >START AGAIN</button>
                        </div>
                    )}

            </div>
        )
    }
}

export default Home

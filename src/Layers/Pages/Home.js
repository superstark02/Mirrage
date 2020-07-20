import React, { Component } from 'react'

export class Home extends Component {

    state = {
        dob_visible:"invisible",
        user_name:null
    }

    render() {
        return (
            <div>
                <div className="wrap" >
                    <h1>Home</h1>
                </div>
                <div className="wrap">
                    <input placeholder="Enter Name"  ></input>
                    <button>Enter</button>    
                </div>
                <div className="wrap" >
                    <input placeholder="Enter Your DOB" ></input>
                    <button>Enter</button>
                </div>
            </div>
        )
    }
}

export default Home

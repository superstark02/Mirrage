import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../../CSS/Components/AppBar/AppBar.css'

export class AppBar extends Component {
    render() {
        return (
            <div className="wrap" >
                <div className="app-bar-container" >
                    <div>
                        LOGO
                    </div>
                    <div style={{display:"flex"}} >
                        <div style={{margin:"0px 20px"}} className="dropdown" >
                            <span>Menu</span>
                            <div className="dropdown-content" >
                                <div>
                                    Option 1
                                </div>

                                <div>
                                    Option 2
                                </div>

                                <div>
                                    Option 3
                                </div>

                                <div>
                                    Option 4
                                </div>
                            </div>
                        </div>
                        <div>
                            <Link to="/sign-in" >
                                Login/Signup
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AppBar

import React, { Component } from 'react'
import { BiorythmicCalculations } from '../../Logic/BiorythmCalculations'

export class Guage extends Component {
    render() {
        return (
            <div>
                {BiorythmicCalculations(this.props.constant,this.props.dob)}
            </div>
        )
    }
}

export default Guage

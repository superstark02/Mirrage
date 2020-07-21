import React, { Component } from 'react'
import { db } from '../../../firebase'
import { BiorythmicCalculations } from '../../Logic/BiorythmCalculations'
import { Percentage } from '../../Logic/Percentage'
import { Maximum } from '../../Logic/CalculateMaxima'
import '../../CSS/Components/Charts/Guage.css'

export class Guage extends Component {

    state = {
        show: true,
        data: null,
        max:null,
    }

    componentDidMount() {
        var functions = []
        var biorythm_results = []
        var percentage_results


        //getting functions from db.
        db.collection("Functions").doc("Primary").collection("Functions").get().then(snapshot => {
            snapshot.forEach(doc => {
                functions.push(doc.data())
            })

            for (var i = 0; i < functions.length; i++) {
                biorythm_results.push({ name: functions[i].name, value: BiorythmicCalculations(functions[i].const, this.props.number_of_days_lived) })
            }

            percentage_results = Percentage(biorythm_results)

            this.setState({data:percentage_results})

            var sortedArray = Maximum(percentage_results)
            console.log(sortedArray)
            this.setState({max:sortedArray})
        })

        //getting sounds from db.
    }

    render() {
        if (this.state.data!==null) {
            return (
                <div>
                    {
                        this.state.data &&
                        this.state.data.map(item => {
                            if(item.name === "Physical" || item.name === "Emotional" || item.name === "Intellectual"){
                                return (
                                    <div className="guage-container-primary" >
                                        {item.name}: {item.value}%
                                    </div>
                                )
                            }
                            else{
                                return (
                                    <div className="guage-container-secondary" >
                                        {item.name}: {item.value}%
                                    </div>
                                )
                            }
                        })
                    }
                    <div>
                        {
                            this.state.max !== null ? (
                                <div>
                                    Max: {this.state.max[0].name} : {this.state.max[0].value} %
                                </div>
                            ) : (
                                <div></div>
                            )
                        }
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    Please Wait...
                </div>
            )
        }
    }
}

export default Guage

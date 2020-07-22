import React, { Component } from 'react'
import { db } from '../../../firebase'
import { BiorythmicCalculations } from '../../Logic/BiorythmCalculations'
import { Percentage } from '../../Logic/Percentage'
import { Maximum } from '../../Logic/CalculateMaxima'
import '../../CSS/Components/Charts/Guage.css'
import Sound from 'react-sound';

export class Guage extends Component {

    state = {
        show: true,
        data: null,
        max: null,
        sounds: null,
        sound_state: Sound.status.PAUSED,
        button_label:"PLAY"
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

            this.setState({ data: percentage_results })

            var sortedArray = Maximum(percentage_results)

            this.setState({ max: sortedArray })

            //getting sounds from db.
            db.collection("Functions").doc("SoundVolumes").collection(sortedArray[0].name).get().then(snapshot => {
                var sounds = []
                snapshot.forEach(doc => {
                    sounds.push(doc.data())
                })

                this.setState({ sounds: sounds })
            })
        })


    }

    playPause = () => {
        if (this.state.sound_state === Sound.status.PLAYING) {
            this.setState({ sound_state: Sound.status.PAUSED })
            this.setState({button_label:"PLAY"})
        }
        else {
            this.setState({ sound_state: Sound.status.PLAYING })
            this.setState({button_label:"PAUSE"})
        }
    }

    changeVolume = (vol,id) => {
        var temp_array = this.state.sounds

        for(var i = 0; i < temp_array.length ; i++){
            if(temp_array[i].url === id){
                temp_array[i].volume = vol
            }
        }
        this.setState({sounds:temp_array})
    }

    render() {
        if (this.state.data !== null) {
            return (
                <div>
                    {
                        this.state.data &&
                        this.state.data.map(item => {
                            if (item.name === "Physical" || item.name === "Emotional" || item.name === "Intellectual") {
                                return (
                                    <div className="guage-container-primary" >
                                        {item.name}: {item.value}%
                                    </div>
                                )
                            }
                            else {
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

                    {
                        this.state.sounds &&
                        this.state.sounds.map(sound => {
                            return (
                                <div>
                                    <Sound
                                        url={sound.url}
                                        playStatus={this.state.sound_state}
                                        playFromPosition={0}
                                        volume={sound.volume}
                                    />
                                    <div>
                                        volume: <input type="number" value={sound.volume} onChange={(e)=>{this.changeVolume(e.target.value, sound.url)}} />
                                    </div>
                                </div>
                            )
                        })
                    }

                    <div className="wrap" >
                        <button onClick={this.playPause} >
                            {this.state.button_label}
                        </button>
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

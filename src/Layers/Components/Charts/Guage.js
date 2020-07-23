import React, { Component } from 'react'
import { db } from '../../../firebase'
import { BiorythmicCalculations } from '../../Logic/BiorythmCalculations'
import { Percentage } from '../../Logic/Percentage'
import { Maximum } from '../../Logic/CalculateMaxima'
import '../../CSS/Components/Charts/Guage.css'
import Sound from 'react-sound';
import useResizeObserver from './useResizeObserver'
import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

export class Guage extends Component {

    state = {
        show: true,
        data: null,
        max: null,
        sounds: null,
        sound_state: Sound.status.PAUSED,
        button_label: "PLAY"
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
            this.setState({ button_label: "PLAY" })
        }
        else {
            this.setState({ sound_state: Sound.status.PLAYING })
            this.setState({ button_label: "PAUSE" })
        }
    }

    changeVolume = (vol, id) => {
        var temp_array = this.state.sounds

        for (var i = 0; i < temp_array.length; i++) {
            if (temp_array[i].url === id) {
                temp_array[i].volume = vol
            }
        }
        this.setState({ sounds: temp_array })
    }

    render() {
        if (this.state.data !== null) {
            return (
                <div>
                    <div>
                        {
                            this.state.max !== null ? (
                                <div>
                                    <div style={{ display: "flex", textAlign: "center" }} >
                                        <div>
                                            <div>
                                                Max: {this.state.max[0].name} : {this.state.max[0].value} %
                                        </div>
                                            <div style={{ height: "200px" }} >
                                                <Radar data={[this.state.max[0].value / 100, 1 - this.state.max[0].value / 100]} />
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                Max: {this.state.max[1].name} : {this.state.max[1].value} %
                                        </div>
                                            <div style={{ height: "200px" }} >
                                                <Radar data={[this.state.max[1].value / 100, 1 - this.state.max[1].value / 100]} />
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                Max: {this.state.max[2].name} : {this.state.max[2].value} %
                                        </div>
                                            <div style={{ height: "200px" }} >
                                                <Radar data={[this.state.max[2].value / 100, 1 - this.state.max[2].value / 100]} />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{marginTop:"60px",fontSize:"17px"}} >
                                        It looks like you would be best suited to work on <br/>
                                        these aspects today.
                                    </div>
                                    <div style={{fontSize:"12px"}} >
                                        View detailed analysis.
                                    </div>
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


function Radar({ data }) {
    const svgRef = useRef()
    const wrapperRef = useRef()
    const dimensions = useResizeObserver(wrapperRef)

    useEffect(() => {
        const svg = d3.select(svgRef.current)
        if (!dimensions) return;

        const arcGenerator = d3.arc()
            .innerRadius(85)
            .outerRadius(100)

        const pieGenerator = d3.pie()
        const instructions = pieGenerator(data)

        svg.selectAll(".slice")
            .data(instructions)
            .join("path")
            .attr("class", "slice")
            .attr("stroke", "none")
            .attr("fill", (instructions, index) => index === 0 ? "#DE5B49" : "#324D5C")
            .style(
                "transform",
                "translate(" + dimensions.width / 2 + "px, " + dimensions.height + "px)"
            )
            .transition()
            .attr("d", instruction => arcGenerator(instruction))

    }, [data, dimensions])

    return (
        <div ref={wrapperRef}>
            <svg ref={svgRef} className="pie-chart" ></svg>
        </div>
    )
}

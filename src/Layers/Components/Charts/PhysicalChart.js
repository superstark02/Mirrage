import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { NumberOfDaysLived } from '../../Logic/NumberOfDaysLived';

export default function PhysicalChart(props) {
    const [data] = useState([])
    const svgRef = useRef();

    useEffect(() => {
        generateData();

        const svg = d3.select(svgRef.current)

        const xScale = d3.scaleLinear()
            .domain([0, data.length - 1])
            .range([0, 1500])

        const yScale = d3.scaleLinear()
            .domain([-1, 1])
            .range([150, 0])

        const xAxis = d3.axisBottom(xScale);
        svg.select(".x-axis")
            .style("transform", "translateY(150px)")
            .call(xAxis)

        const yAxis = d3.axisLeft(yScale);
        svg.select(".y-axis")
            .call(yAxis)

        const myLine = d3.line()
            .x((value, index) => xScale(index))
            .y(yScale)
            .curve(d3.curveCardinal)

        svg
            .selectAll(".line")
            .data([data])
            .join("path")
            .attr("d", myLine)
            .attr("stroke", "blue")
            .attr("fill", "none")
            .attr("border-radius", 10);

    }, [data])

    function generateData() {
        var t = props.number_of_days_lived
        for (var days = 0; days < 31; days++) {
            var P = Math.sin(2 * Math.PI * (t + days) / 23)
            data.push(P)
        }
    }

    return (
        <React.Fragment>
            <div className="wrap" >
                <svg ref={svgRef} style={{ backgroundColor: 'lightgrey' }} >
                </svg>
            </div>
        </React.Fragment>
    )

}

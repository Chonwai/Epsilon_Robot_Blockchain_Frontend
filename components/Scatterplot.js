import { react, useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';

var margin = { top: 0, right: 0, bottom: 0, left: 0 },
    width = 800 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

function Scatterplot(props) {
    const [tagNetwork, setTagNetwork] = useState([]);
    const ref = useRef();
    var svgElement = d3.select(ref.current);

    var x = d3.scaleLinear().domain([-100, 100]).range([0, width]);
    var y = d3.scaleLinear().domain([-100, 100]).range([height, 0]);
    var xScale = d3.scaleLinear().domain([-100, 100]).range([0, width]);
    var yScale = d3.scaleLinear().domain([-100, 100]).range([height, 0]);

    var line = d3
        .line()
        .x(function (d) {
            return xScale(d[0]);
        })
        .y(function (d) {
            return yScale(d[1]);
        });

    useEffect(() => {
        svgElement = d3
            .select(ref.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom);

        svgElement
            .append('g')
            .attr('transform', 'translate(0,' + height + ')')
            .call(d3.axisBottom(x));

        svgElement
            .append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('height', height)
            .attr('width', width)
            .attr('stroke-width', '5')
            .style('fill', 'none')
            .style('stroke', 'white');

        // Add Y axis
        svgElement.append('g').call(d3.axisLeft(y));
    }, []);
    useEffect(() => {
        if (props.hasOwnProperty('chain')) {
            svgElement
                .append('g')
                .selectAll('dot')
                .data(
                    props.chain[1].detected_path.map(obj => {
                        return obj.detected_point;
                    })
                )
                .enter()
                .append('circle')
                .attr('cx', function (d) {
                    return x(d[0]);
                })
                .attr('cy', function (d) {
                    return y(d[1]);
                })
                .attr('r', 1.5)
                .style('opacity', 0.8)
                .style('fill', '#00FF00');

            svgElement
                .append('path')
                .attr(
                    'd',
                    line(
                        props.chain[1].detected_path.map(obj => {
                            return obj.detected_point;
                        })
                    )
                )
                .attr('stroke', 'darkgrey')
                .attr('stroke-width', '1')
                .attr('fill', 'none')
                .attr('stroke-dasharray', 40000)
                .attr('stroke-dashoffset', 40000)
                .transition()
                .duration(40000)
                .ease(d3.easeLinear)
                .attr('stroke-dashoffset', 0);

            // for (let i = 0; i < props.chain.length; i++) {

            // }
        }
    }, [props]);
    return (
        <svg
            ref={ref}
            style={{
                height: height + margin.top + margin.bottom,
                width: width + margin.left + margin.right,
                backgroundImage:
                    "url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6e527eb9-99dc-4554-9ea2-dd0e84e79860/dckiu8c-727ad23f-7760-42f2-9669-aa2de0f3c832.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzZlNTI3ZWI5LTk5ZGMtNDU1NC05ZWEyLWRkMGU4NGU3OTg2MFwvZGNraXU4Yy03MjdhZDIzZi03NzYwLTQyZjItOTY2OS1hYTJkZTBmM2M4MzIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.SeaJeKBwBRMIF5PfyQWTZJ8x5_p6_oDCTy0GE3ldXUU')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        ></svg>
    );
}

export default Scatterplot;

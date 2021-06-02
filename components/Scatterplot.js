import { react, useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';

var margin = { top: 0, right: 0, bottom: 0, left: 0 },
    width = 700 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

function Scatterplot(props) {
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
        svgElement.selectAll('g').remove();
        svgElement.selectAll('path').remove();
        if (props.hasOwnProperty('chain')) {
            svgElement
                .append('g')
                .selectAll('dot')
                .data(
                    props.chain[0].detected_path.map(obj => {
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
                .attr('r', 2)
                .style('opacity', 0.8)
                .style('fill', '#00FF00');

            svgElement
                .append('path')
                .attr(
                    'd',
                    line(
                        props.chain[0].detected_path.map(obj => {
                            return obj.detected_point;
                        })
                    )
                )
                .attr('stroke', '#00FF00')
                .attr('stroke-width', '1')
                .attr('fill', 'none')
                .attr('stroke-dasharray', 20000)
                .attr('stroke-dashoffset', 20000)
                .transition()
                .duration(30000)
                .ease(d3.easeLinear)
                .attr('stroke-dashoffset', 0);
        }
    }, [props]);
    return (
        <svg
            ref={ref}
            style={{
                height: height + margin.top + margin.bottom,
                width: width + margin.left + margin.right,
                backgroundImage: "url('/image/mars.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        ></svg>
    );
}

export default Scatterplot;

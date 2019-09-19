import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Axis from 'd3-axis';
import * as d3Array from 'd3-array';

import { SAMPLE_DATA } from 'src/app/stackBarData';

export interface Margin {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

@Component({
    selector: 'app-stack-bar-chart',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './stack-bar-chart.component.html',
    styleUrls: ['./stack-bar-chart.component.css']
})
export class StackBarChartComponent implements OnInit {

    title = 'Stacked Bar Chart';

    private margin: Margin;

    private width: number;
    private height: number;

    private svg: any;     // TODO replace all `any` by the right type

    private x: any;
    private y: any;
    private z: any;
    private g: any;

    constructor() {}

    ngOnInit() {
        this.setMargin();
        this.setSvg();
        this.createChart(SAMPLE_DATA);
    }

    private setMargin() {
        // we set margin because where exactly the graph should be placed we gets to know.
        this.margin = {top: 20, right: 20, bottom: 30, left: 40};
    }

    private setSvg() {
        // d3.select - it selects only one html element.
        this.svg = d3.select('svg');
        //this.svg.attr('width')  - taking WIDTH attribute of svg element. same for height.
        this.width = +this.svg.attr('width') - this.margin.left - this.margin.right;
        this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
        // .append('g') - we are appending d tag to svg element so that it will create a svg group. where we can add multiple attributes.
        this.g = this.svg.append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
        // d3scale is used to perform data transformations
        // scale Band - Constructs a new band scale with the empty domain, (nly numerics)
        // the unit range [0, 1], no padding, no rounding and center alignment.
        // rangeRound - to set the range in x - axis
        this.x = d3Scale.scaleBand()
            .rangeRound([0, this.width])
            .paddingInner(0.05)
            .align(0.1);
        // scale linear - constructs linear scale and if output range is continus and numeric we use this
        this.y = d3Scale.scaleLinear()
            .rangeRound([this.height, 0]);
        // if the input data contains only alphabets we use scaleOrdinal and we are setting colors for each state.
            this.z = d3Scale.scaleOrdinal()
            .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);
    }

    private createChart(data: any[]) {
        // Object.getOwnPropertyNames(data[0]).slice(1) - returns an array of all properties found in data.
        let keys = Object.getOwnPropertyNames(data[0]).slice(1);
        // keys we get is "****"0":"Under 5 Years..........."****""
        // used to create a new map and object is used to copy all properties
        // a and b are accumlators initial values are set to 0 for 1st element in an array
        data = data.map(v => {
            v.total = keys.map(key => v[key]).reduce((a, b) => a + b, 0);
            return v;
        });
        // now in data we get only keys***** Under 5 Years...........
        // it sorts the elements.
        data.sort((a: any, b: any) => b.total - a.total);
        // domain denotes to set min and max values of data.
        // here below we are setting scale range based on data.
        // d3Array.MaX which returns max value of array data and y-axis min value is 0 and max value can be taken from array.
        this.x.domain(data.map((d: any) => d.State));
        // nice function is used to get d.total values in round figure.
        this.y.domain([0, d3Array.max(data, (d: any) => d.total)]).nice();
        this.z.domain(keys);
        // to svg group adding all the attributes.
        //d3Shape.stack() - this method is responsible to get layers 
        this.g.append('g')
            .selectAll('g')
            .data(d3Shape.stack().keys(keys)(data))
            .enter().append('g')
            .attr('fill', d => this.z(d.key))
            .selectAll('rect')
            .data(d => d)
            .enter().append('rect')
            .attr('x', d => this.x(d.data.State))
            .attr('y', d => this.y(d[1]))
            .attr('height', d => this.y(d[0]) - this.y(d[1]))
            .attr('width', this.x.bandwidth());
        // d3Axis - to draw lines 
        // axisBottom - to draw horizantal line
        this.g.append('g')
            .attr('class', 'axis')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(d3Axis.axisBottom(this.x));
        // axisleft to create left vertical axis
        // ticks function to show ticks on axis
        // this group is for to get names on x and y axis
        this.g.append('g')
            .attr('class', 'axis')
            .call(d3Axis.axisLeft(this.y).ticks(null, 's'))
            .append('text')
            .attr('x', 2)
            .attr('y', this.y(this.y.ticks().pop()) + 0.5)
            .attr('dy', '0.32em')
            .attr('fill', '#000')
            .attr('font-weight', 'bold')
            .attr('text-anchor', 'start')
            .text('Population');

        // for legend on right side
        let legend = this.g.append('g')
            .attr('font-family', 'sans-serif')
            .attr('font-size', 10)
            .attr('text-anchor', 'end')
            .selectAll('g')
            .data(keys.slice().reverse())
            .enter().append('g')
            .attr('transform', (d, i) => 'translate(0,' + i * 20 + ')');

        legend.append('rect')
            .attr('x', this.width - 19)
            .attr('width', 19)
            .attr('height', 19)
            .attr('fill', this.z);

        legend.append('text')
            .attr('x', this.width - 24)
            .attr('y', 9.5)
            .attr('dy', '0.32em')
            .text(d => d);
    }

}

import {
  Component,
  NgZone,Input, ɵConsole
} from "@angular/core";
import { HttpClient } from '@angular/common/http';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as d3 from "d3";
import * as d3Scale from "d3-scale";
import { DataModel } from 'src/app/data.model';
import { Observable } from 'rxjs';
/** For Am Charts */
am4core.useTheme(am4themes_animated);
/** For Fusion Charts */
const data = {
  chart: {
    caption: "Monthly recurring revenue",
    yaxisname: "Revenue",
    subcaption: "(On GAAP basis)",
    yaxisminvalue: "-2000",
    numberPrefix : "$",
    showValues : "0",
    plottooltext:
      "$seriesName in $label was <b>$dataValue</b>  ($percentValue of monthly total)",
    decimals: "1",
    theme: "fusion",
    plotSpacePercent : "0"
    
  },
  categories: [
    {
      category: [
        {
          label: "Dec-17"
        },
        {
          label: "Jan-18"
        },
        {
          label: "Feb-18"
        },
        {
          label: "Mar-18"
        },
        {
          label: "Apr-18"
        },
        {
          label: "May-18"
        },
        {
          label: "Jun-18"
        },
        {
          label: "Jul-18"
        },
        {
          label: "Aug-18"
        },
        {
          label: "Sep-18"
        },
        {
          label: "Oct-18"
        },
        {
          label: "Nov-18"
        },
        {
          label: "Dec-18"
        }
      ]
    }
  ],
  dataset: [
    {
      seriesname: "MRR",
     data: [
        {
          value: "7750"
        },
		 {
          value: "7160"
        },
		{
          value: "5610"
        },
		{
          value: "4390"
        },
		{
          value: "3570"
        },
		{
          value: "3050"
        },
		{
          value: "2740"
        },
		{
          value: "2350"
        },
		{
          value: "1890"
        },
		{
          value: "1300"
        },
		 {
          value: "1110"
        },
		{
          value: "930"
        },
		{
          value: "810"
        }
      ]
    },
    {
      seriesname: "New business",
      data: [
        {
          value: "4070"
        },
        {
          value: "2660"
        },
        {
          value: "2140"
        },
		{
          value: "1790"
        },
		 {
          value: "1510"
        },
		 {
          value: "1350"
        },
		{
          value: "1160"
        },
		{
          value: "900"
        },
		{
          value: "490"
        },
		{
          value: "420"
        },
		{
          value: "390"
        },
		 {
          value: "380"
        },
      ]
    },
    {
      seriesname: "Upsell",
      data: [
        {
          value: "220"
        },
        {
          value: "240"
        },
        {
          value: "280"
        },
        {
          value: "350"
        },
        {
          value: "580"
        },
        {
          value: "630"
        },
        {
          value: "670"
        },
        {
          value: "740"
        },
        {
          value: "790"
        },
        {
          value: "920"
        },
        {
          value: "1050"
        },
        {
          value: "1290"
        },
        {
          value: "1320"
        }
      ]
    },
    {
      seriesname: "Consulting",
      data: [
        {
          value: "0"
        },
        {
          value: "170"
        },
        {
          value: "170"
        },
        {
          value: "130"
        },
        {
          value: "80"
        },
        {
          value: "60"
        },
        {
          value: "60"
        },
        {
          value: "60"
        },
        {
          value: "50"
        },
        {
          value: "50"
        },
        {
          value: "20"
        },
        {
          value: "0"
        },
        {
          value: "0"
        }
      ]
    },
    {
      seriesname: "Churn",
      data: [
        {
          value: "-650"
        },
        {
          value: "-630"
        },
        {
          value: "-500"
        },
        {
          value: "-350"
        },
        {
          value: "-320"
        },
        {
          value: "-260"
        },
        {
          value: "-150"
        },
        {
          value: "-110"
        },
        {
          value: "-100"
        },
        {
          value: "-90"
        },
        {
          value: "-70"
        },
        {
          value: "-50"
        },
        {
          value: "-50"
        }
      ]
    },
    {
      seriesname: "Downgrades",
      data: [
        {
          value: "-1660"
        },
        {
          value: "-1650"
        },
        {
          value: "-1520"
        },
        {
          value: "-1320"
        },
        {
          value: "-1060"
        },
        {
          value: "-900"
        },
        {
          value: "-780"
        },
        {
          value: "-680"
        },
        {
          value: "-580"
        },
        {
          value: "-320"
        },
        {
          value: "-260"
        },
        {
          value: "-210"
        },
        {
          value: "-180"
        }
      ]
    }
  ]
};
export interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /**D3 Charts */
  private margin: Margin;
  private widthd3: number;
  private heightd3: number;
  private svg: any;     // TODO replace all `any` by the right type
  private x: any;
  private y: any;
  private z: any;
  private g: any;
  private retentionY: any;
  private retentionX: any;
  /** For Fusion Charts */
  width = 900;
  height = 600;
  type = "stackedcolumn2d";
  dataFormat = "json";
  dataSource = data;
  /** For Am Charts */
  datape : any;
  country : string;
  litres : string;
  pieColor : string;
  title = 'AmChartsPoc';
  pieChart : any;
  barChart : any;
  chart : any;
  name : string;
  lineChart : any;
  dataNormalized = [];
  data: Observable<DataModel>;
  constructor(private http: HttpClient) {
    this.data = this.http.get<DataModel>('./assets/data.json');
  }
  ngAfterViewInit() {
    this.getPieChartData();
    this.getBarChartData();
    this.getLineChartData();
    this.treemap();
    this.initMargins();
    this.d3BarChart();
  }

public async getPieChartData(){
  this.pieChart = am4core.create("chartpiediv", am4charts.PieChart);
  this.pieChart.data = [{
    "country": "Lithuania",
    "litres": 501.9,
    "color": "#008000"
}, {
    "country": "Czechia",
    "litres": 301.9,
    "color": "#B0C4DE"
}, {
    "country": "Ireland",
    "litres": 201.1,
    "color": "#1E90FF"
}, {
    "country": "Germany",
    "litres": 165.8,
    "color": "#ff0000"
}, {
    "country": "Australia",
    "litres": 139.9,
    "color": "#808000"
}, {
    "country": "Austria",
    "litres": 128.3,
    "color": "#ff0000"
}, {
    "country": "UK",
    "litres": 99,
    "color": "#008000"
}, {
    "country": "Belgium",
    "litres": 60,
    "color": "#FFFF00"
}, {
    "country": "The Netherlands",
    "litres": 50,
    "color": "#FFA500"
}];
let pieSeries = this.pieChart.series.push(new am4charts.PieSeries());
this.pieChart.radius = "75%";
pieSeries.dataFields.value = "litres";
pieSeries.dataFields.category = "country";
pieSeries.slices.template.propertyFields.fill = "color";
// Showing labels in Pie slice
pieSeries.ticks.template.disabled = true;
pieSeries.alignLabels = false;
pieSeries.labels.template.text = "{value.percent.formatNumber('#.0')}%";
pieSeries.labels.template.radius = am4core.percent(-40);
pieSeries.labels.template.fill = am4core.color("white");
//Condition to show only Above 15% label name in pie slice
pieSeries.labels.template.adapter.add("radius", function(radius, target) {
  if (target.dataItem && (target.dataItem.values.value.percent < 15)) {
    return 0;
  }
  return radius;
});
// Add legend
this.pieChart.legend = new am4charts.Legend();
pieSeries.labels.template.bent = false;
this.pieChart.legend.position = "right";
//Disable legend click
this.pieChart.legend.itemContainers.template.clickable = false;
//Add space in legend
this.pieChart.legend.itemContainers.template.paddingTop = 2;
this.pieChart.legend.itemContainers.template.paddingBottom = 2
}

public async getBarChartData(){
this.barChart = am4core.create("chartdiv", am4charts.XYChart);
this.barChart.data = [{
  "country": "USA",
  "visits": 3025
}, {
  "country": "China",
  "visits": 1882
}, {
  "country": "Japan",
  "visits": 1809
}, {
  "country": "Germany",
  "visits": 1322
}, {
  "country": "UK",
  "visits": 1122
}, {
  "country": "France",
  "visits": 1114
}, {
  "country": "India",
  "visits": 984
}, {
  "country": "Spain",
  "visits": 711
}];
let categoryAxis = this.barChart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "country";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.grid.template.strokeOpacity = 0;
categoryAxis.renderer.minGridDistance = 10;
categoryAxis.renderer.line.strokeOpacity = 1;

let valueAxis = this.barChart.yAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.labels.template.disabled = true;
valueAxis.renderer.grid.template.strokeOpacity = 0;
valueAxis.title.text ="(Millions)";

// to get name in diagnol manner
//categoryAxis.renderer.labels.template.rotation = 90;
// Create series
let series = this.barChart.series.push(new am4charts.ColumnSeries());
//series.sequencedInterpolation = true;
series.dataFields.valueY = "visits";
series.dataFields.categoryX = "country";
series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}";
// to dynamically pass colors to colummns based on condition
series.columns.template.adapter.add("fill", function (fill, target) {
  let dataItem = target.dataItem;   
  console.log("dataItem"+dataItem);
  if(dataItem.valueY < 1000){
        return am4core.color("#a8b3b7");
      }else if(dataItem.valueY > 1000){
        return am4core.color("#00008B");
      }
});
//To get Label value on top of each bar
let valueLabel = series.bullets.push(new am4charts.LabelBullet());
valueLabel.label.text = "{valueY}";
valueLabel.label.fontSize = 20;
valueLabel.label.dy = -15;

}

public async getLineChartData(){
  //Line diagrams
this.lineChart = am4core.create("chartLinediv", am4charts.XYChart);
// Add data
this.lineChart.data = [{
  "date": new Date(2018, 3, 20),
  "value": 90,
  "lineColor": "#FFA500"
}, {
  "date": new Date(2018, 3, 21),
  "value": 102,
  "lineColor": "#FFA500"
}, {
  "date": new Date(2018, 3, 22),
  "value": 65,
  "lineColor": "#FFA500"
}, {
  "date": new Date(2018, 3, 23),
  "value": 62,
  "lineColor": "#FFA500"
}, {
  "date": new Date(2018, 3, 24),
  "value": 55,
  "lineColor": "#FFA500"
}, {
  "date": new Date(2018, 3, 25),
  "value": 81,
  "lineColor": "#FFA500"
}];
// Create axis
let dateAxis = this.lineChart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.grid.template.location = 0;
dateAxis.renderer.minGridDistance = 30;
dateAxis.renderer.grid.template.disabled = true;
dateAxis.renderer.tooltip.disabled = true;
dateAxis.renderer.line.strokeOpacity = 1;
// Create value axis
let valueAxis1 = this.lineChart.yAxes.push(new am4charts.ValueAxis());
valueAxis1.renderer.grid.template.disabled = false;
valueAxis1.renderer.tooltip.disabled = true;
valueAxis1.renderer.line.strokeOpacity = 2;
valueAxis1.title.text = "Premium (Millions)";
// Create series
let lineSeries = this.lineChart.series.push(new am4charts.LineSeries());
lineSeries.dataFields.valueY = "value";
lineSeries.dataFields.dateX = "date";
lineSeries.propertyFields.stroke = "lineColor";
// Add simple bullet
let bullet = lineSeries.bullets.push(new am4charts.CircleBullet());
let image = bullet.createChild(am4core.Image);
bullet.circle.fill = am4core.color("orange");
bullet.circle.stroke = am4core.color("orange");

}

public async treemap(){
let chart = am4core.create("treemapdiv", am4charts.TreeMap);
chart.data = [{
name: "First",
children: [
{
name: "A1",
value: 500
},
{
  name: "A4",
  value: 300
  },
  {
    name: "A5",
    value: 200
    },
{
name: "A2",
value: 60
},
{
name: "A3",
value: 30
}
]
},
{
name: "Second",
children: [
{
name: "B1",
value: 135
},
{
name: "B2",
value: 98
},
{
name: "B3",
value: 56
}
]
},
{
name: "Third",
children: [
{
name: "C1",
value: 435
},
{
name: "C2",
value: 130
},
{
name: "C3",
value: 126,
    "color": "#FFFF00"
},
{
name: "C4",
value: 26,
    "color": "#FFA500"
}]
}];
chart.colors.step = 2;
chart.dataFields.value = "value";
chart.dataFields.name = "name";
chart.dataFields.children = "children";
chart.zoomable = false;
let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.grid.template.location = 0;
dateAxis.renderer.minGridDistance = 30;
dateAxis.renderer.grid.template.disabled = true;
dateAxis.renderer.tooltip.disabled = true;
dateAxis.renderer.line.strokeOpacity = 0;

// Create value axis
let valueAxis1 = chart.yAxes.push(new am4charts.ValueAxis());
//valueAxis1.renderer.grid.template.disabled = true;
valueAxis1.renderer.tooltip.disabled = true;
valueAxis1.renderer.line.strokeOpacity = 2;
valueAxis1.min = 0;
valueAxis1.max = 400;

let level0SeriesTemplate = chart.seriesTemplates.create("0");
let level0ColumnTemplate = level0SeriesTemplate.columns.template;
level0ColumnTemplate.fillOpacity = 0;
level0ColumnTemplate.strokeWidth = 1;
level0ColumnTemplate.strokeOpacity = 0;
let level1SeriesTemplate = chart.seriesTemplates.create("1");
level1SeriesTemplate.tooltip.dy = -15;
level1SeriesTemplate.tooltip.pointerOrientation = "vertical";
let level1ColumnTemplate = level1SeriesTemplate.columns.template;
level1SeriesTemplate.strokeOpacity = 1;
}
private initMargins() {
  this.margin = { top: 20, right: 20, bottom: 30, left: 100 };
}

public async d3BarChart(){}
  


ngOnDestroy() {
   if (this.pieChart) {
      this.pieChart.dispose();
    }
    if (this.barChart) {
      this.barChart.dispose();
    }
    if (this.lineChart) {
      this.lineChart.dispose();
    }
  }
}
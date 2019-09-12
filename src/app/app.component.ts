import {
  Component,
  NgZone,Input
} from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  datape : any;
  country : string;
  litres : string;
  pieColor : string;
  title = 'AmChartsPoc';
  pieChart : any;
  barChart : any;
  chart : any;
  lineChart : any;
  constructor(private zone: NgZone) {}
  ngAfterViewInit() {
    this.getPieChartData();
    this.getBarChartData();
    this.getLineChartData();
    this.treemap();
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
  "visits": 3025,
  "color": "#008000"
}, {
  "country": "China",
  "visits": 1882,
  "color": "#008000"
}, {
  "country": "Japan",
  "visits": 1809,
  "color": "#008000"
}, {
  "country": "Germany",
  "visits": 1322,
  "color": "#008000"
}, {
  "country": "UK",
  "visits": 1122,
  "color": "#008000"
}, {
  "country": "France",
  "visits": 1114,
  "color": "#008000"
}, {
  "country": "India",
  "visits": 984,
  "color": "#008000"
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
series.sequencedInterpolation = true;
series.dataFields.valueY = "visits";
series.dataFields.categoryX = "country";

// tooltip to show details on click of Bar
series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
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
// Set up data source
//this.lineChart.dataSource.url = "/src/assets/lineChartData.Json";
//this.lineChart.dataSource.parser = new am4core.JSONParser();
//this.lineChart.dataSource.parser.options.emptyAs = 0;
// Create axis
let dateAxis = this.lineChart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.grid.template.location = 0;
dateAxis.renderer.minGridDistance = 30;
dateAxis.renderer.grid.template.disabled = true;
dateAxis.renderer.tooltip.disabled = true;
dateAxis.renderer.line.strokeOpacity = 1;
// Create value axis
let valueAxis1 = this.lineChart.yAxes.push(new am4charts.ValueAxis());
//valueAxis1.renderer.grid.template.disabled = true;
valueAxis1.renderer.tooltip.disabled = true;
valueAxis1.renderer.line.strokeOpacity = 2;
valueAxis1.title.text = "Premium (Millions)";
// Create series
let lineSeries = this.lineChart.series.push(new am4charts.LineSeries());
lineSeries.dataFields.valueY = "value";
lineSeries.dataFields.dateX = "date";
lineSeries.name = "Sales";
lineSeries.strokeWidth = 3;
lineSeries.propertyFields.stroke = "lineColor";
lineSeries.propertyFields.fill = "lineColor";
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
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
  lineChart : any;
  constructor(private zone: NgZone) {}
  ngAfterViewInit() {
    this.getPieChartData();
    this.getBarChartData();
    this.getLineChartData();
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
  // Add and configure Series
  let pieSeries = this.pieChart.series.push(new am4charts.PieSeries());
  pieSeries.dataFields.value = "litres";
  pieSeries.dataFields.category = "country";
  pieSeries.slices.template.propertyFields.fill = "color";
  pieSeries.slices.template.stroke = am4core.color("#fff");
  pieSeries.slices.template.strokeWidth = 2;
  pieSeries.slices.template.strokeOpacity = 1;
  // This creates initial animation
  pieSeries.hiddenState.properties.opacity = 1;
  pieSeries.hiddenState.properties.endAngle = -90;
  pieSeries.hiddenState.properties.startAngle = -90;
  //Add legend
  this.pieChart.legend = new am4charts.Legend();
  pieSeries.labels.template.bent = false;
  pieSeries.ticks.template.disabled = true;
  pieSeries.alignLabels = true;
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
}, {
  "country": "Netherlands",
  "visits": 665
}, {
  "country": "Russia",
  "visits": 580
}, {
  "country": "South Korea",
  "visits": 443
}, {
  "country": "Canada",
  "visits": 441
}];
let categoryAxis = this.barChart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "country";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.grid.template.strokeOpacity = 0;
categoryAxis.renderer.minGridDistance = 10;

let valueAxis = this.barChart.yAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.grid.template.strokeOpacity = 0;
// Create series
let series = this.barChart.series.push(new am4charts.ColumnSeries());
series.dataFields.valueY = "visits";
series.dataFields.categoryX = "country";
series.name = "Visits";

}

public async getLineChartData(){
  //Line diagrams
this.lineChart = am4core.create("chartLinediv", am4charts.XYChart);
// Add data
this.lineChart.data = [{
  "date": new Date(2018, 3, 20),
  "value": 90
}, {
  "date": new Date(2018, 3, 21),
  "value": 102
}, {
  "date": new Date(2018, 3, 22),
  "value": 65
}, {
  "date": new Date(2018, 3, 23),
  "value": 62
}, {
  "date": new Date(2018, 3, 24),
  "value": 55
}, {
  "date": new Date(2018, 3, 25),
  "value": 81
}];
// Create axis
let dateAxis = this.lineChart.xAxes.push(new am4charts.DateAxis());
// Create value axis
let valueAxis1 = this.lineChart.yAxes.push(new am4charts.ValueAxis());
// Create series
let lineSeries = this.lineChart.series.push(new am4charts.LineSeries());
lineSeries.dataFields.valueY = "value";
lineSeries.dataFields.dateX = "date";
lineSeries.name = "Sales";
lineSeries.strokeWidth = 3;
// Add simple bullet
let bullet = lineSeries.bullets.push(new am4charts.CircleBullet());
let image = bullet.createChild(am4core.Image);
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
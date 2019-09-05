import {
  Component,
  NgZone
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
  title = 'AmChartsPoc';
  constructor() {}
  ngAfterViewInit() {
    this.getPieData();
    this.getBarData();
    this.getLineData();
  }

public async getPieData(){
  let chart1 = am4core.create("chartpiediv", am4charts.PieChart);
  chart1.data = [{
      "country": "Lithuania",
      "litres": 501.9
  }, {
      "country": "Czechia",
      "litres": 301.9
  }, {
      "country": "Ireland",
      "litres": 201.1
  }, {
      "country": "Germany",
      "litres": 165.8
  }, {
      "country": "Australia",
      "litres": 139.9
  }, {
      "country": "Austria",
      "litres": 128.3
  }, {
      "country": "UK",
      "litres": 99
  }, {
      "country": "Belgium",
      "litres": 60
  }, {
      "country": "The Netherlands",
      "litres": 50
  }];

  // Add and configure Series
  let pieSeries = chart1.series.push(new am4charts.PieSeries());
  pieSeries.dataFields.value = "litres";
  pieSeries.dataFields.category = "country";
  pieSeries.slices.template.stroke = am4core.color("#fff");
  pieSeries.slices.template.strokeWidth = 2;
  pieSeries.slices.template.strokeOpacity = 1;
  // This creates initial animation
  pieSeries.hiddenState.properties.opacity = 1;
  pieSeries.hiddenState.properties.endAngle = -90;
  pieSeries.hiddenState.properties.startAngle = -90;
}
public async getBarData(){
/*Bar diagram */
let chart = am4core.create("chartdiv", am4charts.XYChart);
chart.scrollbarX = new am4core.Scrollbar();
// Add data
chart.data = [{
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
// Create axes
let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "country";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.minGridDistance = 30;
categoryAxis.renderer.labels.template.horizontalCenter = "right";
categoryAxis.renderer.labels.template.verticalCenter = "middle";
categoryAxis.renderer.labels.template.rotation = 270;
categoryAxis.tooltip.disabled = true;
categoryAxis.renderer.minHeight = 110;
let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.minWidth = 50;
// Create series
let series = chart.series.push(new am4charts.ColumnSeries());
series.sequencedInterpolation = true;
series.dataFields.valueY = "visits";
series.dataFields.categoryX = "country";
series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
series.columns.template.strokeWidth = 0;
series.tooltip.pointerOrientation = "vertical";
series.columns.template.column.cornerRadiusTopLeft = 10;
series.columns.template.column.cornerRadiusTopRight = 10;
series.columns.template.column.fillOpacity = 0.8;
// on hover, make corner radiuses bigger
let hoverState = series.columns.template.column.states.create("hover");
hoverState.properties.cornerRadiusTopLeft = 0;
hoverState.properties.cornerRadiusTopRight = 0;
hoverState.properties.fillOpacity = 1;
series.columns.template.adapter.add("fill", function(fill, target) {
  return chart.colors.getIndex(target.dataItem.index);
});
// Cursor
chart.cursor = new am4charts.XYCursor();
}
public async getLineData(){
  //Line diagrams
let chartline = am4core.create("chartLinediv", am4charts.XYChart);
// Add data
chartline.data = [{
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
// Create axes
let dateAxis = chartline.xAxes.push(new am4charts.DateAxis());
// Create value axis
let valueAxis1 = chartline.yAxes.push(new am4charts.ValueAxis());
// Create series
let lineSeries = chartline.series.push(new am4charts.LineSeries());
lineSeries.dataFields.valueY = "value";
lineSeries.dataFields.dateX = "date";
lineSeries.name = "Sales";
lineSeries.strokeWidth = 3;
// Add simple bullet
let bullet = lineSeries.bullets.push(new am4charts.Bullet());
let image = bullet.createChild(am4core.Image);
image.href = "https://www.amcharts.com/lib/images/star.svg";
image.width = 30;
image.height = 30;
image.horizontalCenter = "middle";
image.verticalCenter = "middle";  
}
}
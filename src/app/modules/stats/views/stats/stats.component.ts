import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { barChartConfig } from '../../configs/bar-chart.config';
import { donutChartConfig } from '../../configs/donut-chart.config';
import { BAR_CHART_DATA } from '../../mocks/bar-chart.data';
import { DONUT_CHART_DATA } from '../../mocks/donut-chart.data';
import { TABLE_COLUMNS, TABLE_DATA } from '../../mocks/table.data';
import { BarChartOptions } from '../../models/bar-chart-options.model';
import { DonutChartOptions } from '../../models/donut-chart-options.model';


@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent {

  displayedColumns = TABLE_COLUMNS;
  dataSource = TABLE_DATA;

  public barChart: BarChartOptions = {
    chart: barChartConfig.chart!,
    xaxis: barChartConfig.xaxis!,
    series: [{ data: BAR_CHART_DATA }]
  };

  public donutChart: DonutChartOptions = {
    chart: donutChartConfig.chart!,
    labels: donutChartConfig.labels!,
    series: DONUT_CHART_DATA,
  };

}

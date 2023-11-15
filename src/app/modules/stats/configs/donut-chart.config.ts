import { DonutChartOptions } from "../models/donut-chart-options.model";

export const donutChartConfig: Partial<DonutChartOptions> = {
  chart: {
    width: 350,
    type: "donut"
  },
  labels: ["Computer", "Players"]
};
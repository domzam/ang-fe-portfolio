import { BarChartOptions } from "../models/bar-chart-options.model";

export const barChartConfig: Partial<BarChartOptions> = {
  chart: {
    height: 300,
    width: '100%',
    type: "bar"
  },
  xaxis: {
    categories: [
      "Computer",
      "Player 1",
      "Player 2",
      "Player 3",
      "Player 4",
      "Player 5"
    ]
  }
};
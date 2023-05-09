import PropTypes from "prop-types";
import ReactApexChart from "react-apexcharts";
// @mui
import { useTheme, styled } from "@mui/material/styles";
import { Card, CardHeader } from "@mui/material";
// utils
import { fNumber } from "../../../utils/formatNumber";
// components
import { useChart } from "../../../components/chart";
import { IPieChartData } from "../../../models/pies.model";
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const StyledChartWrapper = styled("div")(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  "& .apexcharts-canvas svg": { height: CHART_HEIGHT },
  "& .apexcharts-canvas svg,.apexcharts-canvas foreignObject": {
    overflow: "visible",
  },
  "& .apexcharts-legend": {
    height: LEGEND_HEIGHT,
    alignContent: "center",
    position: "relative !important",
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

SectorPie.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartColors: PropTypes.arrayOf(PropTypes.string),
  chartData: PropTypes.array,
};

type SectorPieProps = {
  title: string;
  subheader: string | undefined;
  chartColors: string[];
  chartData: IPieChartData[];
  onSliceClick?: () => void;
};

export default function SectorPie({
  title,
  subheader,
  chartColors,
  chartData,
  onSliceClick,
  ...other
}: SectorPieProps) {
  const theme = useTheme();
  const navigate = useNavigate();

  const chartLabels = chartData?.map((i: IPieChartData) => i.label);

  const chartSeries = chartData?.map((i: IPieChartData) => i.value);
  const chartIds = chartData?.map((cD: IPieChartData) => cD.id);

  const chartOptions = useChart({
    chart: {
      events: {
        dataPointSelection: (event: any, chartContext: any, config: any) => {
          console.log(config.w.config.chartIds[config.dataPointIndex]);
          const id = config.w.config.chartIds[config.dataPointIndex];
          const delay = 100;
          const delayPromise = new Promise((resolve) => setTimeout(resolve, delay));
          delayPromise.then(() => navigate(`/dashboard/sector/${id}`));
        },
      },
    },
    colors: chartColors,
    labels: chartLabels,
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: "center" },
    dataLabels: {
      enabled: true,
      dropShadow: { enabled: false },
    },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName: any) => fNumber(seriesName),
        title: {
          formatter: (seriesName: any) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } },
    },
    events: {
      click: function (event: any, chartContext: any, config: any) {
        console.log(config.label);
      },
      mouseMove: function (event: any, chartContext: any, config: any) {
        console.log(config);
      },
      dataPointSelection: (event: any, chartContext: any, config: any) => {
        console.log("CONGId", config);
      },
    },
    chartIds: chartIds,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <StyledChartWrapper dir="ltr">
        <ReactApexChart type="pie" series={chartSeries} options={chartOptions} height={280} />
      </StyledChartWrapper>
    </Card>
  );
}

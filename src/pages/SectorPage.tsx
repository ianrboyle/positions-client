import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useFetchSectorQuery, useFetchUserQuery } from "../store";
import { useTheme } from "@mui/material/styles";
// @mui
import { Stack, Container, Typography, Grid } from "@mui/material";
// components
import SkeletonAnimation from "../components/progress/Skeleton";
// sections
// mock
import { IPieChartData } from "../models/pies.model";
import SectorPie from "../sections/@dashboard/app/SectorPie";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "symbol", label: "Symbol", alignRight: false },
  { id: "sharesOwned", label: "Shares Owned", alignRight: false },
  { id: "companyName", label: "Company Name", alignRight: false },
  { id: "currentTotalValue", label: "Current Total Value", alignRight: false },
  { id: "sectorName", label: "Sector Name", alignRight: false },
  { id: "industryName", label: "Industry Name", alignRight: false },
  { id: "" },
];

export const SectorPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useFetchSectorQuery(id ?? "");

  const theme = useTheme();
  const sector = data;
  const industryChartData: IPieChartData[] | undefined = sector?.industries?.map((i) => {
    return {
      label: i.industryName,
      value: i.totalValue,
      id: i.id,
      type: "industry",
    };
  });
  const positionChartData: IPieChartData[] | undefined = sector?.positions?.map((p) => {
    return {
      label: p.symbol,
      value: p.currentTotalValue,
      id: p.id,
      type: "position",
    };
  });

  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>
      {isLoading ? (
        <SkeletonAnimation />
      ) : sector && sector?.id > 0 ? (
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              {sector.sectorName}
            </Typography>
          </Stack>
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h6" gutterBottom>
              Percent of Account: {(sector.percentOfAccount * 100).toFixed(2)}%
            </Typography>
          </Grid>
          {industryChartData !== undefined && industryChartData.length > 1 ? (
            <Grid item xs={12} md={6} lg={4}>
              <SectorPie
                title="Industry Allocation"
                chartData={industryChartData}
                chartColors={[
                  theme.palette.primary.main,
                  theme.palette.info.main,
                  theme.palette.warning.main,
                  theme.palette.error.main,
                ]}
                subheader={undefined}
              />
            </Grid>
          ) : industryChartData !== undefined && industryChartData.length === 1 ? (
            <Grid item xs={12} md={6} lg={4}>
              <Typography variant="h6" gutterBottom>
                {industryChartData[0].label}: ${industryChartData[0].value}
              </Typography>
            </Grid>
          ) : null}
          {positionChartData !== undefined && positionChartData.length > 1 ? (
            <Grid item xs={12} md={6} lg={4}>
              <SectorPie
                title="Position Allocation"
                chartData={positionChartData}
                chartColors={[
                  theme.palette.primary.main,
                  theme.palette.info.main,
                  theme.palette.warning.main,
                  theme.palette.error.main,
                ]}
                subheader={undefined}
              />
            </Grid>
          ) : positionChartData !== undefined && positionChartData.length === 1 ? (
            <Grid item xs={12} md={6} lg={4}>
              <Typography variant="h6" gutterBottom>
                {positionChartData[0].label}: ${positionChartData[0].value}
              </Typography>
            </Grid>
          ) : null}
        </Container>
      ) : null}
    </>
  );
};

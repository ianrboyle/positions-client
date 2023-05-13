import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useFetchIndustryQuery, useFetchSectorQuery } from "../store";
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

export const IndustryPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useFetchIndustryQuery(id ?? "");
  const theme = useTheme();
  const industry = data;

  const positionChartData: IPieChartData[] | undefined = industry?.positions?.map((p) => {
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
      ) : industry && industry?.id > 0 ? (
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              {industry.industryName}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h6" gutterBottom>
              Sector: {industry.sectorName}
            </Typography>
          </Stack>

          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h6" gutterBottom>
              Percent of Account: {(industry.percentOfAccount * 100).toFixed(2)}%
            </Typography>
          </Grid>
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

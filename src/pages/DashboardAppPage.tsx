import { Helmet } from "react-helmet-async";
// @mui
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography } from "@mui/material";
// components
// sections
import Papa from "papaparse";
import { useAddPositionsMutation, useFetchUserQuery } from "../store";
import SectorPie from "../sections/@dashboard/app/SectorPie";
import { IPieChartData } from "../models/pies.model";
import { parseCsvFile } from "../utils/formatCsvPositions";
import CircularIndeterminate from "../components/progress/Spinner";
// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  // Load CSV file
  const [addPositions, results] = useAddPositionsMutation();
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results: Papa.ParseResult<any>) => {
          console.log(results.data);
          const parsedData = parseCsvFile(results.data);
          console.log(parsedData);
          addPositions(parsedData.splice(21, 22));
        },
      });
    }
  };
  // const { data, error, isLoading } = useFetchPositionsQuery();
  const { data, error, isLoading } = useFetchUserQuery();
  // if (data !== undefined){
  const sectorChartData: IPieChartData[] | undefined = data?.sectors.map((s) => {
    return {
      label: s.sectorName,
      value: s.totalValue,
      id: s.id,
      type: "sector",
    };
  });
  const industryChartData: IPieChartData[] | undefined = data?.industries.map((i) => {
    return {
      label: i.industryName,
      value: i.totalValue,
      id: i.id,
      type: "industry",
    };
  });
  const positionChartData: IPieChartData[] | undefined = data?.positions.map((p) => {
    return {
      label: p.symbol,
      value: p.currentTotalValue,
      id: p.id,
      type: "position",
    };
  });

  // }

  console.log(data);
  console.log(sectorChartData);
  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          {sectorChartData !== undefined && sectorChartData.length > 0 ? (
            <Grid item xs={12} md={6} lg={4}>
              <SectorPie
                title="Sector Allocation"
                chartData={sectorChartData}
                chartColors={[
                  theme.palette.primary.main,
                  theme.palette.info.main,
                  theme.palette.warning.main,
                  theme.palette.error.main,
                ]}
                subheader={undefined}
              />
            </Grid>
          ) : null}
          {positionChartData !== undefined && positionChartData.length > 0 ? (
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
          ) : null}

          {industryChartData !== undefined && industryChartData.length > 0 ? (
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
          ) : null}
          {results.isLoading ? <CircularIndeterminate /> : <input type="file" onChange={handleFileUpload} />}
        </Grid>
      </Container>
    </>
  );
}

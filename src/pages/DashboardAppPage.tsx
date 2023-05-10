import { Helmet } from "react-helmet-async";
import { faker } from "@faker-js/faker";
// @mui
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography } from "@mui/material";
// components
import Iconify from "../components/iconify";
import { Icon } from "@iconify/react";
// sections
import Papa from "papaparse";
import { useAddPositionsMutation, useFetchPositionsQuery, useFetchUserQuery } from "../store";
import SectorPie from "../sections/@dashboard/app/SectorPie";
import { IPieChartData } from "../models/pies.model";
import { CsvPosition } from "../models/csv.model";
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
          {/* ADD ACCOUNT TOTAL VALUE SOMEWHERE HERE */}
          {/* <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="New Users" total={1352831} color="info" icon={'ant-design:apple-filled'} sx={undefined} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Item Orders" total={1723315} color="warning" icon={'ant-design:windows-filled'} sx={undefined} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} sx={undefined} />
          </Grid> */}
          {/* 
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid> */}
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

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid> */}

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

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))} subheader={undefined}            />
          </Grid> */}
          {/* 
          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))} subheader={undefined}            />
          </Grid> */}
          {/* 
          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Icon icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Icon icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Icon icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Icon icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]} subheader={undefined}            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]} subheader={undefined}            />
          </Grid> */}
          {results.isLoading ? <CircularIndeterminate /> : <input type="file" onChange={handleFileUpload} />}
        </Grid>
      </Container>
    </>
  );
}

import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetchSectorQuery, useFetchUserQuery } from "../store";
import { useTheme } from "@mui/material/styles";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Box,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Modal,
  Grid,
} from "@mui/material";
// components
import { Icon } from "@iconify/react";
import Scrollbar from "../components/scrollbar";
import SkeletonAnimation from "../components/progress/Skeleton";
// sections
import { UserListHead, UserListToolbar } from "../sections/@dashboard/user";
// mock
import { IPosition } from "../models/position.model";
import { CreateNewSectorForm } from "../components/forms/CreateNewSectorForm";
import { CreateNewIndustryForm } from "../components/forms/CreateNewIndustryForm";
import { ISectorDto, IndustryDto } from "../models/member.model";
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

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const SectorPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useFetchSectorQuery(id ?? "");

  console.log(data);
  const theme = useTheme();
  const sector = data;
  const industryChartData: IPieChartData[] | undefined = sector?.industries?.map((i) => {
    return {
      label: i.industryName,
      value: i.totalValue,
      id: i.id,
    };
  });
  const positionChartData: IPieChartData[] | undefined = sector?.positions?.map((p) => {
    return {
      label: p.symbol,
      value: p.currentTotalValue,
      id: p.id,
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

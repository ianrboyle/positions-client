import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFetchUserQuery } from "../store";
import { IPosition } from "../models/position.model";
import { Card, CardActions, CardContent, CardHeader, IconButton, MenuItem, Popover, TextField } from "@mui/material";
import { Grid, Button, Container, Stack, Typography, Modal, Box } from "@mui/material";
import CircularIndeterminate from "../components/progress/Spinner";
import EditIcon from "@mui/icons-material/Edit";
import { Icon } from "@iconify/react";
import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const bull = (
  <Box component="span" sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}>
    •
  </Box>
);

export const EditPositionPage = () => {
  const { id } = useParams<{ id: string }>();
  const [open, setOpen] = useState<HTMLElement | null>(null);
  const { data, error, isLoading } = useFetchUserQuery();
  const userData = data;
  const handleCloseMenu = () => {
    setOpen(null);
  };
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    console.log(id);
    console.log("event: ", event.currentTarget);
    setOpen(event.currentTarget);
  };

  const positionToEdit: IPosition | undefined = id ? userData?.positions.find((p) => p.id === parseInt(id)) : undefined;
  const positionSector = userData?.sectors.find((s) => s.id === positionToEdit?.sectorId);
  const positionIndustry = userData?.industries.find((i) => i.id === positionToEdit?.industryId);
  const positionData = {
    position: positionToEdit,
    sector: positionSector,
    industry: positionIndustry,
  };
  const { position, sector, industry } = positionData;

  console.log(userData);
  return (
    <Card sx={{ maxWidth: 750 }}>
      <CardHeader
        title={position?.symbol}
        subheader={position?.companyName}
        action={
          <IconButton color="inherit">
            <Icon icon={"eva:edit-fill"} />
          </IconButton>
        }
      />
      {!positionData ? (
        <CircularIndeterminate />
      ) : (
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {position?.companyName}
          </Typography>
          <Typography variant="h5" component="div">
            {position?.symbol}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Current Total Value: ${position?.currentTotalValue}
          </Typography>
          <Typography variant="body2">Shares Owned: {position?.sharesOwned}</Typography>
          <Typography variant="body2">
            Sector: {sector?.sectorName}
            <IconButton size="small" color="inherit" onClick={(event) => handleOpenMenu(event)}>
              <Icon icon={"eva:edit-fill"} />
            </IconButton>
          </Typography>
          <Typography variant="body2">Industry: {industry?.industryName}</Typography>
        </CardContent>
      )}
    </Card>
  );
};

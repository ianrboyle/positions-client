import { useParams } from "react-router-dom";
import { useFetchUserQuery } from "../store";
import { IPosition } from "../models/position.model";
import { Card, CardContent, CardHeader, IconButton } from "@mui/material";
import { Stack, Typography, Modal, Box } from "@mui/material";
import CircularIndeterminate from "../components/progress/Spinner";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { EditPositionForm } from "../components/forms/EditPositionForm";

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
const bull = (
  <Box component="span" sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}>
    •
  </Box>
);

export const EditPositionPage = () => {
  const { id } = useParams<{ id: string }>();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { data, error, isLoading } = useFetchUserQuery();
  const userData = data;

  const positionToEdit: IPosition | undefined = id ? userData?.positions.find((p) => p.id === parseInt(id)) : undefined;
  const positionSector = userData?.sectors.find((s) => s.id === positionToEdit?.sectorId);
  const positionIndustry = userData?.industries.find((i) => i.id === positionToEdit?.industryId);
  const positionInfo = {
    position: positionToEdit,
    sector: positionSector,
    industry: positionIndustry,
  };
  const { position, sector, industry } = positionInfo;

  console.log(userData);
  return (
    <Card sx={{ maxWidth: 750 }}>
      <CardHeader
        title={position?.symbol}
        subheader={position?.companyName}
        action={
          <IconButton onClick={handleOpen} color="inherit">
            <Icon icon={"eva:edit-fill"} />
          </IconButton>
        }
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={3}>
            <EditPositionForm
              handleClose={handleClose}
              position={position}
              sectors={userData?.sectors}
              industries={userData?.industries}
            />
          </Stack>
        </Box>
      </Modal>
      {!positionInfo ? (
        <CircularIndeterminate />
      ) : (
        <CardContent>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Current Total Value: ${position?.currentTotalValue}
          </Typography>
          <Typography variant="body2">Shares Owned: {position?.sharesOwned}</Typography>
          <Typography variant="body2">Sector: {sector?.sectorName}</Typography>
          <Typography variant="body2">Industry: {industry?.industryName}</Typography>
        </CardContent>
      )}
    </Card>
  );
};

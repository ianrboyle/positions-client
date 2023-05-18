import { Helmet } from "react-helmet-async";
// @mui
import { Grid, Button, Container, Stack, Typography, Modal, Box } from "@mui/material";
// components
// import Iconify from '../components/iconify';
import { Icon } from "@iconify/react";
import { BlogPostCard, BlogPostsSearch } from "../sections/@dashboard/blog";
// mock

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ButtonProps } from "@material-ui/core/Button";
import { useState } from "react";
import { AddPositionForm } from "../components/forms/AddPositionForm";
import { useFetchPositionsQuery } from "../store";
import BasicTable from "../components/tables/RandomTable";
import { IPosition } from "../models/position.model";
import CircularIndeterminate from "../components/progress/Spinner";
import SkeletonAnimation from "../components/progress/Skeleton";

interface IData {
  data: {
    positions: IPosition[];
  };
}
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

export const PositionsPage = () => {
  const { data, error, isLoading } = useFetchPositionsQuery();
  console.log("fetch positions: ", data, error, isLoading);
  const positions = data;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Helmet>
        <title> Dashboard: Poisitions | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Positions
          </Typography>
          <Button variant="contained" onClick={handleOpen} startIcon={<Icon icon="eva:plus-fill" />}>
            New Position
          </Button>
        </Stack>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Stack spacing={3}>
              <AddPositionForm handleClose={handleClose} />
            </Stack>
          </Box>
        </Modal>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between"></Stack>
        {isLoading ? <SkeletonAnimation /> : data && data.length > 0 ? <BasicTable positions={data} /> : null}

        <Grid container spacing={3}></Grid>
      </Container>
    </>
  );
};

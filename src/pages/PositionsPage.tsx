import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography, Modal, Box, TextField } from '@mui/material';
// components
// import Iconify from '../components/iconify';
import { Icon } from '@iconify/react';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';

import { ButtonProps } from '@material-ui/core/Button';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { AddPositionForm } from '../components/forms/AddPositionForm';

interface IconButtonProps extends ButtonProps {
  icon: string;
}
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export const PositionsPage = () =>  {
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
    <AddPositionForm />
      </Stack>
  </Box>
</Modal>

    <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
      <BlogPostsSearch posts={POSTS} />
      {/* <BlogPostsSort options={SORT_OPTIONS} /> */}
    </Stack>

    <Grid container spacing={3}>
      {POSTS.map((post, index) => (
        <BlogPostCard key={post.id} post={post} index={index} />
      ))}
    </Grid>
  </Container>
</>
)
}
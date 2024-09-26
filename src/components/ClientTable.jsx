import {
  Container,
  Stack,
  Typography,
  Button,
  Box,
  TextField,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import { useState } from "react";

function createData(name) {
  return { name };
}
const rows = [createData("Frozen yoghurt")];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

export default function DataTable() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        paddingTop: 10,
      }}
    >
      <Stack spacing={2}>
        <Button variant="outlined" color="gray" sx={{ width: 150 }}>
          List of Users
        </Button>
        <Button variant="outlined" color="gray" sx={{ width: 150 }}>
          Course
        </Button>
        <Button variant="outlined" color="gray" sx={{ width: 150 }}>
          Class
        </Button>
      </Stack>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: 2,
          }}
        >
          <Typography variant="h4">Client</Typography>
        </Box>
        <Typography>List of Course</Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Container>
  );
}

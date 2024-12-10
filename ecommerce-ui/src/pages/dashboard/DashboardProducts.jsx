import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import TablePagination from "@mui/material/TablePagination";
import { useMutation, useQuery } from '@tanstack/react-query';
import Avatar from "@mui/material/Avatar";
import { Box, IconButton, Typography } from '@mui/material';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
const getProducts = async (page, limit) => {
  const res = await axios.get("http://localhost:3000/api/products", {
    params: {
      page,
      limit,
    },
  });
  return res.data;
};
const deleteProduct = async (page, limit) => {
  const res = await axios.delete(`http://localhost:3000/api/products/${id}`);
  return res.data;
};

export default function DashboardProducts() {
      const [page, setPage] = React.useState(1);
      const [rowsPerPage, setRowsPerPage] = React.useState(10);


      const handleChangePage = (event, newPage) => {
        setPage(newPage + 1);
      };

      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
      };

      const query = useQuery({
        queryKey: ["products", rowsPerPage, page],
        queryFn: () => getProducts(page, rowsPerPage),
      });

      const mutation = useMutation({
        queryKey:(id)=>deleteProduct(id),

      })
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {query?.data?.data?.map(({ _id, name, price, image }) => (
            <TableRow
              key={_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Box sx={{ display: "flex", alignItems: "center", gap: "9px" }}>
                  <Avatar src={`http://localhost:3000/${image}`} alt={name} />
                  <Typography>{name}</Typography>
                </Box>
              </TableCell>
              <TableCell align="right">{price}$</TableCell>
              <TableCell align="right">
                <IconButton aria-label="delete" color="error"
                onClick={()=>{mutation.mutate(_id)}}>
                  <DeleteOutlineIcon />
                </IconButton>
                <IconButton aria-label="edit" >
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {query.isSuccess && (
        <TablePagination
          component="div"
          count={query.data.total}
          page={page - 1}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </TableContainer>
  );
}

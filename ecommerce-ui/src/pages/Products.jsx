import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ProductSkeleton from '../Components/ProductSkeleton';
import  Grid  from '@mui/material/Grid2';
import ProductCard from '../Components/ProductCard';
import * as React from "react";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const getProducts = async (page,limit,order) => {
  const res = await axios.get(
    "http://localhost:3000/api/products",{
      params:{
        page,
        limit,
        priceOrder:order
      }
    }
  );
  return res.data;
};
 

function Products() {

  const [order, setOrder] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

   const handleChange = (event) => {
     setOrder(event.target.value);
   };

  const handleChangePage = (event, newPage) => {
    setPage(newPage+1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

   const query = useQuery({
    queryKey: ["products",rowsPerPage,page,order],
    queryFn:()=> getProducts(page,rowsPerPage,order),
  });
  return (
    <>
      <Box sx={{ display:'flex',justifyContent:'end' ,my:2}}>
        <FormControl sx={{width:"500px"}}>
          <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={order}
            label="Sort by"
            onChange={handleChange}
          >
            <MenuItem value={""}>Best Match</MenuItem>
            <MenuItem value={"asc"}>Price low to high</MenuItem>
            <MenuItem value={"desc"}>Price high to low</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={2}>
        {query.isLoading ? (
          <ProductSkeleton />
        ) : (
          query.data.data.map((product) => {
            return (
              <Grid key={product._id} size={{ md: 3 }}>
                <ProductCard product={product} />
              </Grid>
            );
          })
        )}
      </Grid>
      {query.isSuccess && (
        <TablePagination
          component="div"
          count={query.data.total}
          page={page - 1}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[8, 16, 24]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </>
  );
}

export default Products



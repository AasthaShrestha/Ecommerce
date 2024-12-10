import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import NavBar from "../Components/NavBar";
import ProductCard from "../Components/ProductCard";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

const getFeaturedProducts = async () => {
  const res = await axios.get("http://localhost:3000/api/products/featured");
  return res.data.data;
};
const getLatestProducts = async () => {
  const res = await axios.get("http://localhost:3000/api/products/latest");
  return res.data.data;
};

export default function Home() {
  const query = useQuery({
    queryKey: ["featured-products"],
    queryFn: getFeaturedProducts,
  });

  const Latest = useQuery({
    queryKey: ["latest-products"],
    queryFn: getLatestProducts,
  });

  return (
    <>
      <img src="/home.webp" width="100%" />
      <Typography variant="h4" align="center" marginY={2}>
        Featured Products
      </Typography>
      <Grid container spacing={2}>
        {query.isLoading ? (
          <>
            <Grid size={{ md: 3 }}>
              <Skeleton variant="rectangular" height={250} />
            </Grid>
            <Grid size={{ md: 3 }}>
              <Skeleton variant="rectangular" height={250} />
            </Grid>{" "}
            <Grid size={{ md: 3 }}>
              <Skeleton variant="rectangular" height={250} />
            </Grid>{" "}
            <Grid size={{ md: 3 }}>
              <Skeleton variant="rectangular" height={250} />
            </Grid>
          </>
        ) : (
          query.data.map((product) => {
            return (
              <Grid key={product._id} size={{ md: 3 }}>
                <ProductCard product={product} />
              </Grid>
            );
          })
        )}
      </Grid>
      <Typography variant="h4" align="center" marginY={2}>
        Latest Products
      </Typography>
      <Grid container spacing={2}>
        {Latest.isLoading ? (
          <>
            <Grid size={{ md: 3 }}>
              <Skeleton variant="rectangular" height={250} />
            </Grid>
            <Grid size={{ md: 3 }}>
              <Skeleton variant="rectangular" height={250} />
            </Grid>{" "}
            <Grid size={{ md: 3 }}>
              <Skeleton variant="rectangular" height={250} />
            </Grid>{" "}
            <Grid size={{ md: 3 }}>
              <Skeleton variant="rectangular" height={250} />
            </Grid>
          </>
        ) : (
          Latest.data.map((product) => {
            return (
              <Grid key={product._id} size={{ md: 3 }}>
                <ProductCard product={product} />
              </Grid>
            );
          })
        )}
      </Grid>
    </>
  );
}
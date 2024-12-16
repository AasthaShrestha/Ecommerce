import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Alert from "@mui/material/Alert";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useParams } from "react-router-dom";

const addProduct = async (data) => {
    console.log(data)
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("image", data.image[0]);
    formData.append("featured", data.featured);
  const res = await axios.post("/api/products", formData);
  console.log(res);
  return res;
};

const getProductById = async(productId)=>{
    const res = await axios.get(`/api/products/${productId}`)
    return res.data.data
};

const schema = yup
  .object({
    name: yup.string().required(),
    price: yup.number().required(),
    featured: yup.boolean(),
  })
  .required();

export default function ProductForm() {
  const navigate = useNavigate();
  const {productId} = useParams();
  const action = productId ? "Edit" : "Add";
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

    const query = useQuery({
      queryKey: ["product", productId],
      queryFn:()=> getProductById(productId),
      enabled: Boolean(productId),
    });

  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      navigate("/dashboard/products")
     
    },
  });

  if(productId && query.isSuccess){
    setValue("name",query.data.name);
    setValue("price",query.data.price);
    setValue("featured",query.data.featured);
  }

  console.log(query);

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Stack
      sx={{ width: "80%", mx: "auto" }}
      direction="column"
      justifyContent="space-between"
    >
      <Card sx={{ p: 10 }} variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
         {action} Product
        </Typography>
        {mutation.error && (
          <Alert sx={{ my: 2 }} severity="error">
            {mutation.error?.response?.data?.message ?? "Something went wrong."}
          </Alert>
        )}

        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <FormControl>
            <input type="file" {...register("image")} />
            <FormLabel htmlFor="name">Name</FormLabel>
            <TextField
              id="name"
              type="text"
              name="name"
              autoComplete="name"
              fullWidth
              variant="outlined"
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
              {...register("name")}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="price">price</FormLabel>
            <TextField
              id="price"
              type="number"
              name="price"
              autoComplete="price"
              fullWidth
              variant="outlined"
              error={Boolean(errors.price)}
              helperText={errors.price?.message}
              {...register("price")}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="featured">Featured</FormLabel>
            <FormControlLabel
              control={<Checkbox  {...register("featured")} />}
              label="Featured"
            />
          </FormControl>

          <Button type="submit" fullWidth variant="contained">
            {action}
          </Button>
        </Box>
      </Card>
    </Stack>
  );
}



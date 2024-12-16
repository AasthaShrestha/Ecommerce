import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Alert from "@mui/material/Alert";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuthUser } from "../App";

const signIn = async (data) => {
  const res = await axios.post("/api/auth/sign-in", data);
  console.log(res);
  return res;
};

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

export default function SignIn() {
  const { setAuthUser } = useAuthUser();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: (res) => {
      // console.log(data)
      setAuthUser(res.data.data);
      navigate("/");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  console.log(mutation);

  // <input name="email" onc
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
          Sign In
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
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              fullWidth
              variant="outlined"
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              {...register("email")}
            />
          </FormControl>
          <FormControl>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FormLabel htmlFor="password">Password</FormLabel>
            </Box>
            <TextField
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              fullWidth
              variant="outlined"
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              {...register("password")}
            />
          </FormControl>
          <Button type="submit" fullWidth variant="contained">
            Sign In
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Dont have an account? <Link to="/sign-up">Sign UP</Link>
          </Typography>
        </Box>
      </Card>
    </Stack>
  );
}

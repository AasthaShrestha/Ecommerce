import { Skeleton } from "@mui/material";
import Grid  from "@mui/material/Grid2";

export default function ProductSkeleton() {
  return (
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
  );
}

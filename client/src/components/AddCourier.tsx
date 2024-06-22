"use client";
// Predefined Libaries from MUI/ Appollo Client/ GQL/Router
import { FETCH_COURIERS } from "@/app/couriers/page";
import { gql, useMutation } from "@apollo/client";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

//Creating AN API....CREATING COURIER DETAILS...
const CREATE_COURIER = gql`
  mutation Mutation($input: CourierInput!) {
    createCourier(input: $input) {
      courierDesc
      courierType
      destinationAddress
      returnAddress
      courierStatus
      arrivalDate
      courierWeight
      courierCost
    }
  }
`; // End of GQL..

export const AddCourier = () => {
  const [form, setForm] = React.useState<{
    courierDesc: string;
    courierType: string;
    destinationAddress: string;
    returnAddress: string;
    courierStatus: string;
    arrivalDate: string;
    courierWeight: string;
    courierCost: string;
  }>({
    courierDesc: "",
    courierType: "",
    destinationAddress: "",
    returnAddress: "",
    courierStatus: "",
    arrivalDate: "",
    courierWeight: "",
    courierCost: "",
  });
  const router = useRouter();

  const [createCourier, { data, error, loading }] = useMutation(
    CREATE_COURIER,
    {
      onCompleted: () => router.push("/couriers"),
      onError: (e) => alert(JSON.stringify(e.message)),
    }
  );

  return (
    // Creating Booking Registration form..
    <Container component="main" maxWidth="xs">
      <Box>
        <Typography variant="h4" fontWeight={"semibold"}>
          Courier Details
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="courierDesc"
          label="Courier Description"
          name="courier-desc"
          autoComplete="courier-desc"
          autoFocus
          value={form.courierDesc}
          onChange={(e) => setForm({ ...form, courierDesc: e.target.value })}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="courierType"
          label="Courier Type"
          name="courier-type"
          autoComplete="courier-type"
          autoFocus
          value={form.courierType}
          onChange={(e) => setForm({ ...form, courierType: e.target.value })}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="destinationAddress"
          label="Destination Address "
          name="destination-address"
          autoComplete="destination-address"
          autoFocus
          value={form.destinationAddress}
          onChange={(e) =>
            setForm({ ...form, destinationAddress: e.target.value })
          }
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="returnAddress"
          label="Return Address "
          name="Return-address"
          autoComplete="return-address"
          autoFocus
          value={form.returnAddress}
          onChange={(e) => setForm({ ...form, returnAddress: e.target.value })}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="courierStatus"
          label="Courier Status "
          name="courier-status"
          autoComplete="courier-status"
          autoFocus
          value={form.courierStatus}
          onChange={(e) => setForm({ ...form, courierStatus: e.target.value })}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="arrivalDate"
          label="Arrival Date "
          name="Arrival Date"
          autoComplete="arrrival-date"
          autoFocus
          value={form.arrivalDate}
          onChange={(e) => setForm({ ...form, arrivalDate: e.target.value })}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="courierWeight"
          label="Courier Weight "
          name="courier-weight"
          autoComplete="courier-weight"
          autoFocus
          value={form.courierWeight}
          onChange={(e) => setForm({ ...form, courierWeight: e.target.value })}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="courierCost"
          label="Courier Cost "
          name="courier-cost"
          autoComplete="courier-cost"
          autoFocus
          value={form.courierCost}
          onChange={(e) => setForm({ ...form, courierCost: e.target.value })}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          //This Piece of Code will Run when we Hit the Submit button
          onClick={async () => {
            await createCourier({
              variables: {
                input: form,
              },
              refetchQueries: [FETCH_COURIERS],
            });
            router.push("/couriers");
          }}
        >
          Create
        </Button>
      </Box>
    </Container>
  );
};

"use client";
import Link from "next/link";
import React, { FC, ReactElement } from "react";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";

export const Footer: FC = (): ReactElement => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "#1976d2;",
        color: "#fff",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        boxShadow: "border-box",
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography color="FFF" variant="h5" align="left">
              Courier Management System
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="subtitle1">
              {`${new Date().getFullYear()} | Home | About | Contact-Us`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

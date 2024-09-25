"use client";
import {
  Box,
  Container,
  Stack,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function page() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
    role: "client",
  });

  const onSignup = async () => {
    try {
      await axios.post("http://localhost:3000/api/signup", user);
      console.log("logged in");

      router.push("/");
    } catch (error) {
      console.log("Signup failed", error.message);
    }
  };

  return (
    <Container
      sx={{
        width: "100wh",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "solid gray 2px",
          borderRadius: "5px",
          padding: "20px",
        }}
      >
        <Typography> Sign Up Form</Typography>
        <Stack
          direction="row"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack>
            <Typography margin={3}>username</Typography>
            <Typography margin={3}>password</Typography>
            <Typography margin={3}>email</Typography>
          </Stack>
          <Stack spacing={2}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <TextField
              id="outlined-password-input"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <TextField
              id="outlined-basic"
              variant="outlined"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </Stack>
        </Stack>
        <Box>
          <Button
            variant="outlined"
            color="gray"
            sx={{ marginRight: 5 }}
            onClick={onSignup}
          >
            Sign up
          </Button>

          <Button variant="outlined" color="gray">
            <Link href="/login">Login</Link>
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}

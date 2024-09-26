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
import { signIn } from "next-auth/react";

export default function page() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const onLogin = async () => {
    try {
      await signIn("credentials", user);
      router.push("/admin");
    } catch (error) {
      console.log("Login failed", error.message);
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
        <Typography> Login Form</Typography>
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
          </Stack>
        </Stack>
        <Box>
          <Button variant="outlined" color="gray" sx={{ marginRight: 5 }}>
            <Link href="/signup">Sign up</Link>
          </Button>
          <Button variant="outlined" color="gray" onClick={onLogin}>
            Login
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}

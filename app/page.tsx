"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Container,
} from "@mui/material";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: { name: string };
  address: { city: string };
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress sx={{ display: "block", margin: "50px auto" }} />;

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        User Directory
      </Typography>

      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6">{user.name}</Typography>
                <Typography color="text.secondary">@{user.username}</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  📧 {user.email}
                </Typography>
                <Typography variant="body2">📞 {user.phone}</Typography>
                <Typography variant="body2">🌐 {user.website}</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  🏢 {user.company.name}
                </Typography>
                <Typography variant="body2">🏙️ {user.address.city}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

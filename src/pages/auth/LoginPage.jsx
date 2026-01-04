import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { asyncSetAuthUser } from "../../states/authUser/action";

function LoginPage() {
  const initialValues = {
    email: "",
    password: "",
  };
  const { values, handleChange } = useForm(initialValues);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = (event) => {
    event.preventDefault();
    dispatch(asyncSetAuthUser(values));

    navigate("/");
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Card variant="outlined">
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h5"
            component="h1"
            align="center"
            gutterBottom
            fontWeight="bold"
          >
            Welcome Back
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mb: 4 }}
          >
            Login to your account to continue
          </Typography>

          <Box
            component="form"
            onSubmit={onLogin}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
              value={values.email}
              onChange={handleChange}
              required
            />
            <TextField
              name="password"
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              value={values.password}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{ mt: 2 }}
              disableElevation
            >
              Login
            </Button>
          </Box>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link
                to="/register"
                style={{
                  textDecoration: "none",
                  fontWeight: 600,
                  color: "#2563eb",
                }}
              >
                Register
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default LoginPage;

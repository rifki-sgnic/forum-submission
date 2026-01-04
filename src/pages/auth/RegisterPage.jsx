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
import { asyncRegisterUser } from "../../states/users/action";

const RegisterPage = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };
  const { values, handleChange } = useForm(initialValues);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = (event) => {
    event.preventDefault();
    dispatch(
      asyncRegisterUser({
        name: values.name,
        email: values.email,
        password: values.password,
      })
    );
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
            Create Account
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mb: 4 }}
          >
            Join the community today
          </Typography>

          <Box
            component="form"
            onSubmit={onRegister}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              fullWidth
              type="text"
              value={values.name}
              onChange={handleChange}
              required
            />
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
              Register
            </Button>
          </Box>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2">
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  fontWeight: 600,
                  color: "#2563eb",
                }}
              >
                Login
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default RegisterPage;

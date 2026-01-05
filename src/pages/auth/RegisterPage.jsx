import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { asyncRegisterUser } from "../../states/users/action";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };
  const { values, handleChange } = useForm(initialValues);

  function onRegister(event) {
    event.preventDefault();
    dispatch(
      asyncRegisterUser({
        name: values.name,
        email: values.email,
        password: values.password,
      })
    );
    navigate("/");
  }

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 80px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Container maxWidth="xs">
        <Card>
          <CardContent sx={{ p: 4 }}>
            {/* Logo */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 56,
                  height: 56,
                  borderRadius: 3,
                  bgcolor: "primary.main",
                }}
              >
                <RocketLaunchIcon sx={{ color: "#fff", fontSize: 28 }} />
              </Box>
            </Box>

            <Typography
              variant="h5"
              component="h1"
              align="center"
              fontWeight={700}
              gutterBottom
            >
              Join Threads
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mb: 4 }}
            >
              Create an account to start conversations
            </Typography>

            <Box
              component="form"
              onSubmit={onRegister}
              sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
            >
              <TextField
                name="name"
                label="Full Name"
                variant="outlined"
                fullWidth
                type="text"
                value={values.name}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonRoundedIcon sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                }}
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailRoundedIcon sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                }}
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
                helperText="Use 8+ characters with a mix of letters & numbers"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockRoundedIcon sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                }}
              />

              <FormControlLabel
                control={<Checkbox />}
                label={
                  <Typography variant="caption" color="text.secondary">
                    I agree to the Terms of Service and Privacy Policy
                  </Typography>
                }
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{ py: 1.5, fontWeight: 700 }}
              >
                Create Account
              </Button>
            </Box>

            <Divider sx={{ my: 3 }}>
              <Typography variant="caption" color="text.secondary">
                or
              </Typography>
            </Divider>

            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{" "}
                <Box
                  component={Link}
                  to="/login"
                  sx={{
                    color: "primary.main",
                    textDecoration: "none",
                    fontWeight: 700,
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Sign in
                </Box>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default RegisterPage;

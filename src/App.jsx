import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import DetailPage from "./pages/DetailPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/auth/RegisterPage";
import { asyncUnsetAuthUser } from "./states/authUser/action";
import LoginPage from "./pages/auth/LoginPage";

function App() {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  return (
    <>
      <Navigation authUser={authUser} onSignOut={onSignOut} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/threads/:id" element={<DetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

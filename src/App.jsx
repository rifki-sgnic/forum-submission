import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import AddThreadPage from './pages/AddThreadPage';
import DetailPage from './pages/DetailPage';
import HomePage from './pages/HomePage';
import LeaderboardPage from './pages/LeaderboardPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import { asyncUnsetAuthUser } from './states/authUser/action';
import { asyncPreloadProcess } from './states/isPreload/action';

function App() {
  const authUser = useSelector((state) => state.authUser);
  const isPreload = useSelector((state) => state.isPreload);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  return (
    <>
      <Navigation authUser={authUser} onSignOut={onSignOut} />
      <main>
        <Routes>
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route
            path="/register"
            element={authUser ? <Navigate to="/" /> : <RegisterPage />}
          />
          <Route
            path="/new"
            element={authUser ? <AddThreadPage /> : <Navigate to="/login" />}
          />
          <Route path="/" element={<HomePage />} />
          <Route path="/threads/:id" element={<DetailPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

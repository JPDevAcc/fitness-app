// Main CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// React and other packages
import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";

// React-bootstrap components
import { Container, Row } from "react-bootstrap";

// Core network services (try not to add to this list unless necessary!)
import UserService from "./services/userService";
import UserPrefsService from "./services/userPrefsService";
import UserProfileService from "./services/userProfileService";

// Our components
import NavigationBar from "./components/navbar.component";
import Footer from "./components/footer.component";
import SingleWorkoutCard from "./components/singleWorkoutCard.component";

// Our views (pages)
import UserRegister from "./views/UserRegister";
import Login from "./views/Login";
import UserSitePrefs from "./views/UserPrefs";
import UserProfile from "./views/UserProfile";
import Dashboard from "./views/Dashboard";

// Contexts (global data)
import { UserContext } from "./contexts/User"; // Stores user-prefs and profile data
import ExerciseAPIClient from "./services/ExerciseAPIClient";

// ==============================================================================

export default function App() {
  const [state, dispatch] = React.useContext(UserContext);

  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [initComplete, changeInitComplete] = useState(false);

  const commonData = {
    net: {
      tokenProvider: () => token,
      logoutHandler: logout,
      errHandler: setError,
    },
  };

  const userService = new UserService(commonData.net);
  const navigate = useNavigate();

  function login(token) {
    window.localStorage.setItem("token", token);
    setToken(token);
  }

  // === Retrieve user data ===
  function getUserData() {
    const userPrefsService = new UserPrefsService(commonData.net);
    const userProfileService = new UserProfileService(commonData.net);
    Promise.all([
      userPrefsService.retrieve(),
      userProfileService.retrieve(),
    ]).then(([{ data: prefsData }, { data: profileData }]) => {
      console.log("SETTING INITIAL DATA FROM ENDPOINTS");
      dispatch({ type: "setPrefs", data: prefsData });
      dispatch({ type: "setProfile", data: profileData });
      if (!prefsData?.onboardingStageComplete)
        navigate("/prefs"); // Start or resume setting up site prefs
      else if (!profileData?.onboardingStageComplete) navigate("/profile"); // Start or resume setting up user profile

      changeInitComplete(true);
    });
  }

  // Get user prefs and profile info straight after login
  useEffect(() => {
    if (token) getUserData(); // Development note: This gets called twice in strict mode (which is expected behavior)
  }, [token]);

  // ==============================================================================

  function logout() {
    userService.logout();
    window.localStorage.removeItem("token");
    setToken(null);
    changeInitComplete(null);
    navigate("/");
  }

  const [msgData, setMsgData] = useState({ msg: null, type: null });

  // Error handling
  function setError(msg) {
    setMsgData({ type: "err", msg });
  }

  // Template
  return (
    <>
      <NavigationBar logout={logout} />
	  <Container fluid className="my-container">
  {initComplete && (
    <Row>
      <SingleWorkoutCard viewCommon={commonData} />
    </Row>
  )}
  <Row>
    <main>
      <Routes>
        <Route
          path="/register"
          element={<UserRegister viewCommon={commonData} />}
        />
        {initComplete && (
          <Route
            path="/prefs"
            element={
              <UserSitePrefs
                viewCommon={commonData}
                nextPage={
                  !state.prefs.onboardingStageComplete && "/profile"
                }
              />
            }
          />
        )}
        {initComplete && (
          <Route
            path="/profile"
            element={
              <UserProfile
                viewCommon={commonData}
                nextPage={!state.profile.onboardingStageComplete && "/"}
              />
            }
          />
        )}
        <Route
          path="/"
          element={
            <>
              {initComplete ? (
                <Dashboard viewCommon={commonData} />
              ) : (
                !token && <Login viewCommon={commonData} login={login} />
              )}
            </>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  </Row>
  <Footer />
</Container>
    </>
  );
}

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import UserRegister from "./views/UserRegister";
import UserService from "./services/user";
import { Container } from "react-bootstrap";
import NavigationBar from "./components/navbar.component";
import Footer from "./components/footer.component";

function App() {
  // Events retrieval and refresh
  const userService = new UserService();

  return (
    <>
      <NavigationBar />
      <Container className="my-container">
        <main>
          <Routes>
            <Route path="/register" element={<UserRegister userService={userService} />} />
          </Routes>
        </main>
      </Container>
      <Footer />
    </>
  );
}

export default App;
import { useRoutes, Navigate } from "react-router-dom";
import Navigation from "./components/navigation/GlobalNavigation";
import Footer from "./components/footer/Footer";
import OpholdPage from "./pages/ophold/OpholdPage";
import HomePage from "./pages/home/HomePage";
import ContactPage from "./pages/kontakt/ContactPage";
import ActivityPage from "./pages/aktiviteter/ActivityPage";
import MinListePage from "./pages/minliste/myListPage";
import BackofficePage from "./pages/backoffice/BackofficePage";
import BeforeBackofficePage from "./pages/beforeBackoffice/BeforeBackofficePage";
import BackofficeContactPage from "./pages/backofficeContact/BackofficeContactPage";
import StayDetailsPage from "./pages/ophold/StayDetailsPage";
import SignInPage from "./pages/backoffice/signIn/SignInPage";
import { useAuth } from "./hooks/useAuth";

const App = () => {
  const { signedIn } = useAuth(); // Tjek loginstatus

  const routes = useRoutes([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/ophold",
      element: <OpholdPage />,
    },
    {
      path: "/ophold/:id",
      element: <StayDetailsPage />,
    },
    {
      path: "/kontakt",
      element: <ContactPage />,
    },
    {
      path: "/aktiviteter",
      element: <ActivityPage />,
    },
    {
      path: "/minliste",
      element: <MinListePage />,
    },
    {
      path: "/backoffice/signin",
      element: <SignInPage />,
    },
    {
      path: "/beforeBackoffice", // ternary operator til at kontrollere, om brugeren er logget ind (signedIn)
      element: signedIn ? (
        <BeforeBackofficePage /> // hvis man er logget ind
      ) : (
        <Navigate to="/backoffice/signin" /> // hvis man ikke er
      ),
    },
    {
      path: "/backoffice",
      element: signedIn ? (
        <BackofficePage />
      ) : (
        <Navigate to="/backoffice/signin" />
      ),
    },
    {
      path: "/backofficeContact",
      element: signedIn ? (
        <BackofficeContactPage />
      ) : (
        <Navigate to="/backoffice/signin" />
      ),
    },
    {
      path: "*",
      element: <div>NOT 404 FOUND</div>,
    },
  ]);

  return (
    <>
      <Navigation />
      <div className="globale-page-wrapper">{routes}</div>
      <Footer />
    </>
  );
};

export default App;

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import CentreAide from "../pages/CentreAide";
import Documentation from "../pages/Documentation";
import Tarifs from "../pages/Tarifs";
import Confidentialite from "../pages/Confidentialite";
import Conditions from "../pages/Conditions";
import Apropos from "../pages/Apropos";
import Contact from "../pages/Contact";
import Produits from "../pages/Produits";
import Emplois from "../pages/Emplois";
import ProduitPage from "../pages/ProduitPage";
import RessourcePage from "../pages/RessourcePage";
import StatusService from "../pages/StatusService";
import Carriere from "../pages/Carriere";
import SupportAvance from "../pages/SupportAvance";
import SanteLogement from "../pages/SanteLogement";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyCode from "../pages/VerifyCode";
import ResetPassword from "../pages/ResetPassword";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import DashboardHome from "../pages/dashboard/DashboardHome";
import Profile from "../pages/dashboard/Profile";
import ProductsList from "../pages/dashboard/products/ProductsList";
import EditProduct from "../pages/dashboard/products/EditProduct";
import ViewProduct from "../pages/products/ViewProduct";
import CreateProductWizard from "../pages/dashboard/CreateProductWizard"
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
<Route path="/fichiers" element={<ProduitPage />} />
<Route path="/formations" element={<ProduitPage />} />
<Route path="/licences" element={<ProduitPage />} />
<Route path="/bundles" element={<ProduitPage />} />

<Route path="/guides" element={<RessourcePage />} />
<Route path="/support" element={<RessourcePage />} />

<Route path="/status-service" element={<StatusService />} />

<Route path="/carriere" element={<Carriere />} />

<Route path="/support-avance" element={<SupportAvance />} />

<Route path="/product/:slug" element={<ViewProduct />} />

<Route path="/dashboard" element={<DashboardLayout />}>
  <Route index element={<DashboardHome />} />
  <Route path="products" element={<ProductsList />} />
  <Route path="products/edit/:slug" element={<EditProduct />} />
  <Route path="products/view/:slug" element={<ViewProduct />} />
  <Route path="products/create" element={<CreateProductWizard />} />

</Route>

<Route path="/dashboard/Profile" element={<Profile />} />


<Route path="/centre-aide" element={<CentreAide />} />
<Route path="/documentation" element={<Documentation />} />
<Route path="/tarifs" element={<Tarifs />} />
<Route path="/confidentialite" element={<Confidentialite />} />
<Route path="/conditions" element={<Conditions />} />
<Route path="/a-propos" element={<Apropos />} />
<Route path="/contact" element={<Contact />} />
<Route path="/produits" element={<Produits />} />
<Route path="/emplois" element={<Emplois />} />
<Route path="/sante-logement" element={<SanteLogement />} />
<Route path="/"element={<Home />}/>
<Route path="/login"element={<Login />}/>
<Route path="/register"element={<Register />}/>
<Route path="/dashboard"element={<Dashboard />}/>

<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/verify-code" element={<VerifyCode />} />
<Route path="/reset-password" element={<ResetPassword />} />

</Routes>       
</BrowserRouter>
);
};
export default AppRouter;
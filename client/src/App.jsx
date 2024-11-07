import { Routes, Route } from "react-router-dom";
import "./App.scss";

/* Importing the components */
import { Header } from "./components/header/header.component";
import { HomePage } from "./pages/home.page/homepage.component";
import { SignInPage } from "./pages/sign-in.page/sign-in.page.component";
import { ShopPage } from "./pages/shop.page/shoppage.component";

const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="pages">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/signin" element={<SignInPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

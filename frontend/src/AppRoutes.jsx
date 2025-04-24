import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PredictionForm from "./pages/PredictionForm";
import Results from "./pages/Results";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 sm:pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predict" element={<PredictionForm />} />
          <Route path="/results" element={<Results />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default AppRoutes;

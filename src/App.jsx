import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import Ticker from "./components/Ticker";
import StockTicker from "./components/StockTicker";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import News from "./pages/News";
import Guides from "./pages/Guides";
import Tools from "./pages/Tools";
import CRMTools from "./pages/CRMTools";
import Newsletter from "./pages/Newsletter";
import About from "./pages/About";
import Article from "./pages/Article";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <TopBar />
      <Navbar />
      <Ticker />
      <StockTicker />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/crm-tools" element={<CRMTools />} />
        <Route path="/newsletter" element={<Newsletter />} />
        <Route path="/about" element={<About />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
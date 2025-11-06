import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";

// Pages
import { DigMaster } from "@/pages/DigMaster";
import { PumpkinQuest } from "@/pages/PumpkinQuest";
import { Home } from "@/pages/Home";

export function App() {
  return (
    <Layout>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dig_master" element={<DigMaster />} />
          <Route path="/quests" element={<PumpkinQuest />} />
        </Routes>
      </Router>
    </Layout>
  );
}

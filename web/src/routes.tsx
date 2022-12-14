import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CreateClient from "./pages/CreateClient";
import Clients from "./pages/Clients";
import Client from "./pages/Client";
import ChooseClients from "./pages/ChooseClients";
import ShowRoute from "./pages/ShowRoute";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/createClient" element={<CreateClient />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/client/:id" element={<Client />} />
      <Route path="/chooseClients" element={<ChooseClients />} />
      <Route path="/showRoute" element={<ShowRoute />} />
    </Routes>
  );
};

export default MainRoutes;

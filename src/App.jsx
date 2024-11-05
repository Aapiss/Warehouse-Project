import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TableItem from "./pages/TableItem";
import ItemDetail from "./pages/item/ItemDetail";
import UpdateItem from "./pages/item/UpdateItem";
import Items from "./pages/Items";
import Supplier from "./pages/Supplier";
import UpdateSupplier from "./pages/item/UpdateSupplier";
import SupplierDetail from "./pages/item/SupplierDetail";
import Login from "./auth/Login";
import AuthAdmin from "./auth/AuthAdmin";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* User */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/table" element={<TableItem />} />
        <Route path="/items" element={<Items />} />
        <Route path="/supplier" element={<Supplier />} />

        {/* Detail Items */}
        <Route path="detail/:id" element={<ItemDetail />} />
        <Route path="detail-supplier/:id" element={<SupplierDetail />} />

        {/* Auth Admin */}
        <Route element={<AuthAdmin />}>
          {/* Edit Items */}
          <Route path="edit/:id" element={<UpdateItem />} />
          <Route path="edit-supplier/:id" element={<UpdateSupplier />} />

          {/* Profile */}
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

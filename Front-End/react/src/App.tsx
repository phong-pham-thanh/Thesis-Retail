import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  redirect,
  Navigate,
} from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./app/store";

import Login from "./pages/login/Login";
import Manager from "./pages/manager/Main";
import Product from "./pages/manager/product/Product";
import NewImportGoods from "./pages/manager/transaction/newImportReceipt";
import NewExportGoods from "./pages/manager/transaction/newExportReceipt";
import Employee from "./pages/manager/employee/Employee";
import Dashboard from "./pages/manager/dashboard/Dashboard";
import ImportTransaction from "./pages/manager/transaction/ImportTransaction";
import ExportTransaction from "./pages/manager/transaction/ExportTransaction";
import Supplier from "./pages/manager/supplier/Supplier";
import CustomerPage from "./pages/manager/customer/CustomerPage";
import Promotion from "./pages/manager/promotion/Promotion";
import Report from "./pages/manager/report/Report";
import Register from "./pages/register/Register";
import CategoryPage from "./pages/manager/category/CategoryPage";
import PartnerPage from "./pages/manager/partner/PartnerPage";
import WarehousePage from "./pages/warehouse/WarehousePage";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/quan-ly" element={<Manager />}>
              <Route path="/quan-ly/kiemkho" element={<Product />} />
              <Route path="/quan-ly/danhmuc" element={<CategoryPage />} />
              <Route path="/quan-ly/nhanvien" element={<Employee />} />
              <Route path="/quan-ly/quan-ly-kho" element={<WarehousePage />} />
              <Route
                path="/quan-ly/nhap-hang"
                element={<ImportTransaction />}
              />
              <Route
                path="/quan-ly/nhap-hang/tao-moi"
                element={<NewImportGoods />}
              />
              <Route
                path="/quan-ly/xuat-hang"
                element={<ExportTransaction />}
              />
              <Route
                path="/quan-ly/xuat-hang/tao-moi"
                element={<NewExportGoods />}
              />
              <Route path="/quan-ly/khachhang" element={<CustomerPage />} />
              <Route path="/quan-ly/nhacungcap" element={<PartnerPage />} />
              <Route path="/quan-ly/khuyenmai" element={<Promotion />} />
              <Route path="/quan-ly/baocao" element={<Report />} />
              <Route path="/quan-ly/retail" />
              <Route path="/quan-ly/price-management" />
              <Route path="/quan-ly/bill" />
              <Route path="/quan-ly/good-transfer" />
              <Route path="/quan-ly/good-transfer/edit/:id" />

            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

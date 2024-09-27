import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { Button, Spinner } from "@nextui-org/react";
import { supabase } from "../../utils/SupaClient";
import Swal from "sweetalert2";

export default function UpdateSupplier() {
  const { id } = useParams();

  //   Loading
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const navigate = useNavigate();

  const [formEdit, setFormEdit] = useState({
    supplier_name: "",
    no_phone: 0,
    address: "",
    email: "",
    supplier_logo: "",
  });

  const handlerChange = (e) => {
    setFormEdit({
      ...formEdit,
      [e.target.name]: e.target.value,
    });
  };

  //   Get Item by ID
  const getItemById = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from("supplier")
        .select("*")
        .eq("id", id)
        .single();
      setFormEdit(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //   Update SUPPLIER
  const updateSupplier = async (e) => {
    e.preventDefault();

    setLoadingBtn(true);
    try {
      const { data } = await supabase
        .from("supplier")
        .update({
          supplier_name: formEdit.supplier_name,
          no_phone: formEdit.no_phone,
          address: formEdit.address,
          email: formEdit.email,
          supplier_logo: formEdit.supplier_logo,
        })
        .eq("id", id)
        .select();

      if (data) {
        Swal.fire({
          title: "Success",
          text: "Data has been updated",
          icon: "success",
        }).then(() => navigate("/supplier"));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingBtn(false);
    }
  };

  useEffect(() => {
    document.getElementById("title").innerHTML = "Update Supplier";
    getItemById();
  }, []);

  return (
    <Layout>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner color="secondary" label="Loading..." />
        </div>
      ) : (
        <section id="page-edit" className="p-20 py-12">
          {/* FORM UPDATE */}
          <form className="flex flex-col gap-4" onSubmit={updateSupplier}>
            <label className="text-sm font-medium text-gray-700">
              Supplier Name
              <input
                type="text"
                name="supplier_name"
                value={formEdit.supplier_name}
                onChange={handlerChange}
                className="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label className="text-sm font-medium text-gray-700">
              No. Phone
              <input
                type="number"
                name="no_phone"
                value={formEdit.no_phone}
                onChange={handlerChange}
                className="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Address
              <textarea
                type="text"
                name="address"
                value={formEdit.address}
                onChange={handlerChange}
                className="form-textarea w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="3"
              />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Email
              <input
                name="email"
                value={formEdit.email}
                onChange={handlerChange}
                type="text"
                className="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Logo Supplier
              <input
                name="supplier_logo"
                value={formEdit.supplier_logo}
                onChange={handlerChange}
                type="text"
                className="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>

            {/* Button Update & Back */}
            <div className="flex gap-2">
              <Button onClick={() => navigate("/supplier")} color="danger">
                Cancel
              </Button>

              {loadingBtn ? (
                <Button type="submit" color="warning" disabled>
                  Loading...
                </Button>
              ) : (
                <Button type="submit" color="secondary">
                  Update
                </Button>
              )}
            </div>
          </form>
        </section>
      )}
    </Layout>
  );
}

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { Button, Spinner } from "@nextui-org/react";
import { supabase } from "../../utils/SupaClient";
import Swal from "sweetalert2";

export default function UpdateItem() {
  const { id } = useParams();

  //   Loading
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const navigate = useNavigate();

  const [formEdit, setFormEdit] = useState({
    item_name: "",
    item_price: 0,
    item_type: "",
    description: "",
    item_stock: 0,
    image_item: "",
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
        .from("item")
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

  //   Update ITEM
  const updateItem = async (e) => {
    e.preventDefault();

    setLoadingBtn(true);
    try {
      const { data } = await supabase
        .from("item")
        .update({
          item_name: formEdit.item_name,
          item_price: formEdit.item_price,
          item_type: formEdit.item_type,
          description: formEdit.description,
          item_stock: formEdit.item_stock,
          image_item: formEdit.image_item,
        })
        .eq("id", id)
        .select();

      if (data) {
        Swal.fire({
          title: "Success",
          text: "Data has been updated",
          icon: "success",
        }).then(() => navigate("/table"));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingBtn(false);
    }
  };

  useEffect(() => {
    document.getElementById("title").innerHTML = "Update Item";
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
          <form className="flex flex-col gap-4" onSubmit={updateItem}>
            <label className="text-sm font-medium text-gray-700">
              Item Name
              <input
                type="text"
                name="item_name"
                value={formEdit.item_name}
                onChange={handlerChange}
                className="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Price
              <input
                type="number"
                name="item_price"
                value={formEdit.item_price}
                onChange={handlerChange}
                className="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label className="flex flex-col text-sm font-medium text-gray-700">
              Type
              <select
                name="item_type"
                onChange={handlerChange}
                value={formEdit.item_type}
                class="form-select mt-1 block w-1/2 rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="food">Food</option>
                <option value="drink">Drink</option>
              </select>
            </label>
            <label className="text-sm font-medium text-gray-700">
              Description
              <textarea
                type="text"
                name="description"
                value={formEdit.description}
                onChange={handlerChange}
                className="form-textarea w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="3"
              />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Stock
              <input
                name="item_stock"
                value={formEdit.item_stock}
                onChange={handlerChange}
                type="number"
                className="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Image
              <input
                name="image_item"
                value={formEdit.image_item}
                onChange={handlerChange}
                type="text"
                className="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>

            {/* Button Update & Back */}
            <div className="flex gap-2">
              <Button onClick={() => navigate("/table")} color="danger">
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

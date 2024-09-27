import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../../utils/SupaClient";
import useFormatRupiah from "../../hooks/useFormatRupiah";
import { Divider, Spinner } from "@nextui-org/react";

const ItemDetail = () => {
  const [itemById, setItemById] = useState({});

  const { id } = useParams();
  const { formatRupiah } = useFormatRupiah();

  const [loading, setLoading] = useState(true);

  const getIdItem = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from("item")
        .select("*")
        .eq("id", id)
        .single();
      setItemById(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getIdItem();
    document.getElementById("title").innerHTML = `Details`;
  }, []);

  return (
    <Layout>
      {loading ? (
        <Spinner color="secondary" className="m-auto" label="Loading..." />
      ) : (
        <section className="py-24 px-40">
          <div className="flex gap-16">
            <img
              src={itemById.image_item}
              alt={itemById.item_name}
              width={300}
              className="object-cover"
            />
            <div className="flex flex-col">
              <p className="text-6xl font-semibold">{itemById.item_name}</p>
              <p className="text-4xl font-bold mt-4">
                Price: {formatRupiah(itemById.item_price)}
              </p>

              <div className="my-5">
                <p className="font-bold">Description</p>
                <Divider className="my-4" />
                <p>{itemById.description}</p>
              </div>

              <div className="mb-4">
                <h2 className="font-bold mt-4">Stock</h2>
                <Divider className="my-2" />
                <span className="font-bold">{itemById.item_stock} Items</span>
              </div>

              <Link
                className="flex items-center gap-4 bg-[#D7C3F1] text-black p-2 justify-center rounded-lg transition-all duration-300 hover:bg-purple-500 hover:text-white"
                to="/table"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m4 10l-.707.707L2.586 10l.707-.707zm17 8a1 1 0 1 1-2 0zM8.293 15.707l-5-5l1.414-1.414l5 5zm-5-6.414l5-5l1.414 1.414l-5 5zM4 9h10v2H4zm17 7v2h-2v-2zm-7-7a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5z"
                  />
                </svg>
                Back
              </Link>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default ItemDetail;

import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../../utils/SupaClient";
import { Divider, Spinner } from "@nextui-org/react";

const SupplierDetail = () => {
  const [itemById, setItemById] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const getIdItem = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from("supplier")
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
        <section className="py-12 px-6 lg:px-40">
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="md:flex">
              {/* Supplier Logo */}
              <div className="md:flex-shrink-0">
                <img
                  className="h-48 w-full object-cover md:h-full md:w-48"
                  src={itemById.supplier_logo}
                  alt={itemById.supplier_name}
                />
              </div>
              <div className="p-8 flex flex-col justify-between">
                {/* Supplier Name and Contact Info */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {itemById.supplier_name}
                  </h2>
                  <p className="mt-4 text-lg font-medium text-gray-600">
                    Phone: {itemById.no_phone}
                  </p>

                  {/* Address Section */}
                  <div className="mt-6">
                    <p className="font-bold text-lg text-gray-700">Address</p>
                    <Divider className="my-2" />
                    <p className="text-gray-500">{itemById.address}</p>
                  </div>

                  {/* Email Section */}
                  <div className="mt-4">
                    <p className="font-bold text-lg text-gray-700">Email</p>
                    <Divider className="my-2" />
                    <p className="text-gray-500">{itemById.email}</p>
                  </div>
                </div>

                {/* Back Button */}
                <div className="mt-8">
                  <Link
                    to="/supplier"
                    className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-bold rounded-lg shadow-lg hover:bg-purple-700 transition duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      className="mr-2"
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
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default SupplierDetail;

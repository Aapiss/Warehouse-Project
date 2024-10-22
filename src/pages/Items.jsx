import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { supabase } from "../utils/SupaClient";
import { Spinner } from "@nextui-org/react";

const Items = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data } = await supabase.from("item").select("*");
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
    document.getElementById("title").innerHTML = "All Items";
  }, []);

  // Calculate the items to display for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout>
      <section className="p-8">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Spinner color="secondary" label="Loading..." />
          </div>
        ) : (
          <div>
            {/* Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {currentItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Image section */}
                  <img
                    src={item.image_item}
                    alt={item.item_name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2">{item.item_name}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <p className="text-sm text-gray-500 mb-1">
                      <span className="font-semibold">Type:</span>{" "}
                      {item.item_type}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Price:</span> Rp.
                      {item.item_price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center space-x-2 mt-8">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 border border-gray-300 rounded-md ${
                  currentPage === 1
                    ? "cursor-not-allowed text-gray-400"
                    : "hover:bg-gray-100 hover:border-gray-400"
                }`}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 border rounded-md ${
                    currentPage === index + 1
                      ? "bg-fuchsia-500 text-white border-fuchsia-500"
                      : "border-gray-300 text-gray-600 hover:bg-gray-100 hover:border-gray-400"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 border border-gray-300 rounded-md ${
                  currentPage === totalPages
                    ? "cursor-not-allowed text-gray-400"
                    : "hover:bg-gray-100 hover:border-gray-400"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Items;

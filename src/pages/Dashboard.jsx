import React, { useEffect, useState } from "react";
import { supabase } from "../utils/SupaClient";
import Layout from "../components/layout/Layout";
import LoadingSkeleton from "../components/ui/LoadingSkeleton";

const Dashboard = () => {
  const [item, setItem] = useState(0);
  const [countTypeItem, setCountTypeItem] = useState({});
  const [totalSuppliers, setTotalSuppliers] = useState(0); // New state for suppliers count
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);

  const totalItem = async () => {
    setLoadingSkeleton(true);

    try {
      // get total count item
      const countTotalItem = supabase
        .from("item")
        .select("*", { count: "exact", head: true });

      // get count per type item
      const typeItem = ["food", "drink"];

      const totalTypeItem = typeItem.map((type) =>
        supabase
          .from("item")
          .select("*", { count: "exact", head: true })
          .eq("item_type", type)
      );

      // Fetch total suppliers count
      const countTotalSuppliers = supabase
        .from("supplier")
        .select("*", { count: "exact", head: true });

      const res = await Promise.all([
        countTotalItem,
        ...totalTypeItem,
        countTotalSuppliers, // Include the suppliers count
      ]);

      const totalCount = res[0].count;
      let counts = {};
      res.slice(1, -1).forEach((r, i) => {
        counts[typeItem[i]] = r.count;
      });

      setItem(totalCount);
      setCountTypeItem(counts);
      setTotalSuppliers(res[res.length - 1].count); // Set the total suppliers count
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSkeleton(false);
    }
  };

  useEffect(() => {
    totalItem();
    document.getElementById("title").innerHTML = "Dashboard";
  }, []);

  return (
    <Layout>
      <section id="dashboard" className="p-10">
        <div className="bg-fuchsia-900 dark:bg-gray-700 text-white rounded-lg h-48 p-6 md:p-10 shadow-xl flex flex-col justify-center">
          <h2 className="text-2xl md:text-4xl font-semibold mb-2">
            Welcome, Admin
          </h2>
          <p className="text-sm md:text-lg">
            At Erbe Market Store, all market activities can be done.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2 w-full">
          {loadingSkeleton ? (
            <>
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
            </>
          ) : (
            <>
              <div className="p-8 h-48 rounded-lg shadow-xl bg-red-600 text-white dark:bg-gray-900">
                <h2 className="text-2xl font-bold">Total Food & Drink</h2>
                <p className="text-5xl font-bold mt-2">{item} Item</p>
              </div>
              <div className="p-8 h-48 rounded-lg shadow-xl bg-green-600 text-white dark:bg-gray-900">
                <h2 className="text-2xl font-bold">Total Food</h2>
                <p className="text-5xl font-bold mt-2">
                  {countTypeItem.food} Item
                </p>
              </div>
              <div className="p-8 h-48 rounded-lg shadow-xl bg-blue-500 text-white dark:bg-gray-900">
                <h2 className="text-2xl font-bold">Total Drink</h2>
                <p className="text-5xl font-bold mt-2">
                  {countTypeItem.drink} Item
                </p>
              </div>
              <div className="p-8 h-48 rounded-lg shadow-xl bg-yellow-500 text-white dark:bg-gray-900">
                <h2 className="text-2xl font-bold">Total Suppliers</h2>
                <p className="text-5xl font-bold mt-2">
                  {totalSuppliers} Supplier
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;

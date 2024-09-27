import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import TablePagination from "../components/ui/TablePagination";
import { supabase } from "../utils/SupaClient";
import { Spinner } from "@nextui-org/react";
import { Button, useDisclosure } from "@nextui-org/react";
import ModalAddItem from "../components/ui/ModalAddItem";

const ItemTable = () => {
  const [allItem, setAllItem] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const [filter, setFilter] = useState("all");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const getAllItem = async (filterType) => {
    setSpinner(true);
    try {
      let query = supabase.from("item").select("*");
      if (filterType && filterType !== "all") {
        query = query.eq("item_type", filterType);
      }
      const { data } = await query;

      setAllItem(data);
    } catch (error) {
      console.log(error);
    } finally {
      setSpinner(false);
    }
  };

  useEffect(() => {
    getAllItem(filter);
    document.getElementById("title").innerHTML = "Table Item";
  }, [filter]);

  return (
    <Layout>
      {spinner ? (
        <div className="flex items-center justify-center h-full">
          <Spinner color="secondary" label="Loading..." />
        </div>
      ) : (
        <section id="table" className="p-8">
          <div className="flex justify-between mb-5">
            <h2 className="text-3xl font-semibold">Table Item</h2>
            <Button color="secondary" onPress={onOpen}>
              + Add Item
            </Button>
            <ModalAddItem
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              onOpen={onOpen}
            />
          </div>
          {/* Filter buttons */}
          <div className="flex space-x-4 mb-5">
            <Button
              color={filter === "all" ? "secondary" : "default"}
              onPress={() => setFilter("all")}
            >
              All
            </Button>
            <Button
              color={filter === "food" ? "secondary" : "default"}
              onPress={() => setFilter("food")}
            >
              Food
            </Button>
            <Button
              color={filter === "drink" ? "secondary" : "default"}
              onPress={() => setFilter("drink")}
            >
              Drink
            </Button>
          </div>
          <TablePagination allItem={allItem} />
        </section>
      )}
    </Layout>
  );
};

export default ItemTable;

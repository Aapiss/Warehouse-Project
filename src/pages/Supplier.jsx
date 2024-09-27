import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { supabase } from "../utils/SupaClient";
import { Button, Spinner, useDisclosure } from "@nextui-org/react";
import TableSupplier from "../components/ui/TableSupplier";
import ModalAddSupplier from "../components/ui/ModeAddSupplier";

const Supplier = () => {
  const [allSupplier, setAllSupplier] = useState([]);

  const [spinner, setSpinner] = useState(true);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const getAllSupplier = async () => {
    setSpinner(true);
    try {
      const { data } = await supabase.from("supplier").select("*");
      setAllSupplier(data);
    } catch (error) {
      console.log(error);
    } finally {
      setSpinner(false);
    }
  };

  useEffect(() => {
    getAllSupplier();
    document.getElementById("title").innerHTML = "Supplier";
  }, []);
  return (
    <Layout>
      {spinner ? (
        <div className="flex items-center justify-center h-full">
          <Spinner color="secondary" label="Loading..." />
        </div>
      ) : (
        <section className="p-8">
          <div className="flex justify-between mb-5">
            <h2 className="text-3xl font-semibold">Supplier</h2>
            <Button color="secondary" onPress={onOpen}>
              + Add Supplier
            </Button>
            <ModalAddSupplier
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              onOpen={onOpen}
            />
          </div>
          <TableSupplier allSupplier={allSupplier} />
        </section>
      )}
    </Layout>
  );
};

export default Supplier;

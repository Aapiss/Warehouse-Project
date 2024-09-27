import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";
import { supabase } from "../../utils/SupaClient";
import Swal from "sweetalert2";

export default function ModalAddSupplier({ isOpen, onOpenChange }) {
  const [formData, setFormData] = useState({
    supplier_name: "",
    no_phone: "",
    address: "",
    email: "",
    supplier_logo: "",
  });

  const handlerChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await supabase
        .from("supplier")
        .insert(formData)
        .select();

      if (data) {
        Swal.fire({
          title: "Success",
          text: "Data has been added",
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add Supplier
            </ModalHeader>
            <form onSubmit={handlerSubmit}>
              <ModalBody>
                <label className="text-sm font-medium text-gray-700">
                  Supplier Name
                  <input
                    required
                    type="text"
                    name="supplier_name"
                    value={formData.supplier_name}
                    onChange={handlerChange}
                    className="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </label>
                <label className="text-sm font-medium text-gray-700">
                  No. Phone
                  <input
                    required
                    type="number"
                    name="no_phone"
                    value={formData.no_phone}
                    onChange={handlerChange}
                    className="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </label>
                <label className="text-sm font-medium text-gray-700">
                  Address
                  <textarea
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handlerChange}
                    className="form-textarea w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    rows="3"
                  />
                </label>
                <label className="text-sm font-medium text-gray-700">
                  Supplier Email
                  <input
                    required
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handlerChange}
                    className="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </label>
                <label className="text-sm font-medium text-gray-700">
                  Supplier Logo
                  <input
                    required
                    type="text"
                    name="supplier_logo"
                    value={formData.supplier_logo}
                    onChange={handlerChange}
                    className="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </label>
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" type="submit">
                  Add
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

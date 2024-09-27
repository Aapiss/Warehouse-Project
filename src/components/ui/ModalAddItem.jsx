import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { supabase } from "../../utils/SupaClient";
import Swal from "sweetalert2";

export default function ModalAddItem({ isOpen, onOpenChange }) {
  const [formData, setFormData] = useState({
    item_name: "",
    item_price: "",
    item_type: "",
    description: "",
    item_stock: "",
    image_item: "",
  });

  const handlerChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await supabase.from("item").insert(formData).select();

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

  const itemType = [
    {
      key: "food",
      value: "Food",
    },
    {
      key: "drink",
      value: "Drink",
    },
  ];

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add Item</ModalHeader>
            <form onSubmit={handlerSubmit}>
              <ModalBody>
                <label className="text-sm font-medium text-gray-700">
                  Item Name
                  <input
                    required
                    type="text"
                    name="item_name"
                    value={formData.item_name}
                    onChange={handlerChange}
                    className="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </label>
                <label className="text-sm font-medium text-gray-700">
                  Price
                  <input
                    required
                    type="number"
                    name="item_price"
                    value={formData.item_price}
                    onChange={handlerChange}
                    className="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </label>
                <Select
                  isRequired
                  label="Type Item"
                  placeholder="Select an Type"
                  name="item_type"
                  onChange={handlerChange}
                >
                  {itemType.map((type) => (
                    <SelectItem key={type.key} value={type.key}>
                      {type.value}
                    </SelectItem>
                  ))}
                </Select>
                <label className="text-sm font-medium text-gray-700">
                  Description
                  <textarea
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handlerChange}
                    className="form-textarea w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    rows="3"
                  />
                </label>
                <label className="text-sm font-medium text-gray-700">
                  Stock
                  <input
                    required
                    type="number"
                    name="item_stock"
                    value={formData.item_stock}
                    onChange={handlerChange}
                    className="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </label>
                <label className="text-sm font-medium text-gray-700">
                  Image Item
                  <input
                    required
                    type="text"
                    name="image_item"
                    value={formData.image_item}
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

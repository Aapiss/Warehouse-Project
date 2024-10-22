import React, { useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Tooltip,
  Button,
} from "@nextui-org/react";
import { EyeIcon } from "./icons/EyeIcon";
import { EditIcon } from "./icons/EditIcon";
import { DeleteIcon } from "./icons/DeleteIcon";
import useFormatRupiah from "../../hooks/useFormatRupiah";
import useTruncate from "../../hooks/useTruncate";
import { Link } from "react-router-dom";
import { supabase } from "../../utils/SupaClient";
import Swal from "sweetalert2";
import { useAuth } from "../../auth/AuthProvider";
import { all } from "axios";

const columns = [
  {
    key: "image_item",
    label: "IMAGE",
  },
  {
    key: "item_name",
    label: "NAME",
  },
  {
    key: "item_price",
    label: "PRICE",
  },
  {
    key: "item_type",
    label: "TYPE",
  },
  {
    key: "item_stock",
    label: "STOCK",
  },
  {
    key: "description",
    label: "DESCRIPTION",
  },
  {
    key: "action",
    label: "ACTION",
  },
];

export default function TablePagination({ allItem, search }) {
  const { user, role } = useAuth();

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const filterSearch = useMemo(() => {
    return allItem.filter((data) =>
      data.item_name.toLowerCase().includes(search.toLowerCase())
    );
  }, [allItem, search]);

  const pages = Math.ceil(filterSearch.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filterSearch.slice(start, end);
  }, [page, filterSearch]);

  const { formatRupiah } = useFormatRupiah();
  const { truncate } = useTruncate();

  // Delete Item
  const deleteBarangById = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          // Get Item Image
          const { data: getImageById } = await supabase
            .from("item")
            .select("image_item")
            .eq("id", id)
            .single();

          // Remove Image
          const removeUrlImage = String(getImageById.image_item).replace(
            "https://arhqdstuioabzeolisnj.supabase.co/storage/v1/object/public/ErbeImage/image_product/",
            ""
          );

          // Delete Image
          if (getImageById) {
            const { data: removeImage } = await supabase.storage
              .from("ErbeImage")
              .remove([`image_product/${removeUrlImage}`]);

            if (removeImage) {
              const { data } = await supabase
                .from("item")
                .delete()
                .eq("id", id)
                .select();

              if (data) {
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                }).then(() => window.location.reload());
              }
            }
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Table
      aria-label="Example table with dynamic content"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader>
        {columns.map((col) => (
          <TableColumn key={col.key}>{col.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.name}>
            {(columnKey) => (
              <TableCell key={columnKey}>
                {columnKey === "image_item" ? (
                  <img
                    src={getKeyValue(item, columnKey)}
                    alt={getKeyValue(item, "image_item")}
                    className="h-16 w-16 object-cover rounded-lg"
                  />
                ) : columnKey === "action" ? (
                  <div className="relative flex items-center gap-6">
                    {user && role === "admin" ? (
                      <>
                        <Link to={`/detail/${item.id}`}>
                          <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                              <EyeIcon />
                            </span>
                          </Tooltip>
                        </Link>
                        <Link to={`/edit/${item.id}`}>
                          <Tooltip content="Edit item">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                              <EditIcon />
                            </span>
                          </Tooltip>
                        </Link>
                        <Tooltip color="danger" content="Delete item">
                          <span
                            className="text-lg text-danger cursor-pointer active:opacity-50"
                            onClick={() => deleteBarangById(item.id)}
                          >
                            <DeleteIcon />
                          </span>
                        </Tooltip>
                      </>
                    ) : (
                      <Link to={`/detail/${item.id}`}>
                        <Button color="secondary">Details</Button>
                      </Link>
                    )}
                  </div>
                ) : columnKey === "item_price" ? (
                  formatRupiah(getKeyValue(item, columnKey))
                ) : columnKey === "item_type" ? (
                  <span className="capitalize">
                    {getKeyValue(item, columnKey)}
                  </span>
                ) : columnKey === "description" ? (
                  truncate(getKeyValue(item, columnKey), 50)
                ) : (
                  getKeyValue(item, columnKey)
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

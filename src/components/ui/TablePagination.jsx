import React from "react";
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
} from "@nextui-org/react";
import { EyeIcon } from "./icons/EyeIcon";
import { EditIcon } from "./icons/EditIcon";
import { DeleteIcon } from "./icons/DeleteIcon";
import useFormatRupiah from "../../hooks/useFormatRupiah";
import useTruncate from "../../hooks/useTruncate";
import { Link } from "react-router-dom";
import { supabase } from "../../utils/SupaClient";
import Swal from "sweetalert2";

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

export default function TablePagination({ allItem }) {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const pages = Math.ceil(allItem.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return allItem.slice(start, end);
  }, [page, allItem]);

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
        wrapper: "min-h-[222px] bg-[#EBD3F8]",
      }}
    >
      <TableHeader>
        {columns.map((col) => (
          <TableColumn key={col.key} className="bg-[#D7C3F1] text-black">
            {col.label}
          </TableColumn>
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

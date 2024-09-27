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
import { Link } from "react-router-dom";
import { supabase } from "../../utils/SupaClient";
import Swal from "sweetalert2";

const columns = [
  {
    key: "supplier_logo",
    label: "LOGO",
  },
  {
    key: "supplier_name",
    label: "NAME",
  },
  {
    key: "no_phone",
    label: "NO. PHONE",
  },
  {
    key: "address",
    label: "ADDRESS",
  },
  {
    key: "email",
    label: "EMAIL",
  },
  {
    key: "action",
    label: "ACTION",
  },
];

export default function TableSupplier({ allSupplier }) {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const pages = Math.ceil(allSupplier.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return allSupplier.slice(start, end);
  }, [page, allSupplier]);

  // Delete Item
  const deleteSupplierById = async (id) => {
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
            .from("supplier")
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
        {(supplier) => (
          <TableRow key={supplier.id || Math.random()}>
            {(columnKey) => (
              <TableCell key={columnKey}>
                {columnKey === "supplier_logo" ? (
                  <img
                    src={getKeyValue(supplier, columnKey)}
                    alt={getKeyValue(supplier, "supplier_logo")}
                    className="h-16 w-16 object-cover rounded-lg"
                  />
                ) : columnKey === "action" ? (
                  <div className="relative flex items-center gap-6">
                    <Link to={`/detail-supplier/${supplier.id}`}>
                      <Tooltip content="Details">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <EyeIcon />
                        </span>
                      </Tooltip>
                    </Link>
                    <Link to={`/edit-supplier/${supplier.id}`}>
                      <Tooltip content="Edit item">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <EditIcon />
                        </span>
                      </Tooltip>
                    </Link>
                    <Tooltip color="danger" content="Delete item">
                      <span
                        className="text-lg text-danger cursor-pointer active:opacity-50"
                        onClick={() => deleteSupplierById(supplier.id)}
                      >
                        <DeleteIcon />
                      </span>
                    </Tooltip>
                  </div>
                ) : (
                  getKeyValue(supplier, columnKey) || "N/A" // Render default value
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

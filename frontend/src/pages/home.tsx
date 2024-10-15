import React, { useEffect, useState, useCallback } from "react";
import { getOrders } from "../services/api";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { TextField, Box, CircularProgress } from "@mui/material";
import debounce from "lodash.debounce";

interface Order {
  orderID: string;
  productId: string;
  orderedOn: string;
  userId: string;
}

const Home = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filters, setFilters] = useState({
    productId: "",
    orderedOn: "",
    userId: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  // Debounced data fetching
  const fetchData = useCallback(
    debounce(async () => {
      try {
        setIsLoading(true);
        const response = await getOrders(filters);
        console.log(response);
        setOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    }, 500),
    [filters]
  );

  // Trigger fetchData when filters change
  useEffect(() => {
    fetchData();
  }, [filters, fetchData]);

  // Handle filter input change
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: e.target.value,
    }));
  };

  const columns: GridColDef[] = [
    { field: "orderID", headerName: "Order ID", width: 150 },
    { field: "productId", headerName: "Product ID", width: 150 },
    { field: "orderedOn", headerName: "Ordered On", width: 150 },
    { field: "userId", headerName: "User ID", width: 150 },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4">
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Filter Inputs */}
          <div className="mb-4">
            <TextField
              label="Filter by Product ID"
              value={filters.productId}
              onChange={(e) => handleFilterChange(e, "productId")}
              variant="outlined"
              margin="normal"
              style={{ marginRight: "10px" }}
            />
            <TextField
              label="Filter by User ID"
              value={filters.userId}
              onChange={(e) => handleFilterChange(e, "userId")}
              variant="outlined"
              margin="normal"
              style={{ marginRight: "10px" }}
            />
            <TextField
              label="Filter by Ordered On"
              value={filters.orderedOn}
              onChange={(e) => handleFilterChange(e, "orderedOn")}
              variant="outlined"
              margin="normal"
            />
          </div>

          {/* DataGrid for Orders */}
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={orders}
              columns={columns}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              slots={{ toolbar: GridToolbar }}
              getRowId={(row) => row.orderID}
              disableRowSelectionOnClick
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;

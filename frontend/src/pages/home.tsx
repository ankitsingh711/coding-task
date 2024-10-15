import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { getOrders } from '../services/api';
import { useTable, Column, useFilters } from 'react-table';

interface Order {
  orderID: string;
  productId: string;
  orderedOn: string;
  userId: string;
}

const Home = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filters, setFilters] = useState({
    address: '',
    productId: '',
    orderedOn: '',
    userId: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getOrders(filters);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData, filters]);

  const columns: Column<Order>[] = useMemo(() => [
    { Header: 'Order ID', accessor: 'orderID' },
    { Header: 'Product ID', accessor: 'productId' },
    { Header: 'Ordered On', accessor: 'orderedOn' },
    { Header: 'User ID', accessor: 'userId' },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
  } = useTable(
    {
      columns,
      data: orders,
      initialState: { filters: [] },
    },
    useFilters
  );

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>, columnId: string) => {
    const value = e.target.value;
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters, [columnId]: value };
      return newFilters;
    });
    setFilter(columnId, value); 
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {isLoading ? (
        <p>Loading orders...</p>
      ) : (
        <>
          {/* Filter Inputs */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Filter by Product ID"
              value={filters.productId}
              onChange={(e) => handleFilterChange(e, 'productId')}
              className="mr-2 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Filter by User ID"
              value={filters.userId}
              onChange={(e) => handleFilterChange(e, 'userId')}
              className="mr-2 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Filter by Ordered On"
              value={filters.orderedOn}
              onChange={(e) => handleFilterChange(e, 'orderedOn')}
              className="mr-2 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Filter by Address"
              value={filters.address}
              onChange={(e) => handleFilterChange(e, 'address')}
              className="p-2 border rounded"
            />
          </div>

          <table {...getTableProps()} className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()} className="px-4 py-2 text-left border-b">
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <td {...cell.getCellProps()} className="px-4 py-2 border-b">{cell.render('Cell')}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Home;

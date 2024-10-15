import React, { useEffect, useState } from 'react';
import { getOrders } from '../services/api';
import { useTable, Column } from 'react-table';

// Define the type for your order data
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

  useEffect(() => {
    const fetchData = async () => {
      const response = await getOrders(filters);
      setOrders(response.data);
    };
    fetchData();
  }, [filters]);

  // Explicitly type the columns array
  const columns: Column<Order>[] = [
    { Header: 'Order ID', accessor: 'orderID' },
    { Header: 'Product ID', accessor: 'productId' },
    { Header: 'Ordered On', accessor: 'orderedOn' },
    { Header: 'User ID', accessor: 'userId' },
  ];

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: orders,
  });

  return (
    <div className="max-w-7xl mx-auto p-4">
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
    </div>
  );
};

export default Home;

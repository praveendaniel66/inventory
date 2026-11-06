import React, { useState, useEffect } from 'react';
import Table from '../common/Table';
import Alert from '../common/Alert';
import { getSalesOrders } from '../../api/api';
// Assuming you have an API utility for making requests
// import { getSalesByDateRange } from '../../api/api';

const SalesReport = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: '',
  });

  const fetchSalesData = async () => {
    try {
      setLoading(true);
      // Placeholder for an API call to get sales data
      // const response = await getSalesByDateRange(dateRange.startDate, dateRange.endDate);
      const data = await getSalesOrders();
      const start = dateRange.startDate ? new Date(dateRange.startDate) : null;
      const end = dateRange.endDate ? new Date(`${dateRange.endDate}T23:59:59`) : null;
      setSales(data.filter((order) => {
        const date = new Date(order.createdAt || order.date);
        return (!start || date >= start) && (!end || date <= end);
      }).map((order) => ({
        ...order,
        customerName: order.customer?.name || order.customer || 'Farm customer',
        totalAmount: order.totalAmount || order.total || 0,
        date: new Date(order.createdAt || order.date).toLocaleDateString('en-IN')
      })));
      setError(null);
    } catch (err) {
      console.error('Error fetching sales report:', err);
      setError(err.message || 'Failed to fetch sales data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch data on initial load
    fetchSalesData();
    // The report fetch is intentionally triggered once on mount and on explicit filter submission.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({ ...prev, [name]: value }));
  };

  const handleFilter = (e) => {
    e.preventDefault();
    fetchSalesData();
  };

  const columns = [
    { header: 'Order ID', accessor: '_id' },
    { header: 'Customer', accessor: 'customerName' },
    { header: 'Total Amount', accessor: 'totalAmount' },
    { header: 'Date', accessor: 'date' },
  ];

  if (loading) {
    return <div className="loading-state">Loading sales report...</div>;
  }

  if (error) {
    return <Alert type="error" message={error} />;
  }

  return (
    <div className="report-container">
      <h3 className="section-heading">Sales Report</h3>
      <form onSubmit={handleFilter} className="report-filter-form">
        <div className="form-group-inline">
          <label htmlFor="startDate">From:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            className="form-input-inline"
            value={dateRange.startDate}
            onChange={handleDateChange}
          />
        </div>
        <div className="form-group-inline">
          <label htmlFor="endDate">To:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            className="form-input-inline"
            value={dateRange.endDate}
            onChange={handleDateChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Filter</button>
      </form>
      {sales.length > 0 ? (
        <Table columns={columns} data={sales} />
      ) : (
        <Alert type="info" message="No sales found for the selected date range." />
      )}
    </div>
  );
};

export default SalesReport;

import React, { useState } from 'react';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import StockSummaryReport from '../components/reports/StockSummaryReport';
import SalesReport from '../components/reports/SalesReport';
import Alert from '../components/common/Alert';

const ReportsPage = () => {
  const [reportType, setReportType] = useState('stock-summary'); // 'stock-summary' or 'sales-report'

  const handleReportChange = (e) => {
    setReportType(e.target.value);
  };

  const renderReport = () => {
    switch (reportType) {
      case 'stock-summary':
        return <StockSummaryReport />;
      case 'sales-report':
        return <SalesReport />;
      default:
        return <Alert type="warning" message="Please select a report type." />;
    }
  };

  return (
    <div className="app-layout">
      <Header />
      <Sidebar />
      <main className="content-area">
        <div className="page-intro">
          <div>
            <span className="eyebrow">Operational intelligence</span>
            <h2 className="page-heading">Business Reports</h2>
            <p className="page-subtitle">Track machinery availability, reorder risk, and farmer orders.</p>
          </div>
        </div>
        <div className="report-shell">
          <div className="report-selector-container">
            <label htmlFor="report-type">Report view</label>
          <select id="report-type" className="form-input-select" value={reportType} onChange={handleReportChange}>
            <option value="stock-summary">Stock Summary</option>
            <option value="sales-report">Sales Report</option>
          </select>
          </div>

          <div className="report-display-area">
            {renderReport()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReportsPage;

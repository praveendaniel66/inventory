import React, { useEffect, useMemo, useState } from 'react';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import Alert from '../components/common/Alert';
import Modal from '../components/common/Modal';
import Table from '../components/common/Table';
import { createEmployee, createSalaryPayment, deleteEmployee, getEmployees, getSalaryPayments } from '../api/api';

const EmployeeSalaryPage = () => {
  const [employees, setEmployees] = useState([]);
  const [payments, setPayments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', role: '', department: '', phone: '', monthlySalary: '', location: '' });
  const [error, setError] = useState('');

  const refresh = async () => {
    setEmployees(await getEmployees());
    setPayments(await getSalaryPayments());
  };
  useEffect(() => { refresh(); }, []);

  const totalPayroll = useMemo(() => employees.reduce((sum, employee) => sum + Number(employee.monthlySalary || 0), 0), [employees]);
  const paidThisMonth = payments.filter((payment) => payment.month === '2026-10' && payment.status === 'Paid').length;
  const updateForm = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const addEmployee = async (event) => {
    event.preventDefault();
    if (!form.name || !form.role || !form.monthlySalary) {
      setError('Employee name, role and monthly salary are required.');
      return;
    }
    await createEmployee({ ...form, monthlySalary: Number(form.monthlySalary), joiningDate: new Date().toISOString().slice(0, 10) });
    setForm({ name: '', role: '', department: '', phone: '', monthlySalary: '', location: '' });
    setShowForm(false);
    setError('');
    refresh();
  };
  const markPaid = async (employee) => {
    await createSalaryPayment({ employeeId: employee._id, month: '2026-11', amount: Number(employee.monthlySalary), status: 'Paid', paidOn: new Date().toISOString().slice(0, 10) });
    refresh();
  };
  const removeEmployee = async (id) => {
    await deleteEmployee(id);
    refresh();
  };
  const employeeRows = employees.map((employee) => ({
    ...employee,
    monthlySalary: `₹${Number(employee.monthlySalary).toLocaleString('en-IN')}`,
    actions: <div className="action-buttons"><button className="btn btn-primary btn-sm" onClick={() => markPaid(employee)}>Mark paid</button><button className="btn btn-secondary btn-sm" onClick={() => removeEmployee(employee._id)}>Remove</button></div>
  }));
  const columns = [
    { header: 'Employee', accessor: 'name' }, { header: 'Role', accessor: 'role' },
    { header: 'Department', accessor: 'department' }, { header: 'Location', accessor: 'location' },
    { header: 'Monthly Salary', accessor: 'monthlySalary' }, { header: 'Actions', accessor: 'actions' }
  ];

  return (
    <div className="app-layout">
      <Header />
      <Sidebar />
      <main className="content-area">
        <div className="page-intro">
          <div><span className="eyebrow">People & payroll</span><h2 className="page-heading">Employee Salaries</h2><p className="page-subtitle">Manage the team that builds, services and delivers farmer-supporting machinery.</p></div>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>Add employee</button>
        </div>
        {error && <Alert type="error" message={error} />}
        <div className="summary-cards">
          <div className="card"><h4>Team members</h4><p className="card-metric">{employees.length}</p><span className="metric-note">Active employees</span></div>
          <div className="card"><h4>Monthly payroll</h4><p className="card-metric">₹{totalPayroll.toLocaleString('en-IN')}</p><span className="metric-note">Current gross salary</span></div>
          <div className="card"><h4>Paid last month</h4><p className="card-metric">{paidThisMonth}/{employees.length}</p><span className="metric-note">October payroll</span></div>
          <div className="card"><h4>Departments</h4><p className="card-metric">{new Set(employees.map((employee) => employee.department)).size}</p><span className="metric-note">Across Tamil Nadu</span></div>
        </div>
        <Table columns={columns} data={employeeRows} />
        {showForm && <Modal show title="Add employee" onClose={() => setShowForm(false)}><form className="form-container" onSubmit={addEmployee}>
          <div className="form-row"><div className="form-group"><label htmlFor="employee-name">Full name</label><input id="employee-name" name="name" className="form-input" value={form.name} onChange={updateForm} required /></div><div className="form-group"><label htmlFor="employee-role">Role</label><input id="employee-role" name="role" className="form-input" value={form.role} onChange={updateForm} required /></div></div>
          <div className="form-row"><div className="form-group"><label htmlFor="employee-department">Department</label><input id="employee-department" name="department" className="form-input" value={form.department} onChange={updateForm} /></div><div className="form-group"><label htmlFor="employee-location">Location</label><input id="employee-location" name="location" className="form-input" value={form.location} onChange={updateForm} placeholder="Coimbatore" /></div></div>
          <div className="form-row"><div className="form-group"><label htmlFor="employee-phone">Phone</label><input id="employee-phone" name="phone" className="form-input" value={form.phone} onChange={updateForm} /></div><div className="form-group"><label htmlFor="employee-salary">Monthly salary (₹)</label><input id="employee-salary" name="monthlySalary" type="number" min="0" className="form-input" value={form.monthlySalary} onChange={updateForm} required /></div></div>
          <div className="form-actions"><button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button><button type="submit" className="btn btn-primary">Save employee</button></div>
        </form></Modal>}
      </main>
    </div>
  );
};

export default EmployeeSalaryPage;

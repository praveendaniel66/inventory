const STORAGE_KEY = 'stockwise_local_data_v1';

const today = new Date();
const isoDate = (daysAgo = 0) => {
  const date = new Date(today);
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

const seedData = {
  products: [
    { _id: 'p-1', name: 'Kaveri Mini Power Tiller', sku: 'KAV-PT-10', barcode: '890100000001', category: 'Tillage Equipment', supplier: 'Sri Venkateswara Agro Machines', description: 'Compact tiller for small farms and vegetable beds.', quantity: 18, price: 68500, costPrice: 54200, reorderLevel: 5, reorderQuantity: 10, uom: 'pieces', isActive: true, specifications: { brand: 'Kaveri', model: 'PT-10', material: 'Cast iron and steel' } },
    { _id: 'p-2', name: 'Vaigai Paddy Thresher', sku: 'VAI-TH-24', barcode: '890100000002', category: 'Harvesting Equipment', supplier: 'Greenfield Implements', description: 'Low-maintenance thresher for paddy and millets.', quantity: 7, price: 124000, costPrice: 98000, reorderLevel: 3, reorderQuantity: 5, uom: 'pieces', isActive: true, specifications: { brand: 'Vaigai', model: 'TH-24', material: 'Powder-coated steel' } },
    { _id: 'p-3', name: 'Cauvery Paddy Transplanter', sku: 'CAU-TP-06', barcode: '890100000003', category: 'Planting Equipment', supplier: 'Sri Venkateswara Agro Machines', description: 'Six-row transplanter for delta-region paddy farms.', quantity: 4, price: 245000, costPrice: 205000, reorderLevel: 5, reorderQuantity: 6, uom: 'pieces', isActive: true, specifications: { brand: 'Cauvery', model: 'TP-06', material: 'Stainless steel' } },
    { _id: 'p-4', name: 'Kongu Solar Sprayer', sku: 'KON-SS-16', barcode: '890100000004', category: 'Crop Care', supplier: 'Kongu Farm Solutions', description: 'Battery and solar-assisted sprayer for cotton and turmeric.', quantity: 26, price: 18500, costPrice: 12900, reorderLevel: 8, reorderQuantity: 20, uom: 'pieces', isActive: true, specifications: { brand: 'Kongu', model: 'SS-16', material: 'HDPE and aluminium' } },
    { _id: 'p-5', name: 'Marutham Chaff Cutter', sku: 'MAR-CC-08', barcode: '890100000005', category: 'Dairy Equipment', supplier: 'Greenfield Implements', description: 'Safe fodder cutter for dairy and goat farms.', quantity: 3, price: 32000, costPrice: 24600, reorderLevel: 6, reorderQuantity: 12, uom: 'pieces', isActive: true, specifications: { brand: 'Marutham', model: 'CC-08', material: 'Mild steel' } },
    { _id: 'p-6', name: 'Thamirabarani Seed Drill', sku: 'THA-SD-09', barcode: '890100000006', category: 'Planting Equipment', supplier: 'Kongu Farm Solutions', description: 'Seed and fertilizer drill for groundnut and pulses.', quantity: 11, price: 56000, costPrice: 41700, reorderLevel: 4, reorderQuantity: 8, uom: 'pieces', isActive: true, specifications: { brand: 'Thamirabarani', model: 'SD-09', material: 'Steel and polymer' } }
  ],
  customers: [
    { _id: 'c-1', name: 'R. Murugan Farms', email: 'murugan.farms@example.com', phone: '98421 44321', address: 'Kumbakonam, Thanjavur, Tamil Nadu' },
    { _id: 'c-2', name: 'Meenakshi Agro Centre', email: 'meenakshi.agro@example.com', phone: '97877 22661', address: 'Dindigul, Tamil Nadu' },
    { _id: 'c-3', name: 'Selvam Coconut Growers', email: 'selvam.growers@example.com', phone: '94432 11890', address: 'Pollachi, Coimbatore, Tamil Nadu' }
  ],
  suppliers: [
    { _id: 's-1', name: 'Sri Venkateswara Agro Machines', contactPerson: 'S. Prakash', email: 'prakash@svagro.example.com', phone: '98430 11223', address: 'Hosur, Krishnagiri, Tamil Nadu' },
    { _id: 's-2', name: 'Greenfield Implements', contactPerson: 'A. Kavitha', email: 'kavitha@greenfield.example.com', phone: '98945 77881', address: 'Trichy, Tamil Nadu' },
    { _id: 's-3', name: 'Kongu Farm Solutions', contactPerson: 'M. Senthil', email: 'senthil@kongufarm.example.com', phone: '93610 44556', address: 'Erode, Tamil Nadu' }
  ],
  categories: [
    { _id: 'cat-1', name: 'Tillage Equipment' }, { _id: 'cat-2', name: 'Harvesting Equipment' },
    { _id: 'cat-3', name: 'Planting Equipment' }, { _id: 'cat-4', name: 'Crop Care' }, { _id: 'cat-5', name: 'Dairy Equipment' }
  ],
  warehouses: [{ _id: 'w-1', name: 'Chennai Main Warehouse', location: 'Ambattur, Chennai' }, { _id: 'w-2', name: 'Coimbatore Service Yard', location: 'Sulur, Coimbatore' }],
  users: [{ _id: 'u-1', name: 'Arun Kumar', email: 'arun@stockwise.local', role: 'admin' }, { _id: 'u-2', name: 'Divya Lakshmi', email: 'divya@stockwise.local', role: 'manager' }],
  employees: [
    { _id: 'e-1', name: 'Arun Kumar', role: 'Operations Manager', department: 'Operations', phone: '98401 22011', monthlySalary: 42000, joiningDate: '2022-06-15', location: 'Chennai' },
    { _id: 'e-2', name: 'Divya Lakshmi', role: 'Accounts Executive', department: 'Finance', phone: '97890 33122', monthlySalary: 31500, joiningDate: '2023-02-01', location: 'Coimbatore' },
    { _id: 'e-3', name: 'M. Senthil', role: 'Service Technician', department: 'Workshop', phone: '93610 44556', monthlySalary: 28000, joiningDate: '2023-08-20', location: 'Erode' },
    { _id: 'e-4', name: 'P. Kavitha', role: 'Sales Coordinator', department: 'Sales', phone: '98945 77881', monthlySalary: 26500, joiningDate: '2024-01-08', location: 'Trichy' }
  ],
  salaryPayments: [
    { _id: 'pay-1', employeeId: 'e-1', month: '2026-10', amount: 42000, status: 'Paid', paidOn: '2026-10-31' },
    { _id: 'pay-2', employeeId: 'e-2', month: '2026-10', amount: 31500, status: 'Paid', paidOn: '2026-10-31' },
    { _id: 'pay-3', employeeId: 'e-3', month: '2026-10', amount: 28000, status: 'Paid', paidOn: '2026-10-31' }
  ],
  salesOrders: [{ _id: 'so-1', customer: 'R. Murugan Farms', totalAmount: 68500, status: 'Completed', createdAt: isoDate(1) }],
  purchaseOrders: [{ _id: 'po-1', supplier: 'Sri Venkateswara Agro Machines', totalAmount: 542000, status: 'Received', createdAt: isoDate(4) }]
};

const clone = (value) => JSON.parse(JSON.stringify(value));
const readStore = () => {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
    return clone(seedData);
  }
  return JSON.parse(stored);
};
const writeStore = (store) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  return store;
};
const collection = (name) => readStore()[name] || [];
const all = (name) => Promise.resolve(clone(collection(name)));
const create = (name, value) => {
  const store = readStore();
  const item = { ...value, _id: value._id || `${name.slice(0, -1)}-${Date.now()}` };
  store[name] = [...(store[name] || []), item];
  writeStore(store);
  return Promise.resolve(clone(item));
};
const update = (name, id, value) => {
  const store = readStore();
  const item = { ...(store[name] || []).find((entry) => entry._id === id), ...value, _id: id };
  store[name] = (store[name] || []).map((entry) => entry._id === id ? item : entry);
  writeStore(store);
  return Promise.resolve(clone(item));
};
const remove = (name, id) => {
  const store = readStore();
  store[name] = (store[name] || []).filter((entry) => entry._id !== id);
  writeStore(store);
  return Promise.resolve({ success: true });
};

export const getProducts = () => all('products');
export const getLowStockProducts = () => all('products').then((items) => items.filter((item) => item.quantity <= item.reorderLevel));
export const getExpiringProducts = () => Promise.resolve([]);
export const createProduct = (data) => create('products', data);
export const updateProduct = (id, data) => update('products', id, data);
export const createProductVariant = async (productId, data) => {
  const product = collection('products').find((item) => item._id === productId);
  const variants = product?.variants || [];
  const variant = { ...data, _id: `variant-${Date.now()}`, price: Number(data.price || 0), currentStock: Number(data.currentStock || 0) };
  await update('products', productId, { variants: [...variants, variant] });
  return variant;
};
export const updateProductVariant = async (productId, variantId, data) => {
  const product = collection('products').find((item) => item._id === productId);
  const variants = (product?.variants || []).map((variant) => variant._id === variantId ? { ...variant, ...data, price: Number(data.price || 0), currentStock: Number(data.currentStock || 0) } : variant);
  await update('products', productId, { variants });
  return variants.find((variant) => variant._id === variantId);
};
export const deleteProduct = (id) => remove('products', id);
export const getCustomers = () => all('customers');
export const createCustomer = (data) => create('customers', data);
export const updateCustomer = (id, data) => update('customers', id, data);
export const deleteCustomer = (id) => remove('customers', id);
export const getSuppliers = () => all('suppliers');
export const createSupplier = (data) => create('suppliers', data);
export const updateSupplier = (id, data) => update('suppliers', id, data);
export const getCategories = () => all('categories');
export const getWarehouses = () => all('warehouses');
export const getUsers = () => all('users');
export const updateUserRole = (id, data) => update('users', id, data);
export const getEmployees = () => all('employees');
export const createEmployee = (data) => create('employees', data);
export const updateEmployee = (id, data) => update('employees', id, data);
export const deleteEmployee = (id) => remove('employees', id);
export const getSalaryPayments = () => all('salaryPayments');
export const createSalaryPayment = (data) => create('salaryPayments', data);
export const updateSalaryPayment = (id, data) => update('salaryPayments', id, data);
export const createPurchaseOrder = (data) => create('purchaseOrders', { ...data, status: data.status || 'Draft', createdAt: new Date().toISOString() });
export const createSalesOrder = (data) => create('salesOrders', { ...data, status: data.status || 'Completed', createdAt: new Date().toISOString() });
export const getPurchaseOrders = () => all('purchaseOrders');
export const getSalesOrders = () => all('salesOrders');
export const getPurchaseOrder = async (id) => collection('purchaseOrders').find((order) => order._id === id) || null;
export const processGRN = async (purchaseOrderId, receivedItems) => {
  const order = await getPurchaseOrder(purchaseOrderId);
  if (!order) throw new Error('Purchase order not found.');
  const store = readStore();
  (order.items || []).forEach((item) => {
    const productId = item.productId || item._id;
    const product = (store.products || []).find((entry) => entry._id === productId);
    if (product) product.quantity = Number(product.quantity || 0) + Number(receivedItems[item._id] || 0);
  });
  store.purchaseOrders = (store.purchaseOrders || []).map((entry) => entry._id === purchaseOrderId ? { ...entry, status: 'Received' } : entry);
  writeStore(store);
  return order;
};
export const getDashboardSummary = async () => {
  const products = collection('products');
  const sales = collection('salesOrders');
  const lowStock = products.filter((item) => item.quantity <= item.reorderLevel);
  return {
    summary: { totalProducts: products.length, lowStockCount: lowStock.length, todaySales: sales.reduce((sum, item) => sum + Number(item.totalAmount || 0), 0), todayOrders: sales.length },
    chartData: products.slice(0, 7).map((item, index) => ({ _id: isoDate(index), totalSales: Number(item.price || 0) * Math.max(1, 7 - index) })),
    topProducts: lowStock.slice(0, 5)
  };
};
export const adjustStock = async (id, data) => {
  const product = collection('products').find((item) => item._id === id);
  return update('products', id, { quantity: Math.max(0, Number(product?.quantity || 0) + Number(data.quantity || data.adjustment || 0)) });
};
export const exportInventory = async () => {
  const products = collection('products');
  return [Object.keys(products[0] || {}).join(','), ...products.map((item) => Object.values(item).map((value) => `"${String(value).replaceAll('"', '""')}"`).join(','))].join('\n');
};
export const getCurrentUser = async () => ({ name: 'Arun Kumar', role: 'admin' });
export const loginUser = async () => getCurrentUser();
export const registerUser = async (data) => ({ user: { name: data.name || 'Arun Kumar' } });
export const logoutUser = async () => ({ success: true });

const apiMethods = { getProducts, getCustomers, getSuppliers, getDashboardSummary, createProduct, updateProduct, createCustomer, updateCustomer };
export default apiMethods;

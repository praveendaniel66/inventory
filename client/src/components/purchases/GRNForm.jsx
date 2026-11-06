import React, { useState, useEffect } from 'react';
import Alert from '../common/Alert';
import Modal from '../common/Modal';
import Table from '../common/Table';
import { getPurchaseOrder, processGRN } from '../../api/api';

const GRNForm = ({ purchaseOrderId, onClose, onProcess }) => {
  const [purchaseOrder, setPurchaseOrder] = useState(null);
  const [receivedItems, setReceivedItems] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const fetchPurchaseOrder = async () => {
      try {
        setLoading(true);
        const po = await getPurchaseOrder(purchaseOrderId);
        if (!po) throw new Error('Purchase order not found.');
        const normalizedOrder = { ...po, supplier: { name: po.supplier?.name || po.supplier || 'Supplier' }, items: (po.items || []).map((item, index) => ({ ...item, _id: item._id || `${po._id}-item-${index}` })) };
        setPurchaseOrder(normalizedOrder);

        const initialReceived = {};
        normalizedOrder.items.forEach(item => {
          initialReceived[item._id] = item.quantity;
        });
        setReceivedItems(initialReceived);
        setError(null);
      } catch (err) {
        console.error('Error fetching purchase order:', err);
        setError(err.message || 'Failed to load purchase order details.');
      } finally {
        setLoading(false);
      }
    };
    fetchPurchaseOrder();
  }, [purchaseOrderId]);

  const handleQuantityChange = (itemId, quantity) => {
    setReceivedItems(prev => ({
      ...prev,
      [itemId]: Number(quantity),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);

    try {
      await processGRN(purchaseOrderId, receivedItems);
      onProcess();
      onClose();
    } catch (err) {
      console.error('GRN processing error:', err);
      setError(err.message || 'An error occurred while processing the GRN.');
    } finally {
      setProcessing(false);
    }
  };

  const itemColumns = [
    { header: 'Product Name', accessor: 'name' },
    { header: 'SKU', accessor: 'sku' },
    { header: 'Ordered Quantity', accessor: 'quantity' },
    { header: 'Received Quantity', accessor: 'received' },
  ];

  const itemsWithReceivedQuantity = purchaseOrder?.items.map(item => ({
    ...item,
    received: (
      <input
        type="number"
        className="form-input-table"
        value={receivedItems[item._id] || 0}
        onChange={(e) => handleQuantityChange(item._id, e.target.value)}
        min="0"
        max={item.quantity}
      />
    ),
  }));

  if (loading) {
    return <div className="loading-state">Loading purchase order details...</div>;
  }

  if (error) {
    return <Alert type="error" message={error} />;
  }

  return (
    <Modal show={true} title={`Process GRN for PO: ${purchaseOrder?._id}`} onClose={onClose}>
      <form onSubmit={handleSubmit} className="form-container">
        {error && <Alert type="error" message={error} />}
        <h4 className="section-heading">Supplier: {purchaseOrder?.supplier.name}</h4>
        
        {purchaseOrder?.items.length > 0 ? (
          <Table columns={itemColumns} data={itemsWithReceivedQuantity} />
        ) : (
          <Alert type="warning" message="This purchase order has no items." />
        )}
        
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={processing}>
            {processing ? 'Processing...' : 'Process GRN'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={processing}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default GRNForm;

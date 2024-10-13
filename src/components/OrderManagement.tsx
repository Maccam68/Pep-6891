import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface Customer {
  id: number;
  name: string;
}

interface Peptide {
  id: number;
  name: string;
}

interface OrderItem {
  peptideId: number;
  quantity: number;
}

interface Order {
  id: number;
  customerId: number;
  items: OrderItem[];
  status: 'Pending' | 'Shipped' | 'Delivered';
}

const OrderManagement: React.FC = () => {
  const [customers] = useState<Customer[]>([
    { id: 1, name: 'Lab Corp' },
    { id: 2, name: 'BioTech Inc' },
  ]);

  const [peptides] = useState<Peptide[]>([
    { id: 1, name: 'Peptide A' },
    { id: 2, name: 'Peptide B' },
  ]);

  const [orders, setOrders] = useState<Order[]>([
    { id: 1, customerId: 1, items: [{ peptideId: 1, quantity: 50 }], status: 'Pending' },
    { id: 2, customerId: 2, items: [{ peptideId: 2, quantity: 75 }], status: 'Shipped' },
  ]);

  const [newOrder, setNewOrder] = useState<{
    customerId: number;
    items: OrderItem[];
  }>({
    customerId: 0,
    items: [{ peptideId: 0, quantity: 0 }],
  });

  const addOrder = () => {
    if (newOrder.customerId && newOrder.items.length > 0 && newOrder.items[0].peptideId && newOrder.items[0].quantity > 0) {
      setOrders([...orders, { id: Date.now(), ...newOrder, status: 'Pending' }]);
      setNewOrder({ customerId: 0, items: [{ peptideId: 0, quantity: 0 }] });
    }
  };

  const removeOrder = (id: number) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  const addOrderItem = () => {
    setNewOrder({
      ...newOrder,
      items: [...newOrder.items, { peptideId: 0, quantity: 0 }],
    });
  };

  const updateOrderItem = (index: number, field: keyof OrderItem, value: number) => {
    const updatedItems = newOrder.items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setNewOrder({ ...newOrder, items: updatedItems });
  };

  const removeOrderItem = (index: number) => {
    const updatedItems = newOrder.items.filter((_, i) => i !== index);
    setNewOrder({ ...newOrder, items: updatedItems });
  };

  const updateOrderStatus = (id: number, newStatus: Order['status']) => {
    setOrders(orders.map(order =>
      order.id === id ? { ...order, status: newStatus } : order
    ));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Order Management</h2>
      <div className="mb-4">
        <select
          className="border p-2 mr-2"
          value={newOrder.customerId}
          onChange={(e) => setNewOrder({ ...newOrder, customerId: parseInt(e.target.value) })}
        >
          <option value={0}>Select Customer</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>{customer.name}</option>
          ))}
        </select>
        {newOrder.items.map((item, index) => (
          <div key={index} className="flex items-center mt-2">
            <select
              className="border p-2 mr-2"
              value={item.peptideId}
              onChange={(e) => updateOrderItem(index, 'peptideId', parseInt(e.target.value))}
            >
              <option value={0}>Select Peptide</option>
              {peptides.map((peptide) => (
                <option key={peptide.id} value={peptide.id}>{peptide.name}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Quantity"
              className="border p-2 mr-2 w-24"
              value={item.quantity}
              onChange={(e) => updateOrderItem(index, 'quantity', parseInt(e.target.value))}
            />
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => removeOrderItem(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          onClick={addOrderItem}
        >
          Add Peptide
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mt-2 ml-2 flex items-center"
          onClick={addOrder}
        >
          <Plus className="mr-2" /> Add Order
        </button>
      </div>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Customer</th>
            <th className="border p-2">Peptides</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="border p-2">{customers.find(c => c.id === order.customerId)?.name}</td>
              <td className="border p-2">
                {order.items.map((item, index) => (
                  <div key={index}>
                    {peptides.find(p => p.id === item.peptideId)?.name}: {item.quantity}
                  </div>
                ))}
              </td>
              <td className="border p-2">
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                  className="border p-1 rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
              <td className="border p-2">
                <button
                  className="text-red-500"
                  onClick={() => removeOrder(order.id)}
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;
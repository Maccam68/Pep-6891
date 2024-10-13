import React, { useState } from 'react';
import { Plus, Edit, Save, Trash2 } from 'lucide-react';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

const CustomerManagement: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    { id: 1, name: 'Lab Corp', email: 'contact@labcorp.com', phone: '123-456-7890', address: '123 Lab St, Science City, SC 12345' },
    { id: 2, name: 'BioTech Inc', email: 'info@biotechinc.com', phone: '987-654-3210', address: '456 Bio Ave, Tech Town, TT 67890' },
  ]);
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '', address: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  const addCustomer = () => {
    if (newCustomer.name && newCustomer.email) {
      setCustomers([...customers, { id: Date.now(), ...newCustomer }]);
      setNewCustomer({ name: '', email: '', phone: '', address: '' });
    }
  };

  const startEditing = (id: number) => {
    setEditingId(id);
  };

  const saveEdit = () => {
    setEditingId(null);
  };

  const handleChange = (id: number, field: keyof Customer, value: string) => {
    setCustomers(customers.map(customer =>
      customer.id === id ? { ...customer, [field]: value } : customer
    ));
  };

  const removeCustomer = (id: number) => {
    setCustomers(customers.filter(customer => customer.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Customer Management</h2>
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Customer Name"
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={newCustomer.name}
            onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={newCustomer.email}
            onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
          />
          <input
            type="tel"
            placeholder="Phone"
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={newCustomer.phone}
            onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
          />
          <input
            type="text"
            placeholder="Address"
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={newCustomer.address}
            onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
          />
        </div>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors flex items-center mt-4 hover-scale"
          onClick={addCustomer}
        >
          <Plus size={18} className="mr-2" /> Add Customer
        </button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-t border-gray-200">
                <td className="p-3">
                  {editingId === customer.id ? (
                    <input
                      type="text"
                      className="border border-gray-300 p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={customer.name}
                      onChange={(e) => handleChange(customer.id, 'name', e.target.value)}
                    />
                  ) : (
                    customer.name
                  )}
                </td>
                <td className="p-3">
                  {editingId === customer.id ? (
                    <input
                      type="email"
                      className="border border-gray-300 p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={customer.email}
                      onChange={(e) => handleChange(customer.id, 'email', e.target.value)}
                    />
                  ) : (
                    customer.email
                  )}
                </td>
                <td className="p-3">
                  {editingId === customer.id ? (
                    <input
                      type="tel"
                      className="border border-gray-300 p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={customer.phone}
                      onChange={(e) => handleChange(customer.id, 'phone', e.target.value)}
                    />
                  ) : (
                    customer.phone
                  )}
                </td>
                <td className="p-3">
                  {editingId === customer.id ? (
                    <input
                      type="text"
                      className="border border-gray-300 p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={customer.address}
                      onChange={(e) => handleChange(customer.id, 'address', e.target.value)}
                    />
                  ) : (
                    customer.address
                  )}
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    {editingId === customer.id ? (
                      <button
                        className="text-green-600 p-1 rounded hover:bg-green-100 transition-colors"
                        onClick={saveEdit}
                      >
                        <Save size={18} />
                      </button>
                    ) : (
                      <button
                        className="text-blue-600 p-1 rounded hover:bg-blue-100 transition-colors"
                        onClick={() => startEditing(customer.id)}
                      >
                        <Edit size={18} />
                      </button>
                    )}
                    <button
                      className="text-red-600 p-1 rounded hover:bg-red-100 transition-colors"
                      onClick={() => removeCustomer(customer.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerManagement;
import React, { useState } from 'react';
import { Beaker, ClipboardList, Users, BarChart } from 'lucide-react';
import StockManagement from './components/StockManagement';
import OrderManagement from './components/OrderManagement';
import CustomerManagement from './components/CustomerManagement';
import Analytics from './components/Analytics';

function App() {
  const [activeTab, setActiveTab] = useState<'stock' | 'orders' | 'customers' | 'analytics'>('stock');
  const [orders, setOrders] = useState([
    { id: 1, customerId: 1, items: [{ peptideId: 1, quantity: 50 }], status: 'Pending' },
    { id: 2, customerId: 2, items: [{ peptideId: 2, quantity: 75 }], status: 'Shipped' },
  ]);
  const [peptides] = useState([
    { id: 1, name: 'Peptide A' },
    { id: 2, name: 'Peptide B' },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-600 text-white p-6 shadow-md">
        <h1 className="text-3xl font-bold">Peptide Gold Stock Management</h1>
      </header>
      <nav className="bg-white shadow-sm">
        <ul className="flex justify-center">
          <li>
            <button
              className={`flex items-center px-6 py-4 transition-all ${activeTab === 'stock' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
              onClick={() => setActiveTab('stock')}
            >
              <Beaker className="mr-2" size={20} /> Stock
            </button>
          </li>
          <li>
            <button
              className={`flex items-center px-6 py-4 transition-all ${activeTab === 'orders' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
              onClick={() => setActiveTab('orders')}
            >
              <ClipboardList className="mr-2" size={20} /> Orders
            </button>
          </li>
          <li>
            <button
              className={`flex items-center px-6 py-4 transition-all ${activeTab === 'customers' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
              onClick={() => setActiveTab('customers')}
            >
              <Users className="mr-2" size={20} /> Customers
            </button>
          </li>
          <li>
            <button
              className={`flex items-center px-6 py-4 transition-all ${activeTab === 'analytics' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
              onClick={() => setActiveTab('analytics')}
            >
              <BarChart className="mr-2" size={20} /> Analytics
            </button>
          </li>
        </ul>
      </nav>
      <main className="p-6 max-w-6xl mx-auto">
        <div className="fade-in">
          {activeTab === 'stock' && <StockManagement />}
          {activeTab === 'orders' && <OrderManagement />}
          {activeTab === 'customers' && <CustomerManagement />}
          {activeTab === 'analytics' && <Analytics orders={orders} peptides={peptides} />}
        </div>
      </main>
    </div>
  );
}

export default App;
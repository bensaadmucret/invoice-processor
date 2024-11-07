import React, { useState } from 'react';
import { InvoiceFormData } from '../types';

interface Props {
  initialData: Partial<InvoiceFormData>;
  onSubmit: (data: InvoiceFormData) => void;
}

export function InvoiceForm({ initialData, onSubmit }: Props) {
  const [formData, setFormData] = useState<InvoiceFormData>({
    number: initialData.number || '',
    date: initialData.date || new Date().toISOString().split('T')[0],
    clientName: initialData.clientName || '',
    items: initialData.items || [{ description: '', quantity: 1, price: 0 }],
    total: initialData.total || 0
  });

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, price: 0 }]
    }));
  };

  const updateItem = (index: number, field: string, value: string | number) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    
    const total = newItems.reduce((sum, item) => 
      sum + (item.quantity * item.price), 0);

    setFormData(prev => ({
      ...prev,
      items: newItems,
      total
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Numéro de facture
          </label>
          <input
            type="text"
            value={formData.number}
            onChange={e => setFormData(prev => ({ ...prev, number: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Client
          </label>
          <input
            type="text"
            value={formData.clientName}
            onChange={e => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Articles</h3>
        {formData.items.map((item, index) => (
          <div key={index} className="grid grid-cols-6 gap-4">
            <div className="col-span-3">
              <input
                type="text"
                value={item.description}
                onChange={e => updateItem(index, 'description', e.target.value)}
                placeholder="Description"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="number"
                value={item.quantity}
                onChange={e => updateItem(index, 'quantity', parseInt(e.target.value))}
                placeholder="Quantité"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="number"
                value={item.price}
                onChange={e => updateItem(index, 'price', parseFloat(e.target.value))}
                placeholder="Prix"
                step="0.01"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center">
              {(item.quantity * item.price).toFixed(2)}€
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addItem}
          className="text-blue-600 hover:text-blue-700"
        >
          + Ajouter un article
        </button>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">
          Total: {formData.total.toFixed(2)}€
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Générer la facture
        </button>
      </div>
    </form>
  );
}
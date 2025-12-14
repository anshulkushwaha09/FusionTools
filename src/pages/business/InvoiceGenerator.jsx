import { useState, useRef } from 'react';
import { Receipt, Download, Plus, Trash2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import html2pdf from 'html2pdf.js';
import LeadCapture from '../../components/LeadCapture';

const InvoiceGenerator = () => {
    const [items, setItems] = useState([{ desc: '', qty: 1, price: 0 }]);
    const [client, setClient] = useState({ name: '', email: '', address: '' });
    const [downloaded, setDownloaded] = useState(false);
    const invoiceRef = useRef(null);

    const addItem = () => setItems([...items, { desc: '', qty: 1, price: 0 }]);
    const removeItem = (index) => setItems(items.filter((_, i) => i !== index));
    
    const updateItem = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const calculateTotal = () => items.reduce((sum, item) => sum + (item.qty * item.price), 0);

    const downloadInvoice = () => {
        const element = invoiceRef.current;
        const opt = {
            margin: 10,
            filename: `Invoice-${client.name || 'Client'}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save().then(() => {
            setDownloaded(true);
        });
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
             <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    Invoice Generator
                </h1>
                <p className="text-gray-400">Create professional invoices instantly.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Editor */}
                <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
                    <h3 className="text-xl font-bold text-white border-b border-white/10 pb-4">Invoice Details</h3>
                    <div className="space-y-4">
                        <Input label="Client Name" value={client.name} onChange={(e) => setClient({...client, name: e.target.value})} />
                        <Input label="Client Email" value={client.email} onChange={(e) => setClient({...client, email: e.target.value})} />
                        <Input label="Client Address" textarea value={client.address} onChange={(e) => setClient({...client, address: e.target.value})} />
                    </div>

                    <div className="space-y-4 pt-4">
                        <h4 className="text-lg font-semibold text-white">Line Items</h4>
                        {items.map((item, index) => (
                            <div key={index} className="flex gap-2 items-start">
                                <div className="flex-grow">
                                    <Input placeholder="Description" value={item.desc} onChange={(e) => updateItem(index, 'desc', e.target.value)} />
                                </div>
                                <div className="w-20">
                                    <Input type="number" placeholder="Qty" value={item.qty} onChange={(e) => updateItem(index, 'qty', Number(e.target.value))} />
                                </div>
                                <div className="w-24">
                                    <Input type="number" placeholder="Price" value={item.price} onChange={(e) => updateItem(index, 'price', Number(e.target.value))} />
                                </div>
                                <button className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg mt-1" onClick={() => removeItem(index)}>
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                        <Button onClick={addItem} variant="secondary" className="w-full">
                            <Plus size={16} className="mr-2" /> Add Item
                        </Button>
                    </div>
                </div>

                {/* Preview */}
                <div className="space-y-6">
                    <div className="bg-white text-black p-8 rounded-lg shadow-2xl min-h-[600px]" ref={invoiceRef}>
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h1 className="text-4xl font-bold text-gray-800">INVOICE</h1>
                                <p className="text-gray-500 mt-2">Date: {new Date().toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                                <h2 className="text-xl font-bold">FusionTools AI</h2>
                                <p className="text-gray-500 text-sm">123 AI Street, Tech City</p>
                            </div>
                        </div>

                        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                            <h3 className="text-gray-600 font-bold mb-2 uppercase text-xs">Bill To:</h3>
                            <h4 className="text-xl font-bold">{client.name || 'Client Name'}</h4>
                            <p className="text-gray-500">{client.email || 'email@example.com'}</p>
                            <p className="text-gray-500 whitespace-pre-wrap">{client.address || 'Client Address'}</p>
                        </div>

                        <table className="w-full mb-8">
                            <thead>
                                <tr className="border-b-2 border-gray-100 text-left">
                                    <th className="py-2 text-gray-600 font-bold">Description</th>
                                    <th className="py-2 text-gray-600 font-bold text-center">Qty</th>
                                    <th className="py-2 text-gray-600 font-bold text-right">Price</th>
                                    <th className="py-2 text-gray-600 font-bold text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, i) => (
                                    <tr key={i} className="border-b border-gray-50">
                                        <td className="py-3 text-gray-800">{item.desc || 'Item Description'}</td>
                                        <td className="py-3 text-center text-gray-600">{item.qty}</td>
                                        <td className="py-3 text-right text-gray-600">${item.price.toFixed(2)}</td>
                                        <td className="py-3 text-right text-gray-800 font-medium">${(item.qty * item.price).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="flex justify-end">
                            <div className="w-64">
                                <div className="flex justify-between py-2 border-t border-gray-100">
                                    <span className="font-bold text-xl">Total:</span>
                                    <span className="font-bold text-xl text-[#00f3ff] text-blue-600">${calculateTotal().toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <Button onClick={downloadInvoice} className="w-full shadow-xl">
                        Download Invoice PDF <Download size={18} className="ml-2" />
                    </Button>
                    
                    {downloaded && <LeadCapture variant="tool-output" />}
                </div>
            </div>
        </div>
    );
};

export default InvoiceGenerator;

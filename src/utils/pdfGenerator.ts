import { jsPDF } from 'jspdf';
import { InvoiceFormData } from '../types';

export const generatePDF = (data: InvoiceFormData): string => {
  const doc = new jsPDF();
  
  // Add company header
  doc.setFontSize(20);
  doc.text('FACTURE', 105, 20, { align: 'center' });
  
  // Add invoice details
  doc.setFontSize(12);
  doc.text(`Numéro: ${data.number}`, 20, 40);
  doc.text(`Date: ${data.date}`, 20, 50);
  doc.text(`Client: ${data.clientName}`, 20, 60);
  
  // Add items table
  let yPosition = 80;
  doc.text('Description', 20, yPosition);
  doc.text('Qté', 120, yPosition);
  doc.text('Prix', 150, yPosition);
  doc.text('Total', 180, yPosition);
  
  yPosition += 10;
  data.items.forEach(item => {
    doc.text(item.description, 20, yPosition);
    doc.text(item.quantity.toString(), 120, yPosition);
    doc.text(item.price.toFixed(2) + '€', 150, yPosition);
    doc.text((item.quantity * item.price).toFixed(2) + '€', 180, yPosition);
    yPosition += 10;
  });
  
  // Add total
  doc.text(`Total: ${data.total.toFixed(2)}€`, 180, yPosition + 10);
  
  return doc.output('datauristring');
};
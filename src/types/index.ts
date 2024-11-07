export interface Invoice {
  id: string;
  imageUrl: string;
  extractedText: string;
  correctedText: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  pdfUrl?: string;
}

export interface InvoiceFormData {
  number: string;
  date: string;
  clientName: string;
  items: Array<{
    description: string;
    quantity: number;
    price: number;
  }>;
  total: number;
}
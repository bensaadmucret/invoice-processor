import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';
import toast from 'react-hot-toast';
import { ImageUploader } from './components/ImageUploader';
import { InvoiceForm } from './components/InvoiceForm';
import { correctText } from './utils/textProcessing';
import { generatePDF } from './utils/pdfGenerator';
import { Invoice, InvoiceFormData } from './types';

function App() {
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const processImage = async (file: File) => {
    setIsProcessing(true);
    const imageUrl = URL.createObjectURL(file);

    try {
      const worker = await createWorker('fra');
      
      const { data: { text } } = await worker.recognize(file);
      const correctedText = correctText(text);
      
      await worker.terminate();

      setCurrentInvoice({
        id: Date.now().toString(),
        imageUrl,
        extractedText: text,
        correctedText,
        status: 'completed'
      });
    } catch (error) {
      toast.error('Erreur lors du traitement de l\'image');
      setCurrentInvoice({
        id: Date.now().toString(),
        imageUrl,
        extractedText: '',
        correctedText: '',
        status: 'error'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFormSubmit = (data: InvoiceFormData) => {
    try {
      const pdfUrl = generatePDF(data);
      if (currentInvoice) {
        setCurrentInvoice({
          ...currentInvoice,
          pdfUrl
        });
      }
      toast.success('Facture PDF générée avec succès');
    } catch (error) {
      toast.error('Erreur lors de la génération du PDF');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Traitement de Factures
        </h1>

        {!currentInvoice && (
          <div className="max-w-xl mx-auto">
            <ImageUploader onUpload={processImage} />
          </div>
        )}

        {isProcessing && (
          <div className="text-center mt-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Traitement de l'image en cours...</p>
          </div>
        )}

        {currentInvoice && currentInvoice.status === 'completed' && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4">Image originale</h2>
              <img
                src={currentInvoice.imageUrl}
                alt="Facture originale"
                className="w-full rounded-lg shadow-md"
              />
              <div className="mt-4">
                <h3 className="font-bold mb-2">Texte extrait:</h3>
                <pre className="bg-white p-4 rounded-lg shadow text-sm overflow-auto max-h-48">
                  {currentInvoice.correctedText}
                </pre>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4">Formulaire de facture</h2>
              <InvoiceForm
                initialData={{}}
                onSubmit={handleFormSubmit}
              />
            </div>
          </div>
        )}

        {currentInvoice?.pdfUrl && (
          <div className="mt-8 text-center">
            <a
              href={currentInvoice.pdfUrl}
              download="facture.pdf"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
            >
              Télécharger le PDF
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
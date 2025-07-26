import { useState } from 'react';
import Image from 'next/image';
import { invoiceTemplates } from './templates/templates';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

const sampleData = {
  company: {
    name: 'Acme Corp',
    address: '123 Main St, Anytown',
    email: 'info@acme.com',
    phone: '+1 555-1234',
    gst: '22AAAAA0000A1Z5',
    logo: 'https://res.cloudinary.com/demo/image/upload/sample.jpg', // Use a real Cloudinary sample or your own
  },
  customer: {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 555-1234',
    address: '123 Main St, Anytown, USA',
  },
  products: [
    { name: 'Product A', quantity: 2, price: 500, tax: 18 },
    { name: 'Product B', quantity: 1, price: 1200, tax: 18 },
  ],
  subtotal: 2200,
  totalGst: 396,
  total: 2596,
  invoiceNumber: 'INV-2024-001',
  issueDate: '2024-07-01',
  dueDate: '2024-07-08',
};

export default function TemplateSelector({ selected, onSelect }: { selected: string, onSelect: (id: string) => void }) {
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState<{ [key: string]: boolean }>(() => {
    // Initialize all images as loading
    const initialLoading: { [key: string]: boolean } = {};
    invoiceTemplates.forEach(tpl => {
      initialLoading[tpl.id] = true;
    });
    return initialLoading;
  });
  const previewTemplate = invoiceTemplates.find(t => t.id === previewId);
  const PreviewComponent = previewTemplate?.component;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {invoiceTemplates.map((tpl) => (
          <div
            key={tpl.id}
            className={`bg-white border rounded-xl p-4 cursor-pointer transition ring-2 shadow-md hover:shadow-lg flex flex-col items-center ${selected === tpl.id ? 'ring-primary' : 'ring-transparent'}`}
            onClick={() => onSelect(tpl.id)}
          >
            <div className="w-full aspect-[4/3] overflow-hidden rounded-lg mb-3 flex items-center justify-center bg-gray-50 relative">
              {imageLoading[tpl.id] && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400"></div>
                </div>
              )}
              <Image 
                src={tpl.image} 
                alt={tpl.name} 
                width={400}
                height={300}
                className="w-full h-full object-cover"
                onLoad={() => setImageLoading(prev => ({ ...prev, [tpl.id]: false }))}
                onError={() => setImageLoading(prev => ({ ...prev, [tpl.id]: false }))}
                priority={true}
                unoptimized={true}
              />
              {/* Fallback content when image fails to load */}
              {imageLoading[tpl.id] === false && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 opacity-0 hover:opacity-100 transition-opacity">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-700">{tpl.name}</div>
                    <div className="text-sm text-gray-500">Template Preview</div>
                  </div>
                </div>
              )}
            </div>
            <div className="text-center font-semibold text-base mb-2">{tpl.name}</div>
            <button
              type="button"
              className="mt-auto w-full py-1 px-2 bg-gray-100 rounded hover:bg-gray-200 text-sm"
              onClick={e => { e.stopPropagation(); setPreviewId(tpl.id); }}
            >
              Preview
            </button>
          </div>
        ))}
      </div>
      <Dialog open={!!previewId} onOpenChange={open => !open && setPreviewId(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Template Preview: {previewTemplate?.name}</DialogTitle>
          </DialogHeader>
          <div className="overflow-auto max-h-[70vh]">
            {PreviewComponent && <PreviewComponent {...sampleData} />}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

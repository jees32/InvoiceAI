"use client";
import { useEffect, useState } from 'react';
import { useSupabaseAuth } from '@/lib/SupabaseAuthProvider';
import TemplateSelector from '@/components/TemplateSelector';
import { getProfile, updateProfile } from '@/app/actions/profile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { ArrowRight, Save } from 'lucide-react';

export default function TemplatesPage() {
  const { user } = useSupabaseAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [selected, setSelected] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchDefaultTemplate() {
      if (!user?.id) return;
      setLoading(true);
      const profile = await getProfile(user.id);
      if (profile && profile.defaultTemplate) {
        setSelected(profile.defaultTemplate);
      } else {
        // Set a fallback default only if user has no saved template
        setSelected('modern');
      }
      setLoading(false);
    }
    fetchDefaultTemplate();
  }, [user]);

  async function handleSave() {
    if (!user?.id) return;
    setSaving(true);
    const result = await updateProfile(user.id, { defaultTemplate: selected });
    setSaving(false);
    if (result.success) {
      toast({ title: 'Default template updated!', description: 'Your default invoice template has been saved.' });
    } else {
      toast({ variant: 'destructive', title: 'Error', description: result.message });
    }
  }

  const handleCreateInvoice = () => {
    router.push(`/dashboard/invoices/new?template=${selected}`);
  };

  const getTemplateDisplayName = (templateKey: string) => {
    const templateNames: { [key: string]: string } = {
      'elegant': 'Elegant',
      'minimal': 'Minimal', 
      'modern': 'Modern',
      'service': 'Professional',
      'vibrant': 'Vibrant'
    };
    return templateNames[templateKey] || templateKey;
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Invoice Templates</h1>
        <p className="text-gray-600">Choose your default invoice template and start creating professional invoices.</p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Select Your Default Template</CardTitle>
          <p className="text-sm text-gray-600">This template will be used by default when creating new invoices.</p>
        </CardHeader>
        <CardContent>
          {loading || !selected ? (
            <div className="text-center py-12 min-h-[400px] flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading templates...</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <TemplateSelector selected={selected} onSelect={setSelected} />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleSave} 
                  disabled={saving}
                  className="flex-1"
                  variant="outline"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? 'Saving...' : `Save "${getTemplateDisplayName(selected)}" as Default`}
                </Button>
                
                <Button 
                  onClick={handleCreateInvoice}
                  className="flex-1"
                >
                  Create Invoice with {getTemplateDisplayName(selected)}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {selected && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Current Default</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{getTemplateDisplayName(selected)}</p>
                <p className="text-sm text-gray-600">Your current default template</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleCreateInvoice}>
                Create Invoice
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 
import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Search, Check, X, Eye } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface Vendor {
  id: string;
  user_id: string;
  business_name: string;
  business_description: string;
  business_address: any;
  tax_id: string;
  is_approved: boolean;
  created_at: string;
  profiles: {
    full_name: string;
    email: string;
    phone: string;
  };
}

export default function AdminVendors() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const { data, error } = await supabase
        .from('vendors')
        .select(`
          *,
          profiles (
            full_name,
            email,
            phone
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVendors(data || []);
    } catch (error) {
      console.error('Error fetching vendors:', error);
      toast({
        title: "Error",
        description: "Failed to fetch vendors",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const approveVendor = async (vendorId: string) => {
    try {
      const { error } = await supabase
        .from('vendors')
        .update({ is_approved: true })
        .eq('id', vendorId);

      if (error) throw error;

      // Update profile to mark as vendor
      const vendor = vendors.find(v => v.id === vendorId);
      if (vendor) {
        await supabase
          .from('profiles')
          .update({ is_vendor: true })
          .eq('user_id', vendor.user_id);
      }

      setVendors(vendors.map(vendor => 
        vendor.id === vendorId 
          ? { ...vendor, is_approved: true }
          : vendor
      ));

      toast({
        title: "Success",
        description: "Vendor approved successfully",
      });
    } catch (error) {
      console.error('Error approving vendor:', error);
      toast({
        title: "Error",
        description: "Failed to approve vendor",
        variant: "destructive",
      });
    }
  };

  const rejectVendor = async (vendorId: string) => {
    try {
      const { error } = await supabase
        .from('vendors')
        .update({ is_approved: false })
        .eq('id', vendorId);

      if (error) throw error;

      // Update profile to remove vendor status
      const vendor = vendors.find(v => v.id === vendorId);
      if (vendor) {
        await supabase
          .from('profiles')
          .update({ is_vendor: false })
          .eq('user_id', vendor.user_id);
      }

      setVendors(vendors.map(vendor => 
        vendor.id === vendorId 
          ? { ...vendor, is_approved: false }
          : vendor
      ));

      toast({
        title: "Success",
        description: "Vendor status revoked",
      });
    } catch (error) {
      console.error('Error rejecting vendor:', error);
      toast({
        title: "Error",
        description: "Failed to update vendor status",
        variant: "destructive",
      });
    }
  };

  const filteredVendors = vendors.filter(vendor =>
    vendor.business_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.profiles?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingVendors = filteredVendors.filter(v => !v.is_approved);
  const approvedVendors = filteredVendors.filter(v => v.is_approved);

  const VendorTable = ({ vendors: vendorList, showActions = true }: { vendors: Vendor[], showActions?: boolean }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Business Name</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Applied</TableHead>
          {showActions && <TableHead>Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {vendorList.map((vendor) => (
          <TableRow key={vendor.id}>
            <TableCell className="font-medium">
              <div>
                <div>{vendor.business_name}</div>
                <div className="text-sm text-muted-foreground">
                  {vendor.business_description?.substring(0, 50)}...
                </div>
              </div>
            </TableCell>
            <TableCell>{vendor.profiles?.full_name || 'N/A'}</TableCell>
            <TableCell>{vendor.profiles?.email}</TableCell>
            <TableCell>
              <Badge variant={vendor.is_approved ? "default" : "secondary"}>
                {vendor.is_approved ? 'Approved' : 'Pending'}
              </Badge>
            </TableCell>
            <TableCell>
              {new Date(vendor.created_at).toLocaleDateString()}
            </TableCell>
            {showActions && (
              <TableCell>
                <div className="flex space-x-2">
                  {!vendor.is_approved ? (
                    <Button
                      size="sm"
                      onClick={() => approveVendor(vendor.id)}
                    >
                      <Check className="h-3 w-3 mr-1" />
                      Approve
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => rejectVendor(vendor.id)}
                    >
                      <X className="h-3 w-3 mr-1" />
                      Revoke
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                </div>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <AdminLayout title="Vendor Management">
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search vendors by business name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList>
            <TabsTrigger value="pending">
              Pending ({pendingVendors.length})
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved ({approvedVendors.length})
            </TabsTrigger>
            <TabsTrigger value="all">
              All Vendors ({filteredVendors.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Vendor Applications</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <Skeleton key={i} className="h-16 w-full" />
                    ))}
                  </div>
                ) : (
                  <VendorTable vendors={pendingVendors} />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approved">
            <Card>
              <CardHeader>
                <CardTitle>Approved Vendors</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <Skeleton key={i} className="h-16 w-full" />
                    ))}
                  </div>
                ) : (
                  <VendorTable vendors={approvedVendors} />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Vendors</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="h-16 w-full" />
                    ))}
                  </div>
                ) : (
                  <VendorTable vendors={filteredVendors} showActions={false} />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
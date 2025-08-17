import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Plus, 
  Search, 
  Filter,
  Users,
  Calendar,
  Settings,
  MoreHorizontal
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Client {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'trial';
  client_config: {
    client_type: 'college' | 'individual' | 'company';
    plan: 'trial' | 'premium' | 'enterprise';
    contract_end_date: string;
    max_licences: number;
    primary_email: string;
    alternative_emails: string[];
  };
  current_users: number;
  created_at: string;
}

const ClientManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'inactive' | 'trial'>('all');

  // Placeholder data - you'll replace with Firebase data
  const clients: Client[] = [
    {
      id: 'client123',
      name: 'Demo College',
      status: 'active',
      client_config: {
        client_type: 'college',
        plan: 'premium',
        contract_end_date: '2025-12-31',
        max_licences: 500,
        primary_email: 'admin@democollege.com',
        alternative_emails: ['support@democollege.com']
      },
      current_users: 450,
      created_at: '2024-01-15'
    },
    {
      id: 'client456',
      name: 'Tech University',
      status: 'active',
      client_config: {
        client_type: 'college',
        plan: 'enterprise',
        contract_end_date: '2026-06-30',
        max_licences: 1000,
        primary_email: 'admin@techuni.edu',
        alternative_emails: ['it@techuni.edu', 'support@techuni.edu']
      },
      current_users: 850,
      created_at: '2023-09-20'
    },
    {
      id: 'client789',
      name: 'Individual Learner Pro',
      status: 'trial',
      client_config: {
        client_type: 'individual',
        plan: 'trial',
        contract_end_date: '2025-09-15',
        max_licences: 1,
        primary_email: 'john.doe@email.com',
        alternative_emails: []
      },
      current_users: 1,
      created_at: '2025-08-15'
    }
  ];

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.client_config.primary_email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || client.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success';
      case 'inactive': return 'bg-destructive';
      case 'trial': return 'bg-warning';
      default: return 'bg-muted';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'enterprise': return 'bg-admin';
      case 'premium': return 'bg-primary';
      case 'trial': return 'bg-warning';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Client Management</h1>
          <p className="text-muted-foreground">
            Manage client accounts, licenses, and configurations
          </p>
        </div>
        <Button variant="admin" size="lg" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Client
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search clients by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {['all', 'active', 'inactive', 'trial'].map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter(filter as any)}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Client Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <Card key={client.id} className="shadow-card hover:shadow-glow transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{client.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {client.client_config.client_type}
                    </CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Configure
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Users className="mr-2 h-4 w-4" />
                      Manage Users
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Calendar className="mr-2 h-4 w-4" />
                      View Batches
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(client.status)}>
                  {client.status}
                </Badge>
                <Badge variant="outline" className={getPlanColor(client.client_config.plan)}>
                  {client.client_config.plan}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Users:</span>
                  <span className="font-medium">
                    {client.current_users}/{client.client_config.max_licences}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Contract ends:</span>
                  <span className="font-medium">{client.client_config.contract_end_date}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Created:</span>
                  <span className="font-medium">{client.created_at}</span>
                </div>
              </div>

              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground mb-1">Primary Contact:</p>
                <p className="text-sm font-medium">{client.client_config.primary_email}</p>
              </div>

              <div className="flex gap-2">
                <Button variant="default" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <Card className="shadow-card">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Building2 className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No clients found</h3>
            <p className="text-muted-foreground text-center mb-4">
              {searchTerm ? 'Try adjusting your search criteria' : 'Create your first client to get started'}
            </p>
            <Button variant="admin" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Client
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ClientManager;
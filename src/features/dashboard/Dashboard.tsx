import { useState } from 'react';
import { Alert, Button, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useGetAccountsQuery, useDeleteAccountMutation } from './slices/dashboardApi';
import AccountCard from './components/AccountCard';
import AddEditAccountModal from './components/AddEditAccountModal';
import DeleteConfirmationDialog from './components/DeleteConfirmationDialog';
import type { SocialAccount } from '../../types';
import { Plus } from 'lucide-react';
import StatusCardList from './components/StatusCardList';
import Header from './components/Header';
import LoadingSkeleton from './components/LoadingSkeleton';
import DummyChartCard from './components/DummyChartCard';


export default function Dashboard() {
  const { data: accounts, isLoading, isError, error } = useGetAccountsQuery();
  const [deleteAccount, { isLoading: isDeleting }] = useDeleteAccountMutation();
  
  // Modal state management
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<SocialAccount | null>(null);

  // show loading skeleton
  if (isLoading) {
    return (
     <LoadingSkeleton/>
    );
  }

  // show error message
  if (isError) {
    let errorMessage = 'Failed to load accounts. Please try again later.';
    
    if (error) {
      if ('status' in error && 'error' in error) {
        // Custom error from queryFn
        errorMessage = (error as { status: string; error: string }).error;
      } else if ('message' in error) {
        // Standard error with message
        errorMessage = (error as { message: string }).message;
      }
    }
    
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        Failed to load accounts: {errorMessage}
      </Alert>
    );
  }

 
  const handleAddClick = () => {
    setSelectedAccount(null);
    setIsAddModalOpen(true);
  };

  const handleEditClick = (account: SocialAccount) => {
    setSelectedAccount(account);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (account: SocialAccount) => {
    setSelectedAccount(account);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedAccount) {
      try {
        await deleteAccount(selectedAccount.id).unwrap();
        setIsDeleteDialogOpen(false);
        setSelectedAccount(null);
      } catch (error) {
        // Error handling is done by RTK Query
        console.error('Failed to delete account:', error);
      }
    }
  };

  const handleModalClose = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedAccount(null);
  };

 
  if (!accounts || accounts.length === 0) {
    return (
      <>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Social Media Accounts</h2>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddClick}
          >
            Create New Account
          </Button>
        </div>
        <Alert severity="info">
          No social media accounts found. Add your first account to get started.
        </Alert>
        <AddEditAccountModal
          open={isAddModalOpen}
          onClose={handleModalClose}
        />
      </>
    );
  }

 
  return (
    <>
      <Header> 
        <Button 
        variant="contained"
        disableElevation
        onClick={handleAddClick}
        className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-semibold transition-all shadow-lg shadow-indigo-200 active:scale-95"
        sx={{
          textTransform: 'none', 
          padding: {xs: '8px 12px', sm: '10px 20px'},  
          minWidth: 'auto',
          borderRadius: '0.75rem', 
          gap: 1,
        }}
      >
        <Plus size={18} />
        <Typography component="span" sx={{fontSize:'14px'}} className="hidden sm:inline">
          Add Account
        </Typography>
      </Button>
    </Header>

<StatusCardList totalFollowers={accounts.reduce((total, account) => total + (account.followerCount || 0), 0)} />

  <DummyChartCard accounts={accounts} />

    <section>
       <div className="flex items-center justify-between mb-6">
          <Typography component="h2" sx={{fontWeight:'bold', fontSize:'20px'}}>Connected Accounts</Typography>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Live Sync Enabled</span>
          </div>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {accounts.map((account) => (
            <AccountCard
            key={account.id}
              account={account}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
        ))}
      </div>
   </section>

      {/* Add Account Modal */}
      <AddEditAccountModal
        open={isAddModalOpen}
        onClose={handleModalClose}
        existingAccounts={accounts || []}
      />

      {/* Edit Account Modal */}
      <AddEditAccountModal
        open={isEditModalOpen}
        onClose={handleModalClose}
        initialData={selectedAccount || undefined}
        existingAccounts={accounts || []}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setSelectedAccount(null);
        }}
        onConfirm={handleDeleteConfirm}
        accountName={selectedAccount?.displayName || ''}
        isLoading={isDeleting}
      />
    </>
  );
}

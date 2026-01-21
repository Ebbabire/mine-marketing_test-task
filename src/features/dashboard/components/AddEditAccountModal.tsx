import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  Grid,
  Typography,
  Alert,
} from '@mui/material';
import { useAddAccountMutation, useEditAccountMutation } from '../slices/dashboardApi';
import { accountSchema, type AccountFormValues } from '../../../utils/validation';
import type { SocialAccount } from '../../../types';
import type { SocialPlatform } from '../../../types';

interface AddEditAccountModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: SocialAccount;
  existingAccounts?: SocialAccount[];
}

const platforms: SocialPlatform[] = ['facebook', 'twitter', 'instagram', 'linkedin', 'tiktok'];

export default function AddEditAccountModal({
  open,
  onClose,
  initialData,
  existingAccounts = [],
}: AddEditAccountModalProps) {
  const isEditMode = !!initialData;
  const [addAccount, { isLoading: isAdding }] = useAddAccountMutation();
  const [editAccount, { isLoading: isEditing }] = useEditAccountMutation();
  const [duplicateError, setDuplicateError] = useState<string>('');

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      platform: 'facebook',
      username: '',
      displayName: '',
      avatarUrl: '',
      followerCount: 0,
    },
  });

  useEffect(() => {
    if (open) {
      if (initialData) {
        reset({
          platform: initialData.platform,
          username: initialData.username,
          displayName: initialData.displayName,
          avatarUrl: initialData.avatarUrl || '',
          followerCount: initialData.followerCount || 0,
        });
      } else {
        reset({
          platform: 'facebook',
          username: '',
          displayName: '',
          avatarUrl: '',
          followerCount: 0,
        });
      }
    } else {
      // Reset form when modal closes to ensure clean state for next open
      reset({
        platform: 'facebook',
        username: '',
        displayName: '',
        avatarUrl: '',
        followerCount: 0,
      });
    }
  }, [open, initialData, reset]);

  const onSubmit = async (data: AccountFormValues) => {
    // Clear any previous duplicate error
    setDuplicateError('');
    
    // Only check for duplicates in "Add" mode, not "Edit" mode
    if (!isEditMode) {
      const platformExists = existingAccounts.some(
        (account) => account.platform === data.platform
      );

      if (platformExists) {
        const platformName = data.platform.charAt(0).toUpperCase() + data.platform.slice(1);
        const errorMessage = `An account for ${platformName} already exists. Please edit the existing account or choose a different platform.`;
        setDuplicateError(errorMessage);
        
        return;
      }
    }

    try {
      if (isEditMode && initialData) {
        await editAccount({
          id: initialData.id,
          updates: {
            platform: data.platform,
            username: data.username,
            displayName: data.displayName,
            avatarUrl: data.avatarUrl || undefined,
            followerCount: data.followerCount || 0,
            isConnected: initialData.isConnected,
          },
        }).unwrap();
      } else {
        await addAccount({
          platform: data.platform,
          username: data.username,
          displayName: data.displayName,
          avatarUrl: data.avatarUrl || undefined,
          followerCount: data.followerCount || 0,
          isConnected: true,
          connectedAt: new Date().toISOString(),
        }).unwrap();
      }

      onClose();
    } catch (error) {
      // Error handling is done by RTK Query - we could show a toast here
      console.error('Failed to save account:', error);
    }
  };

  const isLoading = isAdding || isEditing;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{
      sx: {
        borderRadius: '20px',
        padding: '8px'
      }
    }}>
      <DialogTitle>
        <span className="text-2xl font-bold">{isEditMode ? 'Edit Account' : 'Add New Account'}</span>
        <Typography variant="body2" sx={{ color: '#64748b' }}>
          {isEditMode ? 'Edit your social profile details.' : 'Connect a new social profile to your dashboard.'}
        </Typography>
      </DialogTitle>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ pt: 1 }}>
          {duplicateError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {duplicateError}
            </Alert>
          )}
          <Grid container spacing={3} >
          <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Username"
                  fullWidth
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  disabled={isLoading}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                />
              )}
            />
            <Grid size={{ xs: 12 }}> <Controller
              name="displayName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Display Name"
                  fullWidth
                  error={!!errors.displayName}
                  helperText={errors.displayName?.message}
                  disabled={isLoading}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                />
              )}
            /></Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="platform"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Platform"
                  fullWidth
                  error={!!errors.platform || !!duplicateError}
                  helperText={errors.platform?.message}
                  disabled={isLoading}
                  variant="outlined"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                  onChange={(e) => {
                    // Clear duplicate error when platform changes
                    setDuplicateError('');
                    field.onChange(e);
                  }}
                >
                  {platforms.map((platform) => (
                    <MenuItem key={platform} value={platform}>
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
             </Grid>
             <Grid size={{ xs: 12, md: 6 }}>
             <Controller
              name="followerCount"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Follower Count (Optional)"
                  type="number"
                  fullWidth
                  error={!!errors.followerCount}
                  helperText={errors.followerCount?.message }
                  disabled={isLoading}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                  onChange={(e) => {
                    const value = e.target.value === '' ? undefined : parseInt(e.target.value, 10);
                    field.onChange(value);
                  }}
                />
              )}
            />
            </Grid>
            <Controller
              name="avatarUrl"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Avatar URL (Optional)"
                  fullWidth
                  error={!!errors.avatarUrl}
                  helperText={errors.avatarUrl?.message}
                  disabled={isLoading} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                />
              )}
            /> 
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-indigo-200 active:scale-95"
            sx={{
              padding: {xs: '5px 10px', sm: '6px 20px'},  
              minWidth: 'auto',
              borderRadius: '0.5rem', 
              gap: 1
            }}
            startIcon={isLoading ? <CircularProgress size={20} /> : null}
          >
            {isEditMode ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

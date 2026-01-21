import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';

interface DeleteConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  accountName: string;
  isLoading?: boolean;
}

export default function DeleteConfirmationDialog({
  open,
  onClose,
  onConfirm,
  accountName,
  isLoading = false,
}: DeleteConfirmationDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{
      sx: {
        borderRadius: '12px',
        padding: '8px'
      }
    }}>
      <DialogTitle>
        <Typography component="h2" sx={{fontWeight:'bold', fontSize:'20px'}}>Delete Account</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography component="p" sx={{fontSize:'14px'}} className="text-slate-500">
          Are you sure you want to delete <strong>{accountName}</strong>? This action
          cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={20} /> : null}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

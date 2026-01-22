import { useState } from 'react';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import type { SocialAccount } from '../../../types';
import { PLATFORM_CONFIG } from '../../../utils/constants';
import { Pencil, Trash2 } from 'lucide-react';

interface AccountCardProps {
  account: SocialAccount;
  onEdit: (account: SocialAccount) => void;
  onDelete: (account: SocialAccount) => void;
}

export default function AccountCard({ account, onEdit, onDelete }: AccountCardProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const config = PLATFORM_CONFIG[account.platform];

  // Format followers with K notation (e.g., 24.5K)
  const formatFollowers = (count: number | undefined): string => {
    if (!count) return '0';
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const formattedFollowers = formatFollowers(account.followerCount);

  // moch engagement rate
  const engagementRate = account.followerCount 
    ? Math.min((account.followerCount / 1000) * 0.3, 15).toFixed(1)
    : '0.0';
  
  // Calculate a deterministic "random" value based on account ID to avoid React warnings
  const deterministicValue = account.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const followersChange = (deterministicValue % 30) + 5; // Value between 5-35%

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleMenuClose();
    onEdit(account);
  };

  const handleDelete = () => {
    handleMenuClose();
    onDelete(account);
  };

  // Get avatar URL or use placeholder
  const avatarUrl = account.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(account.displayName)}&background=random`;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:translate-y-[-2px] transition-all">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3 relative">
          <img 
            src={avatarUrl} 
            alt={`${account.displayName} avatar`}
            className="w-12 h-12 rounded-full ring-2 ring-slate-50 object-cover bg-slate-400"
          />
          <div 
            className="absolute bottom-1 left-7 w-7 h-7 rounded-full flex items-center justify-center text-white border-white border-2 p-1 text-xs font-bold shadow-md"
            style={{ backgroundColor: config.color }}
          >
            {config.icon}
          </div>
          <div className="flex flex-col gap-1">
            <Typography component="h3" sx={{fontWeight:'bold', fontSize:'14px'}} className="font-bold text-slate-900 text-sm mb-0">
              {account.username.startsWith('@') ? account.username : `@${account.username}`}
            </Typography>
            <p className="text-xs text-slate-400 capitalize">{account.platform}</p>
          </div>
        </div>
        <IconButton
          size="small"
          onClick={handleMenuClick}
          className="text-slate-400 hover:text-slate-600"
        >
          <MoreVert fontSize="small" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          sx={{ '& .MuiPaper-root': { borderRadius: '12px', paddingTop: '0px' } }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleEdit} sx={{ '&:hover': { backgroundColor: 'rgba(34, 197, 94, 0.1)' } }}>
            <Pencil  className="mr-2 text-green-700 size-4" />
            <Typography component="span" sx={{fontSize:'14px'}} className="text-green-600">Edit</Typography>
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ '&:hover': { backgroundColor: 'rgba(239, 68, 68, 0.1)' } }}>
            <Trash2 fontSize="small" className="mr-2 text-red-500 size-4" />
            <Typography component="span" sx={{fontSize:'14px'}} className="text-red-500">Delete Account</Typography>
          </MenuItem>
        </Menu>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Followers</p>
            <h5 className="text-2xl font-bold text-slate-900">
              {formattedFollowers}
            </h5>
          </div>
          <div className={`text-xs font-bold px-2 py-1 rounded-lg ${followersChange >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
            {followersChange >= 0 ? '+' : ''}{followersChange}%
          </div>
        </div>

        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-150"
            style={{ 
              width: `${Math.min(parseFloat(engagementRate) * 5, 100)}%`, 
              backgroundColor: config.color 
            }} 
          />
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-500 font-medium">Engagement Rate</span>
          <span className="text-sm font-bold text-slate-900">{engagementRate}%</span>
        </div>
      </div>
    </div>
  );
}

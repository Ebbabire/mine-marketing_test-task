import { 
    Instagram, 
    Twitter, 
    Linkedin, 
    Facebook, 
    Music2, 
 
  } from 'lucide-react';
  
  export const PLATFORM_CONFIG = {
    instagram: { 
      color: '#E4405F', 
      icon: <Instagram size={18} />, 
      bg: 'bg-pink-50' 
    },
    twitter: { 
      color: '#1DA1F2', 
      icon: <Twitter size={18} />, 
      bg: 'bg-blue-50' 
    },
    linkedin: { 
      color: '#0077B5', 
      icon: <Linkedin size={18} />, 
      bg: 'bg-indigo-50' 
    },
    facebook: { 
      color: '#1877F2', 
      icon: <Facebook size={18} />, 
      bg: 'bg-blue-100' 
    },
    tiktok: { 
      color: '#000000', 
      icon: <Music2 size={18} />, 
      bg: 'bg-gray-100' 
    },
  };
import { Eye, MousePointer2, Target, Users } from "lucide-react";
import StatsCard from "./StatusCard";

interface StatusCardListProps {
  totalFollowers: number;
}

export default function StatusCardList({ totalFollowers }: StatusCardListProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatsCard 
          label="Total Followers" 
          value={(totalFollowers / 1000).toFixed(1) + 'K'} 
          change={8.2} 
          icon={<Users size={20} />} 
          color="#6366f1"
        />
        <StatsCard 
          label="Total Impressions" 
          value="842.1K" 
          change={12.4} 
          icon={<Eye size={20} />} 
          color="#f43f5e"
        />
        <StatsCard 
          label="Engagement Rate" 
          value="6.4%" 
          change={2.1} 
          icon={<Target size={20} />} 
          color="#10b981"
        />
        <StatsCard 
          label="Clicks & Leads" 
          value="12.8K" 
          change={-1.4} 
          icon={<MousePointer2 size={20} />} 
          color="#f59e0b"
        />
      </div>
    )
}
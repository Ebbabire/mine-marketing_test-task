
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
 
} from 'recharts';
import type { AnalyticsData } from '../../../types';
import { Typography } from '@mui/material';


interface EngagementChartProps {
  data: AnalyticsData[];
}

const EngagementChart = ({ data }:EngagementChartProps) => {
  return (
    <div className="bg-white px-6 pt-6 pb-20 rounded-2xl border border-slate-100 shadow-sm h-[440px]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Typography component="h3" sx={{fontWeight:'bold', fontSize:'18px'}} className="font-bold text-slate-900 text-sm">Engagement Growth</Typography>
          <p className="text-xs text-slate-500">Across all connected platforms</p>
        </div>
        <select className="bg-slate-50 text-xs font-semibold px-3 py-1.5 rounded-lg border-none focus:ring-2 focus:ring-indigo-500">
          <option>Last 30 days</option>
          <option>Last 7 days</option>
          <option>Year to date</option>
        </select>
      </div>
      <div className="h-full pb-12">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorEngage" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                fontSize: '12px'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="engagement" 
              stroke="#6366f1" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorEngage)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EngagementChart;

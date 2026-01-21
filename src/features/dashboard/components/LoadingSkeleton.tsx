import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function LoadingSkeleton() {
  return (
    <Box className="w-full animate-pulse">
      
      {/* SECTION 1: Top Metrics Cards (4 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 h-40 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              {/* Icon Placeholder */}
              <Skeleton variant="circular" width={40} height={40} className="bg-slate-100" />
              {/* Percentage Badge Placeholder */}
              <Skeleton variant="rounded" width={50} height={20} className="rounded-full" />
            </div>
            <div>
              {/* Label */}
              <Skeleton variant="text" width="60%" height={20} className="mb-1" />
              {/* Big Number */}
              <Skeleton variant="text" width="80%" height={40} />
            </div>
          </div>
        ))}
      </div>

      {/* SECTION 2: Middle Charts Area (Split 2:1) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        
        {/* Left: Engagement Growth Chart (Takes 2 columns) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 h-[400px]">
          <div className="flex justify-between items-center mb-8">
            <div className="w-1/3">
              <Skeleton variant="text" height={32} width="80%" /> {/* Title */}
              <Skeleton variant="text" height={20} width="60%" /> {/* Subtitle */}
            </div>
            <Skeleton variant="rounded" width={120} height={36} /> {/* Dropdown */}
          </div>
          {/* Chart Area */}
          <Skeleton variant="rectangular" width="100%" height={280} className="rounded-xl" />
        </div>

        {/* Right: Platform Breakdown (Takes 1 column) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 h-[400px]">
          <Skeleton variant="text" height={32} width="70%" className="mb-6" /> {/* Title */}
          
          {/* Progress Bars List */}
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <Skeleton variant="text" width={60} />
                  <Skeleton variant="text" width={30} />
                </div>
                <Skeleton variant="rounded" width="100%" height={10} className="rounded-full" />
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
             <Skeleton variant="text" width="60%" height={20} />
          </div>
        </div>
      </div>

      {/* SECTION 3: Connected Accounts */}
      <div className="mb-6">
        <Skeleton variant="text" width={200} height={32} className="mb-6" /> {/* Section Title */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-4 mb-6">
                <Skeleton variant="circular" width={48} height={48} />
                <div className="flex-1">
                  <Skeleton variant="text" width="80%" height={20} />
                  <Skeleton variant="text" width="50%" height={16} />
                </div>
                <Skeleton variant="circular" width={4} height={20} /> {/* Menu Dots */}
              </div>
              
              <div className="pt-4 border-t border-slate-50">
                 <Skeleton variant="text" width={40} height={14} className="mb-1" /> {/* Label */}
                 <div className="flex justify-between items-end">
                    <Skeleton variant="text" width={80} height={32} />
                    <Skeleton variant="rounded" width={40} height={20} className="rounded-full" />
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </Box>
  );
}
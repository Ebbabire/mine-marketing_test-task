import { useMemo } from "react";

import { MOCK_ANALYTICS } from "../../../mocks/data/data";
import EngagementChart from "./EngagementChart";
import type { SocialAccount } from "../../../types";
import { Box, Card, Typography } from "@mui/material";

export default function DummyChartCard({accounts}:{accounts:SocialAccount[]}) {
    const totalFollowers = useMemo(() => 
        accounts.reduce((sum, acc) => sum + acc.followerCount, 0), [accounts]
      );
    return (
          <Box className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
            <Box className="xl:col-span-2">
              <EngagementChart data={MOCK_ANALYTICS} />
            </Box>
            
            <Card sx={{ p: 3, borderRadius: '1rem', border: '1px solid #e0e0e0' }} className="bg-white shadow-sm flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <Typography component="h3" sx={{fontWeight:'bold', fontSize:'20px'}} className="font-bold text-slate-900">Platform Breakdown</Typography>
                
              </div>
              <div className="space-y-6 flex-1 flex flex-col ">
                {accounts.map((acc) => (
                  <div key={acc.id} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-semibold text-slate-700 capitalize">{acc.platform}</span>
                      <span className="text-slate-500">{((acc.followerCount / totalFollowers) * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-indigo-500"
                        style={{ width: `${(acc.followerCount / totalFollowers) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                <p className="text-xs text-slate-400">Audience distributed among {accounts.length} active platforms</p>
              </div>
            </Card>
          </Box>
    )
}
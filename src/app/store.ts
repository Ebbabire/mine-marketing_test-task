import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { dashboardApi } from '../features/dashboard/slices/dashboardApi';



//  Central Redux store configuration.

export const store = configureStore({
  reducer: {
    // dashboard: dashboardReducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // RTK Query uses non-serializable values in its cache, so we allow them
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(dashboardApi.middleware),
});

// Enable refetchOnFocus and refetchOnReconnect behaviors for RTK Query.
 
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

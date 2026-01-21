import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { SocialAccount } from '../../../types';
import * as mockApi from '../../../mocks/api';


  // RTK Query API slice for dashboard accounts.
 
export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: fetchBaseQuery({
    
    baseUrl: '/api',
  }),
  tagTypes: ['Account'],
  endpoints: (builder) => ({
   
    getAccounts: builder.query<SocialAccount[], void>({
      queryFn: async () => {
        try {
          const data = await mockApi.fetchAccounts();
          return { data };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : 'Unknown error',
            },
          };
        }
      },
      providesTags: ['Account'],
    }),

    
    addAccount: builder.mutation<SocialAccount, Omit<SocialAccount, 'id'>>({
      queryFn: async (account) => {
        try {
          const data = await mockApi.createAccount(account);
          return { data };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : 'Unknown error',
            },
          };
        }
      },
      invalidatesTags: ['Account'],
    }),

    
    
    editAccount: builder.mutation<
      SocialAccount,
      { id: string; updates: Partial<Omit<SocialAccount, 'id'>> }
    >({
      queryFn: async ({ id, updates }) => {
        try {
          const data = await mockApi.updateAccount(id, updates);
          return { data };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : 'Unknown error',
            },
          };
        }
      },
      invalidatesTags: ['Account'],
    }),

   
    deleteAccount: builder.mutation<void, string>({
      queryFn: async (id) => {
        try {
          await mockApi.deleteAccount(id);
          return { data: undefined };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : 'Unknown error',
            },
          };
        }
      },
      invalidatesTags: ['Account'],
    }),
  }),
});

export const {
  useGetAccountsQuery,
  useAddAccountMutation,
  useEditAccountMutation,
  useDeleteAccountMutation,
} = dashboardApi;

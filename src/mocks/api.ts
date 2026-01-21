import type { SocialAccount } from '../types';
import { mockAccounts } from './data/data';

/**
 * Mock API Service Layer
 * 
 * This service layer simulates a real backend API for the test environment.
 * In production, these functions would make actual HTTP requests to a REST API
 * or GraphQL endpoint. Here, we use setTimeout to simulate network latency
 * (500ms delay) so we can properly test loading states, error handling, and
 * optimistic updates in our React components.
 * 
 * The functions maintain an in-memory array that gets manipulated on each call,
 * simulating how a real database would persist changes. This allows us to test
 * the full CRUD flow without needing a backend server running.
 */

// In-memory data store that simulates a database
const accountsData: SocialAccount[] = [...mockAccounts];

/**
 * Simulates a network delay to mimic real API response times.
 * This helps us test loading skeletons and ensures our UI handles async
 * operations gracefully.
 */
const simulateNetworkDelay = (): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, 500));
};

/**
 * Fetches all social media accounts.
 * 
 * In a real app, this would be a GET request to /api/accounts.
 * The 500ms delay simulates network latency so we can see loading states.
 */
export const fetchAccounts = async (): Promise<SocialAccount[]> => {
  await simulateNetworkDelay();
  return [...accountsData];
};

/**
 * Creates a new social media account.
 * 
 * In a real app, this would be a POST request to /api/accounts.
 * We generate a unique ID and add the account to our in-memory store.
 * The server would typically validate the data and return the created entity.
 */
export const createAccount = async (
  account: Omit<SocialAccount, 'id'>
): Promise<SocialAccount> => {
  await simulateNetworkDelay();

  const newAccount: SocialAccount = {
    ...account,
    id: `acc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  };

  accountsData.push(newAccount);
  return newAccount;
};

/**
 * Updates an existing social media account.
 * 
 * In a real app, this would be a PUT/PATCH request to /api/accounts/:id.
 * We find the account by ID and merge the updates. Real APIs would validate
 * the changes and return the updated entity.
 */
export const updateAccount = async (
  id: string,
  updates: Partial<Omit<SocialAccount, 'id'>>
): Promise<SocialAccount> => {
  await simulateNetworkDelay();

  const accountIndex = accountsData.findIndex((acc) => acc.id === id);
  if (accountIndex === -1) {
    throw new Error(`Account with id ${id} not found`);
  }

  accountsData[accountIndex] = {
    ...accountsData[accountIndex],
    ...updates,
  };

  return accountsData[accountIndex];
};

/**
 * Deletes a social media account.
 * 
 * In a real app, this would be a DELETE request to /api/accounts/:id.
 * We remove the account from our in-memory store. Real APIs would typically
 * return a 204 No Content or the deleted entity.
 */
export const deleteAccount = async (id: string): Promise<void> => {
  await simulateNetworkDelay();

  const accountIndex = accountsData.findIndex((acc) => acc.id === id);
  if (accountIndex === -1) {
    throw new Error(`Account with id ${id} not found`);
  }

  accountsData.splice(accountIndex, 1);
};

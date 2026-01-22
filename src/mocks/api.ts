import type { SocialAccount } from '../types';
import { mockAccounts } from './data/data';


// Mock API Service Layer

// In-memory data store that simulates a database
const accountsData: SocialAccount[] = [...mockAccounts];


const simulateNetworkDelay = (): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, 500));
};

export const fetchAccounts = async (): Promise<SocialAccount[]> => {
  await simulateNetworkDelay();
  return [...accountsData];
};

//  Creates a new social media account.
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

// Updates an existing social media account.
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

//  Deletes a social media account.
export const deleteAccount = async (id: string): Promise<void> => {
  await simulateNetworkDelay();

  const accountIndex = accountsData.findIndex((acc) => acc.id === id);
  if (accountIndex === -1) {
    throw new Error(`Account with id ${id} not found`);
  }
  accountsData.splice(accountIndex, 1);
};

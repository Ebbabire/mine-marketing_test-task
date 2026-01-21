import type { ComponentProps } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AddEditAccountModal from '../../../src/features/dashboard/components/AddEditAccountModal';
import ToastProvider from '../../../src/components/ToastProvider';
import type { SocialAccount } from '../../../src/types';

// We mock the RTK Query hooks because this test is about the UI behavior + validation,
// not RTK Query internals. Keeping the mock tight makes the test stable and focused.
const addAccountTrigger = vi.fn();
const editAccountTrigger = vi.fn();

vi.mock('../../../src/features/dashboard/slices/dashboardApi', () => ({
  useAddAccountMutation: () => [
    addAccountTrigger,
    { isLoading: false },
  ],
  useEditAccountMutation: () => [
    editAccountTrigger,
    { isLoading: false },
  ],
}));

function renderModal(props: ComponentProps<typeof AddEditAccountModal>) {
  const theme = createTheme();
  return render(
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <AddEditAccountModal {...props} />
      </ToastProvider>
    </ThemeProvider>
  );
}

describe('AddEditAccountModal', () => {
  it('prevents adding an account when that platform already exists', async () => {
    const user = userEvent.setup();

    const existingAccounts: SocialAccount[] = [
      {
        id: 'acc-1',
        platform: 'facebook',
        username: 'existing',
        displayName: 'Existing FB',
        isConnected: true,
        followerCount: 100,
      },
    ];

    // Make sure the trigger would succeed if called — then assert we never call it.
    addAccountTrigger.mockReturnValue({
      unwrap: () => Promise.resolve({}),
    });

    renderModal({
      open: true,
      onClose: vi.fn(),
      existingAccounts,
    });

    await user.type(screen.getByLabelText(/username/i), 'newuser');
    await user.type(screen.getByLabelText(/display name/i), 'New User');

    // Default platform is "facebook" → should trip the duplicate check on submit.
    await user.click(screen.getByRole('button', { name: /^add$/i }));

    expect(await screen.findByText(/already exists/i)).toBeInTheDocument();
    expect(addAccountTrigger).not.toHaveBeenCalled();
  });

  it('submits successfully in add mode and closes the modal', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    addAccountTrigger.mockReturnValue({
      unwrap: () => Promise.resolve({}),
    });

    renderModal({
      open: true,
      onClose,
      existingAccounts: [],
    });

    await user.type(screen.getByLabelText(/username/i), 'mybrand');
    await user.type(screen.getByLabelText(/display name/i), 'My Brand');
    await user.type(screen.getByLabelText(/follower count/i), '1234');

    await user.click(screen.getByRole('button', { name: /^add$/i }));

    await waitFor(() => {
      expect(addAccountTrigger).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    const payload = addAccountTrigger.mock.calls[0]?.[0];
    expect(payload).toMatchObject({
      platform: 'facebook',
      username: 'mybrand',
      displayName: 'My Brand',
      followerCount: 1234,
      isConnected: true,
    });
    // connectedAt is generated at runtime; we just assert it exists.
    expect(payload.connectedAt).toEqual(expect.any(String));
  });
});


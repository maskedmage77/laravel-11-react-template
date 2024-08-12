import { useForm } from '@inertiajs/react';
import { Button, Card, Group, Modal, Stack, Text, TextInput, Title } from '@mantine/core';
import { FormEventHandler, useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }: { className?: string }) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const passwordInput = useRef<HTMLInputElement>(null);

  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
  } = useForm({
    password: '',
  });

  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };

  const deleteUser: FormEventHandler = (e) => {
    e.preventDefault();

    destroy(route('profile.destroy'), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.current?.focus(),
      onFinish: () => reset(),
    });
  };

  const closeModal = () => {
    setConfirmingUserDeletion(false);

    reset();
  };

  return (
    <Card withBorder p="md" m="md" radius={"md"} shadow="md">
      <header>
        <Title order={2}>Delete Account</Title>

        <Text>
          Once your account is deleted, all of its resources and data will be permanently deleted. Before
          deleting your account, please download any data or information that you wish to retain.
        </Text>
      </header>

      <Button bg="red" mt="md" w="fit-content" onClick={confirmUserDeletion}>Delete Account</Button>

      <Modal opened={confirmingUserDeletion} onClose={closeModal} title="Confirm Deletion">
        <form onSubmit={deleteUser}>

          <Stack>
            <Text>
              Once your account is deleted, all of its resources and data will be permanently deleted. Please
              enter your password to confirm you would like to permanently delete your account.
            </Text>

            <TextInput
              id="password"
              type="password"
              name="password"
              label="Password"
              ref={passwordInput}
              error={errors.password}
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              placeholder="Password"
            />

            <Group>
              <Button onClick={closeModal}>Cancel</Button>

              <Button bg="red" type="submit" disabled={processing}>
                Delete Account
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </Card>
  );
}

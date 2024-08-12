import { useRef, FormEventHandler } from 'react';
import { useForm } from '@inertiajs/react';
import { Card, Title, Text, TextInput, Button, Stack, Transition } from '@mantine/core';

export default function UpdatePasswordForm({ className = '' }: { className?: string }) {
  const passwordInput = useRef<HTMLInputElement>(null);
  const currentPasswordInput = useRef<HTMLInputElement>(null);

  const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const updatePassword: FormEventHandler = (e) => {
    e.preventDefault();

    put(route('password.update'), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: (errors) => {
        if (errors.password) {
          reset('password', 'password_confirmation');
          passwordInput.current?.focus();
        }

        if (errors.current_password) {
          reset('current_password');
          currentPasswordInput.current?.focus();
        }
      },
    });
  };

  return (
    <Card withBorder p="md" m="md" radius={"md"} shadow="md">

      <header>
        <Title order={2}>Update Password</Title>

        <Text>
          Ensure your account is using a long, random password to stay secure.
        </Text>
      </header>

      <form onSubmit={updatePassword}>

        <Stack mt="md">

          <TextInput
            label="Current Password"
            id="current_password"
            ref={currentPasswordInput}
            value={data.current_password}
            onChange={(e) => setData('current_password', e.target.value)}
            type="password"
            className="mt-1 block w-full"
            autoComplete="current-password"
            error={errors.current_password}
          />

          <TextInput
            label="New Password"
            id="password"
            ref={passwordInput}
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            type="password"
            className="mt-1 block w-full"
            autoComplete="new-password"
            error={errors.password}
          />

          <TextInput
            label="Confirm Password"
            id="password_confirmation"
            value={data.password_confirmation}
            onChange={(e) => setData('password_confirmation', e.target.value)}
            type="password"
            className="mt-1 block w-full"
            autoComplete="new-password"
            error={errors.password_confirmation}
          />

          <Button disabled={processing} type="submit" style={{
            width: 'fit-content'
          }}>
            Save
          </Button>

        </Stack>

        <Transition
          mounted={recentlySuccessful}
          transition="fade"
          duration={400}
          timingFunction="ease"
        >
         {(styles) => 
           <Text mt="md" style={styles}>Saved.</Text>
         }
        </Transition>

      </form>

    </Card>
  );
}

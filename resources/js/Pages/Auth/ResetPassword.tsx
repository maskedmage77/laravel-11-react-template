import { TextInput, Button, Group, Stack } from '@mantine/core';
import { Head, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { FormEventHandler } from 'react';

export default function ResetPassword({ token, email }: { token: string, email: string }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token: token,
    email: email,
    password: '',
    password_confirmation: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('password.store'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  return (
    <GuestLayout>

      <Head title="Reset Password" />

      <form onSubmit={submit} style={{ width: "100%" }}>

        <Stack>

          <TextInput
            label="Email"
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            onChange={(e) => setData('email', e.target.value)}
            error={errors.email}
          />

          <TextInput
            label="Password"
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="new-password"
            onChange={(e) => setData('password', e.target.value)}
            error={errors.password}
          />

          <TextInput
            label="Confirm Password"
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            className="mt-1 block w-full"
            autoComplete="new-password"
            onChange={(e) => setData('password_confirmation', e.target.value)}
            error={errors.password_confirmation}
          />

          <Group justify="flex-end">
            <Button className="ms-4" disabled={processing}>
              Reset Password
            </Button>
          </Group>

        </Stack>

      </form>

    </GuestLayout>
  );
}

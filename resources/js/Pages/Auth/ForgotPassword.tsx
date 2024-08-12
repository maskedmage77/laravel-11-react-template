import { TextInput, Button, Text, Group, Stack } from '@mantine/core';
import { Head, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { FormEventHandler } from 'react';

export default function ForgotPassword({ status }: { status?: string }) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('password.email'));
  };

  return (
    <GuestLayout>

      <Head title="Forgot Password" />

      <Text size="sm">
        Forgot your password? No problem. Just let us know your email address and we will email you a password
        reset link that will allow you to choose a new one.
      </Text>

      {status && <Text c="green" size="sm">{status}</Text>}

      <form onSubmit={submit} style={{ width: "100%" }}>

        <Stack>
          <TextInput
            label="Email"
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            onChange={(e) => setData('email', e.target.value)}
            error={errors.email}
          />


          <Group justify="flex-end">
            <Button className="ms-4" disabled={processing}>
              Email Password Reset Link
            </Button>
          </Group>
        </Stack>
      </form>
    </GuestLayout>
  );
}

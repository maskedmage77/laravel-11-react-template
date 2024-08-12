import { TextInput, Checkbox, Button, Text, Group, Stack } from '@mantine/core';
import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { FormEventHandler } from 'react';

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword: boolean }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('login'), {
      onFinish: () => reset('password'),
    });
  };

  return (
    <GuestLayout>
      <Head title="Log in" />

      {status && <Text c="green" size="sm">{status}</Text>}

      <form onSubmit={submit} style={{
        width: '100%',
      }}>

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
            autoComplete="current-password"
            onChange={(e) => setData('password', e.target.value)}
            error={errors.password}
          />

          <Checkbox
            name="remember"
            checked={data.remember}
            onChange={(e) => setData('remember', e.target.checked)}
            label="Remember me"
          />

        </Stack>

        <Group justify="flex-end">
          {canResetPassword && (
            <Text td="underline">
              <Link href={route('password.request')}>
                Forgot your password?
              </Link>
            </Text>
          )}

          <Button disabled={processing} type="submit">
            Log in
          </Button>
        </Group>
      </form>
    </GuestLayout>
  );
}

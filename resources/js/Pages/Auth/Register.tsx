import { TextInput, Button, Text, Group, Stack } from '@mantine/core';
import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { FormEventHandler } from 'react';

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  return (
    <GuestLayout>

      <Head title="Register" />

      <form onSubmit={submit} style={{
        width: '100%',
      }}>

        <Stack>

          <TextInput
            label="Name"
            id="name"
            name="name"
            value={data.name}
            autoComplete="name"
            onChange={(e) => setData('name', e.target.value)}
            required
            error={errors.name}
          />

          <TextInput
            label="Email"
            id="email"
            type="email"
            name="email"
            value={data.email}
            autoComplete="username"
            onChange={(e) => setData('email', e.target.value)}
            required
            error={errors.email}
          />

          <TextInput
            label="Password"
            id="password"
            type="password"
            name="password"
            value={data.password}
            autoComplete="new-password"
            onChange={(e) => setData('password', e.target.value)}
            required
            error={errors.password}
          />

          <TextInput
            label="Confirm Password"
            id="password_confirmation"
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            autoComplete="new-password"
            onChange={(e) => setData('password_confirmation', e.target.value)}
            required
            error={errors.password_confirmation}
          />

          <Group justify="flex-end">
            <Text>
              <Link
                href={route('login')}
              >
                Already registered?
              </Link>
            </Text>

            <Button disabled={processing} type="submit">
              Register
            </Button>
          </Group>

        </Stack>

      </form>

    </GuestLayout>
  );
}

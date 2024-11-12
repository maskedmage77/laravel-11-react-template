import { Button, PasswordInput, Stack, TextInput } from '@mantine/core';
import { router, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { User } from '@/Types/User';

export default function UserEditForm({ user }: { user: User }) {
  
  const { data, setData, processing, errors, put } = useForm({
    name: user.name,
    email: user.email,
    password: '',
    password_confirmation: ''
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    put(route('users.update', user.id), {
      preserveScroll: true,
      onSuccess: () => router.get('/users')
    });
  };

  return (
    <>
      <form onSubmit={submit} style={{
        width: '100%',
      }}>

        <Stack>

          <TextInput
            label="Name"
            id="name"
            name="name"
            value={data.name}
            autoComplete="Name"
            onChange={(e) => setData('name', e.target.value)}
            required
            error={errors.name}
          />

          <TextInput
            label="Email Address"
            id="email"
            name="email"
            value={data.email}
            autoComplete="Email"
            onChange={(e) => setData('email', e.target.value)}
            required
            error={errors.email}
          />

          <PasswordInput
            label="Password"
            id="password"
            name="password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            description="Prior password is kept if left unchanged"
            error={errors.password}
          />

          <PasswordInput
            label="Confirm Password"
            id="password_confirmation"
            name="password_confirmation"
            value={data.password_confirmation}
            onChange={(e) => setData('password_confirmation', e.target.value)}
            description="Prior password is kept if left unchanged"
            error={errors.password}
          />

          <Button w="fit-content" disabled={processing} type="submit">
            Edit
          </Button>

        </Stack>
      </form>
    </>
  );
}
import { TextInput, Button, Text, Group, Stack } from '@mantine/core';
import { Head, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { FormEventHandler } from 'react';


export default function ConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm({
    password: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('password.confirm'), {
      onFinish: () => reset('password'),
    });
  };

  return (
    <GuestLayout>
      <Head title="Confirm Password" />

      <Text size='sm'>
        This is a secure area of the application. Please confirm your password before continuing.
      </Text>

      <form onSubmit={submit} style={{ width: '100%' }}>

        <Stack>

          <TextInput
            label="Password"
            id="password"
            type="password"
            name="password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            error={errors.password}
          />

          <Group justify='flex-end'>
            <Button disabled={processing}>
              Confirm
            </Button>
          </Group>

        </Stack>
      </form>
    </GuestLayout>
  );
}

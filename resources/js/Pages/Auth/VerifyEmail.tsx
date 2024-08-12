import GuestLayout from '@/Layouts/GuestLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { Button, Group, Text } from '@mantine/core';
import { FormEventHandler } from 'react';

export default function VerifyEmail({ status }: { status?: string }) {
  const { post, processing } = useForm({});

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('verification.send'));
  };

  return (
    <GuestLayout>
      <Head title="Email Verification" />

      <Text>
        Thanks for signing up! Before getting started, could you verify your email address by clicking on the
        link we just emailed to you? If you didn't receive the email, we will gladly send you another.
      </Text>

      {status === 'verification-link-sent' && (
        <Text c="green" size="sm">
          A new verification link has been sent to the email address you provided during registration.
        </Text>
      )}

      <form onSubmit={submit}>
        <Group>

          <Button disabled={processing} type="submit">Resend Verification Email</Button>

          <Button onClick={() => {
            router.visit('logout', { method: 'post' });
          }}>
            Log Out
          </Button>

        </Group>
      </form>
    </GuestLayout>
  );
}

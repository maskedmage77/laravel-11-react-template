import { PageProps } from '@/Types';
import { router, useForm, usePage } from '@inertiajs/react';
import { Button, Card, Stack, Text, TextInput, Title, Transition } from '@mantine/core';
import { FormEventHandler } from 'react';

export default function UpdateProfileInformation({ mustVerifyEmail, status }: { mustVerifyEmail: boolean, status?: string, className?: string }) {

  const user = usePage<PageProps>().props.auth.user;

  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
    name: user.name,
    email: user.email,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    patch(route('profile.update'));
  };


  return (
    <Card withBorder p="md" m="md" radius={"md"} shadow="md">
      <header>
        <Title order={2}>Profile Information</Title>

        <Text>
          Update your account's profile information and email address.
        </Text>
      </header>

      <form onSubmit={submit}>

        <Stack mt="md">

          <TextInput
            label="Name"
            id="name"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            required
            autoComplete="name"
            error={errors.name}
          />

          <TextInput
            label="Email"
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            required
            autoComplete="username"
            error={errors.email}
          />

          {mustVerifyEmail && user.email_verified_at === null && (
            <Stack>
              Your email address is unverified.
              <Button
                onClick={() => {
                  router.post(route('verification.send'))
                }}
              >
                Click here to re-send the verification email.
              </Button>

              {status === 'verification-link-sent' && (
                <Text c="green">
                  A new verification link has been sent to your email address.
                </Text>
              )}
            </Stack>
          )}

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

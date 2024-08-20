import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import DeleteUserForm from './Partials/DeleteUserForm';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/Types';
import { Grid } from '@mantine/core';

export default function Edit({ auth, mustVerifyEmail, status }: PageProps<{ mustVerifyEmail: boolean, status?: string }>) {
  return (
    <AuthenticatedLayout
      user={auth.user}
    >
      <Head title="Profile" />

      <Grid gutter={0}>
        <Grid.Col span={{ base: 12, lg: 6, xl: 4 }}>
          <UpdateProfileInformationForm
            mustVerifyEmail={mustVerifyEmail}
            status={status}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 6, xl: 4 }}>
          <UpdatePasswordForm className="max-w-xl" />
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 6, xl: 4 }}>
          <DeleteUserForm className="max-w-xl" />
        </Grid.Col>
      </Grid>
    </AuthenticatedLayout>
  );
}

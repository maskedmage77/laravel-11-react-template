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
      auth={auth}
    >
      <Head title="Profile" />

      <Grid gutter={0}>
        <Grid.Col>
          <UpdateProfileInformationForm
            mustVerifyEmail={mustVerifyEmail}
            status={status}
          />
        </Grid.Col>
        <Grid.Col>
          <UpdatePasswordForm />
        </Grid.Col>

        <Grid.Col>
          <DeleteUserForm />
        </Grid.Col>
      </Grid>
    </AuthenticatedLayout>
  );
}

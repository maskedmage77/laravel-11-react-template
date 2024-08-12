import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import UserEditForm from '@/Components/UserEditForm';
import { Card, Title } from '@mantine/core';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { User } from '@/types/User';

export default function Edit({ auth, user }: PageProps<{ user: User }>) {
  return (
    <AuthenticatedLayout
      user={auth.user}
    >

      <Head title="Edit Users" />

      <Title>
        Edit User
      </Title>

      <Card withBorder p="md" m="md" radius={"md"} shadow="md">
        <UserEditForm user={user} />
      </Card>

    </AuthenticatedLayout>
  )
}
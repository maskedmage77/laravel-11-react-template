import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import UserCreateForm from '@/Components/UserCreateForm';
import { Card, Title } from '@mantine/core';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/Types';

export default function Create({ auth }: PageProps) {
  return (
    <AuthenticatedLayout
      user={auth.user}
    >

      <Head title="Create Users" />

      <Title>
        Create User
      </Title>

      <Card withBorder p="md" m="md" radius={"md"} shadow="md">
        <UserCreateForm />
      </Card>

    </AuthenticatedLayout>
  )
}

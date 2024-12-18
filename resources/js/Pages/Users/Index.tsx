import deleteConfirmationModal from '@/Components/Modals/deleteConfirmationModal';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ActionIcon, Card, Group, Title } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { Head, router } from '@inertiajs/react';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { PageProps } from '@/Types';
import { User } from '@/Types/User';

export default function Index({ auth, users }: PageProps<{ users: User[] }>) {
  const PAGE_SIZE = 15;
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(users.slice(0, PAGE_SIZE));

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(users.slice(from, to));
  }, [page, users]);

  return (
    <AuthenticatedLayout
      auth={auth}>

      <Head title="Users" />

      <Card withBorder p="md" m="md" radius={"md"} shadow="md">

        <Title pb="md">
          Users
        </Title>

        <DataTable
          backgroundColor={{ dark: 'rgba(0,0,0,0)', light: 'rgba(0,0,0,0)' }}
          withColumnBorders
          records={records}
          columns={[{ accessor: 'name' },
          { accessor: 'email' },
          { 
            accessor: 'created_at',
            render: (user: User) => new Date(user.created_at).toLocaleDateString()
          },
          { 
            accessor: 'updated_at',
            render: (user: User) => new Date(user.updated_at).toLocaleDateString()
          },
          {
            accessor: 'actions',
            render: (user: User) => (
              <Group>
                <ActionIcon
                  variant="filled"
                  aria-label="Settings"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    router.get(route('users.edit', user.id))
                  }}
                >
                  <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
                <ActionIcon
                  variant="filled"
                  color="red"
                  aria-label="Settings"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    deleteConfirmationModal({
                      objectName:user.name,
                      onConfirm: () => router.delete(route('users.destroy', user.id))
                    })
                  }}
                >
                  <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
              </Group>
            )
          }
          ]}
          totalRecords={users.length}
          recordsPerPage={PAGE_SIZE}
          page={page}
          onPageChange={(p) => setPage(p)}
          paginationSize='md'
        />

      </Card>

    </AuthenticatedLayout>
  )
}

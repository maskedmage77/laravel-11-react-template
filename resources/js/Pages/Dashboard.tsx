import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/Types';

export default function Dashboard({ auth }: PageProps) {

  return (
    <AuthenticatedLayout
      auth={auth}
    >
      <Head title="Dashboard" />
    </AuthenticatedLayout>
  );
}

import { AppShell, Group, useMantineColorScheme, Text } from "@mantine/core";
import { IconUsers } from '@tabler/icons-react';
import useUserStore from "@/Hooks/useUserStore";
import { router } from "@inertiajs/react";
import styles from './Navbar.module.css';

const linkData = [
  {
    label: 'Users',
    icon: IconUsers,
    link: '/users',
    requiredPermissions: ['view users'],
  }
];

export default function Navbar() {

  const colorScheme = useMantineColorScheme().colorScheme;
  const { permissions } = useUserStore();

  console.log(window.location.pathname);

  return (
    <AppShell.Navbar
      p="md"
      style={{
        backgroundColor: colorScheme === "dark"
        ? 'var(--mantine-color-dark-7)'
        : 'var(--mantine-color-gray-1)'
      }}
    >
      { linkData.map((link, index) => {
        if ( link.requiredPermissions && !link.requiredPermissions.some(permission => permissions.includes(permission))) {
          return null;
        } else {
          return (
            <Group
              key={index}
              gap="md"
              align="center"
              className={styles.link}
              onClick={() => router.get(link.link)}
            >
              <link.icon
                style={{
                  color: window.location.pathname === link.link
                    ? 'var(--mantine-color-green-5)'
                    : undefined,
                }}
                size={20}
              />
              <Text 
                c={
                  window.location.pathname === link.link
                  ? 'green.4'
                  : undefined
                }
              >
                {link.label}
              </Text>
            </Group>
          )}
      })}
    </AppShell.Navbar>
  )
}
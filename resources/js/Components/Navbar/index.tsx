import { AppShell, Group, useMantineColorScheme, Text, rem } from "@mantine/core";
import { IconUsers } from '@tabler/icons-react';

const linkData = [
  {
    label: 'Users',
    icon: IconUsers,
    link: '/users',
  }
];

export default function Navbar() {

  const colorScheme = useMantineColorScheme().colorScheme;
  
  
  return (
    <AppShell.Navbar
      p="md"
      style={{
        backgroundColor: colorScheme === "dark" ? 'var(--mantine-color-dark-7)' : 'var(--mantine-color-gray-1)'
      }}
    >
      { linkData.map((link, index) => (
        <Group
          key={index}
          gap="md"
          align="center"
          style={{
            cursor: 'pointer',
            padding: '8px 16px',
            backgroundColor: colorScheme === "dark" ? 'var(--mantine-color-dark-8)' : 'var(--mantine-color-gray-2)',
            borderRadius: rem(8),
          }}
        >
          <link.icon
            style={{
              color: 'var(--mantine-color-green-5)',
            }}
            size={20}
          />
          <Text 
            c={'green.4'}
          >
            {link.label}
          </Text>
        </Group>
      )) }
    </AppShell.Navbar>
  )
}
import { ActionIcon, AppShell, Burger, Group, Menu, rem, Text, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { PropsWithChildren, ReactNode, useEffect } from 'react';
import { IconLogout, IconUser } from '@tabler/icons-react';
import useUserStore from '@/Hooks/useUserStore';
import { useDisclosure } from '@mantine/hooks';
import { router } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

interface Props extends PropsWithChildren {
  auth: any;
  header?: ReactNode;
  children: ReactNode;
}

export default function Authenticated({ auth, children }: Props) {

  const [opened, { toggle }] = useDisclosure();
  const colorScheme = useMantineColorScheme().colorScheme;
  const theme = useMantineTheme();

  useEffect(() => {
    useUserStore.setState({ ...auth });
  }, [auth]);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header
        style={{
          backgroundColor: colorScheme === "dark" 
          ? 'var(--mantine-color-dark-7)'
          : 'var(--mantine-color-gray-1)'
        }}
      >

        <Group gap="md" px="md" justify="space-between" style={{
          height: '100%',
        }}>

          {/* Right Group */}
          <Group>

            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />

            <Text
              gradient={{ from: 'teal.4', to: 'blue.7', deg: 180 }}
              style={{
                fontSize: '1.5rem',
                cursor: 'pointer',
              }}
              c={theme.primaryColor}
              fw={700}
              onClick={() => router.get('/')}
            >
              Laravel 11 Mantine
            </Text>

          </Group>

          {/* Left Group */}
          <Group>

            <Menu position="bottom-end">

              <Text size='sm' c="dimmed" visibleFrom="sm">
                {auth.user.email}
              </Text>

              <Menu.Target>
                <ActionIcon variant="outline" aria-label="Settings">
                  <IconUser style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>

                <Menu.Item
                  leftSection={
                    <IconUser style={{ width: rem(14), height: rem(14) }} />
                  }
                  onClick={() => {
                    router.get(route('profile.edit'))
                  }}
                >
                  Profile
                </Menu.Item>

                <Menu.Item
                  color="red"
                  leftSection={
                    <IconLogout style={{ width: rem(14), height: rem(14) }} />
                  }
                  onClick={() => {
                    router.post(route('logout'))
                  }}
                >
                  Logout
                </Menu.Item>

              </Menu.Dropdown>

            </Menu>

          </Group>

        </Group>

      </AppShell.Header>

      <Navbar/>

      <AppShell.Main>
        {children}
      </AppShell.Main>

    </AppShell>
  );
}

import { Card, Stack, Text, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { router } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {

  const colorScheme = useMantineColorScheme().colorScheme;
  const theme = useMantineTheme();

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      backgroundColor: colorScheme === "dark" ? 'var(--mantine-color-dark-8)' : 'var(--mantine-color-gray-1)'
    }}>
      <Card w={480} withBorder p="md" m="md" radius={"md"} shadow="md">
        <Stack align='center'>
          <Text
            gradient={{ from: 'teal.4', to: 'blue.7', deg: 180 }}
            style={{
              fontSize: '2rem',
              cursor: 'pointer',
            }}
            fw={700}
            c={theme.primaryColor}
            onClick={() => router.get('/')}
          >
            Laravel 11 Mantine
          </Text>
          {children}
        </Stack>
      </Card>
    </div>
  );
}

import { AppShell, useMantineColorScheme } from "@mantine/core";
import { IconUsers } from '@tabler/icons-react';
import { LinksGroup } from "./NavbarLinksGroup";

const linkData = [
  {
    label: 'Users',
    icon: IconUsers,
    link: '/users',
    links: [
      { label: 'Create User', link: '/users/create' }
    ]
  }
];

export default function Navbar() {

  const colorScheme = useMantineColorScheme().colorScheme;

  const links = linkData.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <AppShell.Navbar
      p="md"
      style={{
        backgroundColor: colorScheme === "dark" ? 'var(--mantine-color-dark-7)' : 'var(--mantine-color-gray-1)'
      }}
    >
      <div>{links}</div>
    </AppShell.Navbar>
  )
}
import { createTheme, MantineProvider, Input, Checkbox, Card } from '@mantine/core';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createInertiaApp } from '@inertiajs/react';
import { ModalsProvider } from '@mantine/modals';
import { createRoot } from 'react-dom/client';
import 'mantine-datatable/styles.layer.css';
import '@mantine/core/styles.css';
import '../css/app.css';
import './bootstrap';

createInertiaApp({
  title: (title) => `${title} - Laravel 11 Mantine`,
  resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
  setup({ el, App, props }) {
    const root = createRoot(el);

    let darkEnabled = true;

    const theme = createTheme({
      primaryColor: 'blue',
      colors: {
        gray: ["#f8f8f8", "#f3f3f3", "#e9e9e9", "#cecece", "#adadad", "#868686", "#494949", "#343434", "#212121", "#111111"]
      },
      components: {
        Input: Input.extend({
          styles: {
            input: { 
              // @ts-ignore
              // backgroundColor: darkEnabled ? 'var(--mantine-color-dark-5)' : 'var(--mantine-color-gray-2)'
            }
          }
        }),
        Checkbox: Checkbox.extend({
          styles: {
            input: { 
              // @ts-ignore
              // backgroundColor: darkEnabled ? 'var(--mantine-color-dark-5)' : 'var(--mantine-color-gray-2)'
            }
          }
        }),
        Card: Card.extend({
          styles: {
            root: { 
              // @ts-ignore
              backgroundColor: darkEnabled ? 'var(--mantine-color-dark-7)' : 'var(--mantine-color-gray-1)'
            }
          }
        })
      }
    })

    root.render(
      <MantineProvider
        defaultColorScheme={darkEnabled ? 'dark' : 'light'}
        theme={theme}
      >
        <ModalsProvider>
          <App {...props} />
        </ModalsProvider>
      </MantineProvider>
    );
  },
  progress: {
    color: '#4B5563',
  },
});

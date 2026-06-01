import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@kemuridama/storybook-addon-github',
    'storybook-addon-tag-badges',
    '@storybook/addon-docs',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  staticDirs: ['../public'],
  docs: {
    defaultName: 'Docs',
  },
  managerHead: (head) => `
    ${head}
    <link rel="icon" href="/favicon.ico" sizes="any">
  `,
}
export default config

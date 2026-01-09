import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials'],

  async viteFinal(config) {
    // Dynamically import Vite plugin because it's ESM-only while Storybook is CJS.
    const { default: tailwindcss } = await import('@tailwindcss/vite');

    config.plugins ??= [];
    config.plugins.push(tailwindcss());
    return config;
  },
};

export default config;

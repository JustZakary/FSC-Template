var isDev = false;

import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import css from 'rollup-plugin-css-only';
import svelte from 'rollup-plugin-svelte';

const plugins = [json(), css({output: 'bundle.css'}), resolve({browser: true, dedupe: ['svelte']}), commonjs()];

export default (args) => {
  plugins.push(
    svelte({
      compilerOptions: {
        dev: false,
      },
    })
  );

  return [
    {
      input: './svelte/main.js',
      output: {
        sourcemap: true,
        name: 'samara',
        format: 'iife',
        file: './www/bundle.js',
      },
      plugins: plugins,
      watch: {
        clearScreen: false,
      },
    },
  ];
};

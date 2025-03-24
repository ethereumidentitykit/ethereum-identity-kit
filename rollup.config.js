import dts from 'rollup-plugin-dts'
import image from '@rollup/plugin-image'
import terser from '@rollup/plugin-terser'
import postcss from 'rollup-plugin-postcss'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

const packageJson = require('./package.json')

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      peerDepsExternal(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
      postcss({
        extract: true,
        minimize: true,
      }),
      image(),
    ],
    external: ['react', 'react-dom'],
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/types.d.ts', format: 'esm' }],
    plugins: [dts.default(), postcss({ extract: true, minimize: true })],
  },
  // {
  //   input: 'src/hooks/index.ts',
  //   output: [{ file: 'dist/esm/hooks/index.js', format: 'esm' }],
  //   plugins: [
  //     resolve(),
  //     peerDepsExternal(),
  //     typescript({ tsconfig: './tsconfig.json' }),
  //     terser(),
  //     postcss({
  //       extract: true,
  //       minimize: true,
  //     }),
  //     image(),
  //   ],
  // },
  {
    input: 'src/utils/index.ts',
    output: [{ file: 'dist/esm/utils/index.js', format: 'esm' }],
    plugins: [
      resolve(),
      peerDepsExternal(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
      postcss({
        extract: true,
        minimize: true,
      }),
      image(),
    ],
  },
  // {
  //   input: 'src/constants/index.ts',
  //   output: [{ file: 'dist/esm/constants/index.js', format: 'esm' }],
  //   plugins: [
  //     resolve(),
  //     peerDepsExternal(),
  //     typescript({ tsconfig: './tsconfig.json' }),
  //     terser(),
  //     postcss({
  //       extract: true,
  //       minimize: true,
  //     }),
  //     image(),
  //   ],
  // },
  // {
  //   input: 'src/components/index.ts',
  //   output: [{ file: 'dist/esm/components/index.js', format: 'esm' }],
  //   plugins: [
  //     resolve(),
  //     peerDepsExternal(),
  //     typescript({ tsconfig: './tsconfig.json' }),
  //     terser(),
  //     postcss({
  //       extract: true,
  //       minimize: true,
  //     }),
  //     image(),
  //   ],
  // },
]

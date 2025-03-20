import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import mdx from '@mdx-js/loader';

// Define the configuration for Rollup
export default {
  // Specify the entry point for the bundle
  input: 'src/index.ts',
  
  // Define the output formats and files
  output: [
    {
      // Create a CommonJS bundle
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      // Create an ES module bundle
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  
  // Define the plugins used for the build process
  plugins: [
    // Exclude peer dependencies from the bundle
    peerDepsExternal(),
    
    // Resolve external dependencies
    resolve(),
    
    // Convert CommonJS modules to ES modules
    commonjs(),
    
    // Process MDX files
    {
      name: 'mdx',
      transform(code, id) {
        if (id.endsWith('.mdx')) {
          return mdx.call(this, code);
        }
      }
    },
    
    // Compile TypeScript code
    typescript({
      // Use the tsconfig.json file for configuration
      tsconfig: './tsconfig.json',
      
      // Generate type declarations
      declaration: true,
      
      // Output type declarations to the dist directory
      declarationDir: 'dist',
      
      // Exclude stories and tests from the build
      exclude: ['**/*.stories.tsx', '**/*.test.tsx'],
    }),
    
    // Transpile code using Babel
    babel({
      // Exclude node_modules from transpilation
      exclude: 'node_modules/**',
      
      // Use bundled Babel helpers
      babelHelpers: 'bundled',
      
      // Specify the file extensions to transpile
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
  ],
  
  // Specify external dependencies that should not be bundled
  external: ['react', 'react-dom', '@emotion/react', '@emotion/styled', '@mui/material'],
};

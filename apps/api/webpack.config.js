const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = (options, context) => {
  const isServe = context.configurationName === 'development';
  
  return {
    output: {
      path: join(__dirname, '../../dist/apps/api'),
    },
    watchOptions: {
      ignored: [
        '**/dist/**',
        '**/node_modules/**',
        '**/.nx/**',
        '**/coverage/**',
        '**/tmp/**',
        '**/.git/**',
      ],
      aggregateTimeout: 300,
      poll: false,
    },
    plugins: [
      new NxAppWebpackPlugin({
        target: 'node',
        compiler: 'tsc',
        main: './src/main.ts',
        tsConfig: './tsconfig.app.json',
        assets: ['./src/assets'],
        optimization: false,
        outputHashing: 'none',
        generatePackageJson: true,
      }),
    ],
    // Add development server configuration
    ...(isServe && {
      devServer: {
        static: false,
        hot: false,
        liveReload: false,
        watchFiles: {
          paths: ['src/**/*'],
          options: {
            ignored: [
              '**/dist/**',
              '**/node_modules/**',
              '**/.nx/**',
              '**/coverage/**',
              '**/tmp/**',
              '**/.git/**',
            ],
          },
        },
      },
    }),
  };
};

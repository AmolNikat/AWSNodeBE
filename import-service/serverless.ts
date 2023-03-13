import type { AWS } from '@serverless/typescript';
import config from './src/config';

import importProductsFile from '@functions/importProductsFile';

const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'ap-south-1',
    httpApi: {
      cors: true
    },
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 's3:ListBucket',
        Resource: `arn:aws:s3:::${config.BUCKET}`
      },
      {
        Effect: 'Allow',
        Action: 's3:*',
        Resource: `arn:aws:s3:::${config.BUCKET}/*`,
      }
    ]
  },
  // import the function via paths
  functions: { importProductsFile },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  useDotenv: true
};

module.exports = serverlessConfiguration;
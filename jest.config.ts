import type { Config } from '@jest/types';

const esModules = ["uuid"].join("|");

// Sync object
const config: Config.InitialOptions = {
    transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
    verbose: true,
    testEnvironment: 'jsdom',
};

export default config;
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type UserConfig } from 'vitest/config';

export default defineConfig({
  // NOTE: 사용 버전에 타입 추론 에러 존재
  // TODO: vitest 메이저 버전 올리기
  // https://github.com/vitest-dev/vitest/issues/4048#issuecomment-1855141674
  plugins: [react() as UserConfig['plugins']],
  test: {
    environment: 'jsdom',
    include: ['**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      enabled: true,
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
    },
    setupFiles: './vitest.setup.ts',
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
});

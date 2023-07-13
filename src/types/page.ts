import { type ComponentProps, type ReactElement } from 'react';
import { type GetServerSideProps, type NextPage } from 'next';
import { type DehydratedState } from '@tanstack/react-query';

import type SEO from '~/components/SEO/SEO';

export type NextPageWithLayout<P = unknown> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactElement;
};

export type GetServerSidePropsWithDehydratedState<P extends { [key: string]: unknown }> = GetServerSideProps<
  { dehydratedState: DehydratedState } & P
>;

type SeoComponentProps = ComponentProps<typeof SEO>;

export type GetServerSidePropsWithDehydratedStateAndSEO<P extends { [key: string]: unknown }> = GetServerSideProps<
  { dehydratedState: DehydratedState; seo: SeoComponentProps } & P
>;

import { type ComponentProps, type ReactElement } from 'react';
import { type GetServerSideProps, type NextPage } from 'next';
import { type DehydratedState } from '@tanstack/react-query';

import type SEO from '~/components/SEO/SEO';

export type NextPageWithLayout<P = unknown> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactElement;
};

type SeoComponentProps = ComponentProps<typeof SEO>;

export type WithSeoProps<P = unknown> = P & { seo: ComponentProps<typeof SEO> };

export type GetServerSidePropsWithDehydratedState<P = unknown> = GetServerSideProps<
  { dehydratedState: DehydratedState } & P
>;

export type GetServerSidePropsWithDehydratedStateAndSEO<P = unknown> = GetServerSideProps<
  { dehydratedState: DehydratedState; seo: SeoComponentProps } & P
>;

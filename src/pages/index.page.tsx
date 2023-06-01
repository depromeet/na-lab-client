import { type ReactElement } from 'react';

import LayoutPaddingTo23 from '~/components/layout/LayoutPaddingTo23';

import Login from './login.page';

export default function Home() {
  return (
    <div>
      <Login />
    </div>
  );
}

Home.getLayout = (page: ReactElement) => <LayoutPaddingTo23>{page}</LayoutPaddingTo23>;

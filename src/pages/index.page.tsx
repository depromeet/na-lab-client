import { type ReactElement } from 'react';

import LayoutPaddingTo23 from '~/components/layout/LayoutPaddingTo23';

export default function Home() {
  return <div>home</div>;
}

Home.getLayout = (page: ReactElement) => <LayoutPaddingTo23>{page}</LayoutPaddingTo23>;

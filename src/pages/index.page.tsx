import { type ReactElement } from 'react';

import LayoutPaddingTo23 from '~/components/layout/LayoutPaddingTo23';
import ChangeQuestion from '~/features/changeQuestion/ChangeQuestion';

export default function Home() {
  return (
    <div>
      <ChangeQuestion />
    </div>
  );
}

Home.getLayout = (page: ReactElement) => <LayoutPaddingTo23>{page}</LayoutPaddingTo23>;

import { type ReactElement } from 'react';

import LayoutPaddingTo23 from '~/components/layout/LayoutPaddingTo23';

import FeedbackList from './feedbacklist/index.page';

export default function Home() {
  return (
    <div>
      <FeedbackList />
    </div>
  );
}

Home.getLayout = (page: ReactElement) => <LayoutPaddingTo23>{page}</LayoutPaddingTo23>;

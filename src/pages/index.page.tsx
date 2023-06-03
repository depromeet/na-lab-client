import { type ReactElement } from 'react';
import Link from 'next/link';

import LayoutPaddingTo23 from '~/components/layout/LayoutPaddingTo23';

export default function Home() {
  return (
    <div>
      <Link href="/review/foo-bar">foo</Link>
      <Link href="/survey">나만의 질문 만들기</Link>

      {/* <ChangeQuestion /> */}
    </div>
  );
}

Home.getLayout = (page: ReactElement) => <LayoutPaddingTo23>{page}</LayoutPaddingTo23>;

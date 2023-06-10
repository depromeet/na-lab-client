import { type ReactElement } from 'react';
import Link from 'next/link';

import LayoutPaddingTo23 from '~/components/layout/LayoutPaddingTo23';

export default function Home() {
  return (
    <ul>
      <li>
        <Link href="/review/foo-bar">foo</Link>
      </li>
      <li>
        <Link href="/survey">나만의 질문 만들기</Link>
      </li>

      {/* <ChangeQuestion /> */}
    </ul>
  );
}

Home.getLayout = (page: ReactElement) => <LayoutPaddingTo23>{page}</LayoutPaddingTo23>;

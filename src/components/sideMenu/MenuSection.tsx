import Link from 'next/link';
import { css } from '@emotion/react';

import BookmarkIcon from '~/components/icons/BookmarkIcon';

const MENU_LIST: {
  id: string;
  label: string;
  href: string;
}[] = [
  {
    id: 'bookmark-card',
    label: '저장한 명함',
    href: '/gallery/bookmarks',
  },
  {
    id: 'logout',
    label: '로그아웃',
    href: '#',
  },
  {
    id: 'terms',
    label: '약관 및 정책',
    href: '#',
  },
  {
    id: 'suggest',
    label: '건의하기',
    href: '#',
  },
  {
    id: 'withdraw',
    label: '회원탈퇴',
    href: '#',
  },
];

function MenuSection() {
  return (
    <section>
      <ul css={menuListCss}>
        {MENU_LIST.map((menu) => (
          <Link
            key={menu.id}
            href={menu.href}
            style={{
              all: 'unset',
            }}
          >
            <li css={menuItemCss}>
              <BookmarkIcon isBookmarked={false} width={20} height={20} color="#fff" />
              <span>{menu.label}</span>
            </li>
          </Link>
        ))}
      </ul>
    </section>
  );
}

export default MenuSection;

const menuListCss = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const menuItemCss = css`
  cursor: pointer;

  display: flex;
  gap: 8px;
  align-items: center;

  padding: 8px 20px;

  color: #fff;

  span {
    display: inline-block;
    text-decoration: none;
  }
`;

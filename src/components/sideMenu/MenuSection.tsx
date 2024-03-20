import Link from 'next/link';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';

import BookmarkIcon from '~/components/icons/BookmarkIcon';
import ConditionalSurveyLink from '~/components/sideMenu/ConditionalSurveyLink';
import useKakaoLogin from '~/hooks/auth/useKakaoLogin';

function MenuSection() {
  const router = useRouter();
  const { logOutHandler } = useKakaoLogin();

  const MENU_LIST: {
    id: string;
    label: string;
    href?: string;
    action?: () => void;
  }[] = [
    {
      id: 'bookmark-card',
      label: '저장한 명함',
      href: '/gallery/bookmarks',
    },
    {
      id: 'logout',
      label: '로그아웃',
      action: () => {
        // 실 환경에서 되는지 체크
        logOutHandler({ callbackUrl: '/' });
        router.replace('/');
      },
    },
    // {
    //   id: 'terms',
    //   label: '약관 및 정책',
    //   href: '#',
    // },
    // {
    //   id: 'suggest',
    //   label: '건의하기',
    //   href: '#',
    // },
    // {
    //   id: 'withdraw',
    //   label: '회원탈퇴',
    //   href: '#',
    // },
  ];

  return (
    <section>
      <ul css={menuListCss}>
        {MENU_LIST.map((menu) => {
          if (menu.href) {
            return (
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
            );
          }
          if (menu.action) {
            return (
              <button type="button" key={menu.id} onClick={menu.action}>
                <li css={menuItemCss}>
                  <BookmarkIcon isBookmarked={false} width={20} height={20} color="#fff" />
                  <span>{menu.label}</span>
                </li>
              </button>
            );
          }

          return null;
        })}
        <button type="button">
          <li css={menuItemCss}>
            <BookmarkIcon isBookmarked={false} width={20} height={20} color="#fff" />
            <ConditionalSurveyLink />
          </li>
        </button>
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

  font-size: 16px;
  color: #fff;

  span {
    display: inline-block;
    text-decoration: none;
  }

  svg {
    flex-shrink: 0;
  }
`;

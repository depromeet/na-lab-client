import { css, type Theme } from '@emotion/react';

import { useGetLogined } from '~/hooks/api/user/useGetLogined';
import { DETAIL, HEAD_2_BOLD } from '~/styles/typo';

function ProfileSection() {
  const { data: userInfo } = useGetLogined();

  return (
    <section css={profileSectionCss}>
      <div css={profileImageCss}></div>
      <p css={nicknameCss}>{userInfo?.nickname}</p>
      <p css={emailCss}>selina2000@naver.com</p>
    </section>
  );
}

const profileSectionCss = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;

const profileImageCss = css`
  width: 64px;
  height: 64px;
  background-color: #fff;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const nicknameCss = css`
  ${HEAD_2_BOLD};
  margin-top: 8px;
  color: #fff;
`;

const emailCss = (theme: Theme) => css`
  ${DETAIL};
  padding: 6px 12px;
  color: ${theme.colors.gray_200};
  background-color: ${theme.colors.secondary_300};
`;
export default ProfileSection;

import Image from 'next/image';
import { css, type Theme } from '@emotion/react';

import { useGetLogin } from '~/hooks/api/user/useGetLogined';
import { DETAIL, HEAD_2_BOLD } from '~/styles/typo';

const PROFILE_BASIC_URL = '/images/profile/profile-basic.png';

function ProfileSection() {
  const { data: userInfo, isFetching } = useGetLogin();

  if (isFetching) {
    return <ProfileSectionSkeleton />;
  }

  return (
    <section css={profileSectionCss}>
      <div css={profileImageCss}>
        <Image src={PROFILE_BASIC_URL} alt="프로필 이미지" width={64} height={64} />
      </div>
      <p css={nicknameCss}>{userInfo?.nickname}</p>
      <p css={emailCss}>{userInfo?.email}</p>
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
  height: 65px;
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
  height: 32px;
  padding: 6px 12px;

  color: ${theme.colors.gray_200};

  background-color: ${theme.colors.secondary_300};
  border-radius: 8px;
`;

export default ProfileSection;

function ProfileSectionSkeleton() {
  return (
    <section css={profileSectionCss}>
      <div css={[profileImageCss, skeletonCss]}></div>
      <div
        css={[
          nicknameCss,
          skeletonCss,
          css`
            height: 25px;
            border-radius: 8px;
          `,
        ]}
      ></div>
      <div
        css={[
          emailCss,
          skeletonCss,
          css`
            width: 148px;
          `,
        ]}
      ></div>
    </section>
  );
}

const skeletonCss = (theme: Theme) => css`
  min-width: 64px;
  background-color: ${theme.colors.secondary_300};
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% {
      opacity: 0.5;
    }

    50% {
      opacity: 0.8;
    }

    100% {
      opacity: 0.5;
    }
  }
`;

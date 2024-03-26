import { signIn, useSession } from 'next-auth/react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, type Mock, test, vi } from 'vitest';

import KakaoLoginButton from './KakaoLoginButton';

describe('components/kakaoLoginButton/KakaoLoginButton', () => {
  vi.mock('next-auth/react', () => ({
    signIn: vi.fn(),
    signOut: vi.fn(),
    useSession: vi.fn(),
  }));

  beforeEach(() => {
    // useSession 함수의 반환 값을 설정
    (useSession as Mock<unknown[]>).mockReturnValue({ data: null });
  });

  afterEach(cleanup);

  test('정의되어 있어야 한다', () => {
    expect(KakaoLoginButton).toBeDefined();
  });

  test('유저가 로그인하지 않은 경우에는 카카오 로그인하기 버튼을 렌더링한다', () => {
    render(<KakaoLoginButton />);
    expect(screen.getByRole('button')).toBeDefined();
  });

  test('"카카오 로그인하기" 버튼을 클릭하면 signIn 함수를 호출한다', () => {
    render(<KakaoLoginButton />);
    const loginButton = screen.getByRole('button');
    fireEvent.click(loginButton);
    expect(signIn).toBeCalled();
  });

  // TODO: 추후 로그아웃 기능 구현이 필요하다면 주석 살리기
  // test('유저가 로그인한 경우에는 유저를 환영하는 문구와 "로그아웃 하기" 버튼을 렌더링한다', () => {
  //   (useSession as Mock<unknown[]>).mockReturnValue({
  //     data: {
  //       user: {
  //         name: '오연',
  //       },
  //     },
  //   });
  //   render(<KakaoLoginButton />);
  //   expect(screen.getByText('오연님 환영합니다.')).toBeInTheDocument();
  //   expect(screen.getByRole('button')).toHaveTextContent('로그아웃 하기');
  // });

  // test('"로그아웃 하기" 버튼을 클릭하면 signOut 함수를 호출한다', () => {
  //   (useSession as Mock<unknown[]>).mockReturnValue({
  //     data: {
  //       user: {
  //         name: '오연',
  //       },
  //     },
  //   });
  //   render(<KakaoLoginButton />);
  //   const logoutButton = screen.getByRole('button', { name: '로그아웃 하기' });
  //   fireEvent.click(logoutButton);
  //   expect(signOut).toHaveBeenCalledTimes(1);
  // });
});

export type Direction = 'up' | 'down' | 'left' | 'right';

/**
 * @description 왼쪽을 기준으로 rotate deg 값을 반환합니다.
 */
export const DIRECTION_DEGREE: Record<Direction, number> = {
  left: 0,
  up: 90,
  right: 180,
  down: 270,
} as const;

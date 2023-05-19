import { describe, expect, test } from 'vitest';

import getParsedDate from './getParsedDate';

describe('util/getParsedDate', () => {
  test('정의되어 있는가', () => {
    expect(getParsedDate).toBeDefined();
  });

  test('년, 월, 일, 시, 분, 초를 객체로 반환하는가', () => {
    const { year, month, day, hour, minute, second } = getParsedDate('2023-01-22T12:00:00');
    expect(year).equal('2023');
    expect(month).equal('01');
    expect(day).equal('22');
    expect(hour).equal('12');
    expect(minute).equal('00');
    expect(second).equal('00');
  });

  test('잘못된 문자열을 넘겼을 경우 에러가 발생하는가', () => {
    expect(() => getParsedDate('test')).toThrowError('잘못된 날짜 문자열입니다.');
  });
});

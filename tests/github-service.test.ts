import {describe, expect, test} from 'bun:test';

import {normalizeWhitespace} from '../src/github-service';

describe('claims keyword whitespace normalization', () => {
  test('선점 키워드의 공백 차이를 제거해 같은 문자열로 정규화한다', () => {
    const keyword = normalizeWhitespace('제가 하겠습니다');

    expect(normalizeWhitespace('제가 하겠습니다')).toBe(keyword);
    expect(normalizeWhitespace('제가   하겠습니다')).toBe(keyword);
    expect(normalizeWhitespace('제가\n하겠습니다')).toBe(keyword);
    expect(normalizeWhitespace('제가\t하겠습니다')).toBe(keyword);
  });

  test('대소문자 차이를 무시하도록 소문자로 정규화한다', () => {
    expect(normalizeWhitespace('I WILL DO THIS')).toBe(
      normalizeWhitespace('i will do this'),
    );
  });
});

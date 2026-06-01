import type {UserScore} from '../core/score-calculator';

export const supportedSortBys = ['score', 'id'] as const;
export type SupportedSortBy = (typeof supportedSortBys)[number];

export const supportedSortOrders = ['asc', 'desc'] as const;
export type SupportedSortOrder = (typeof supportedSortOrders)[number];

export function sortUserScores(
  users: ReadonlyArray<UserScore>,
  sortBy: SupportedSortBy,
  sortOrder: SupportedSortOrder,
): UserScore[] {
  return [...users].sort((a, b) => {
    if (sortBy === 'id') {
      const cmp = a.userId.localeCompare(b.userId);
      return sortOrder === 'asc' ? cmp : -cmp;
    } else {
      const cmp = a.totalScore - b.totalScore;
      if (cmp === 0) return a.userId.localeCompare(b.userId); // 점수 동률시 ID 오름차순
      return sortOrder === 'asc' ? cmp : -cmp;
    }
  });
}

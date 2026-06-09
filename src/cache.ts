const CACHE_DIR = '.cache';

/**
 * 저장소별 분석 결과를 저장하는 캐시 데이터 구조입니다.
 * @typeParam T 캐시에 저장할 분석 데이터 타입
 */
export interface RepoCache<T> {
  repository: string;
  lastAnalyzedAt: string;
  data: T;
}

/**
 * 저장소별 캐시 파일 경로를 생성합니다.
 * @param owner 저장소 소유자
 * @param repo 저장소 이름
 * @param cacheKey 캐시 파일 구분 키 (기본값: 'cache')
 * @returns 저장소 캐시 파일 경로
 */
const getCacheFilePath = (
  owner: string,
  repo: string,
  cacheKey = 'cache',
): string => `${CACHE_DIR}/${owner}_${repo}/${cacheKey}.json`;

/**
 * 저장소의 캐시 파일을 읽어 기존 분석 결과를 불러옵니다.
 * 캐시를 사용하지 않도록 설정했거나 캐시 파일이 없거나 손상된 경우 null을 반환합니다.
 * @param owner 저장소 소유자
 * @param repo 저장소 이름
 * @param noCache 캐시 사용을 건너뛸지 여부
 * @param cacheKey 캐시 파일 구분 키 (기본값: 'cache')
 * @returns 저장소 캐시 데이터 또는 null
 */
export const loadCache = async <T>(
  owner: string,
  repo: string,
  noCache = false,
  cacheKey = 'cache',
): Promise<RepoCache<T> | null> => {
  if (noCache) {
    console.error('캐시를 무시하고 전체 데이터를 다시 수집합니다.');
    return null;
  }

  const cacheFile = getCacheFilePath(owner, repo, cacheKey);
  const file = Bun.file(cacheFile);

  if (!(await file.exists())) return null;

  try {
    const cache = (await file.json()) as RepoCache<T>;

    if (cache.repository !== `${owner}/${repo}`) return null;

    console.error(`[cache] ${owner}/${repo} — 캐시에서 읽습니다.`);
    return cache;
  } catch {
    console.error('기존 캐시 파일이 손상되어 새로 수집을 시작합니다.');
    return null;
  }
};

/**
 * 저장소 분석 결과를 캐시 파일로 저장합니다.
 * @param owner 저장소 소유자
 * @param repo 저장소 이름
 * @param data 캐시에 저장할 분석 결과 데이터
 * @param analyzedAt 분석 기준 시각
 * @param cacheKey 캐시 파일 구분 키 (기본값: 'cache')
 * @returns 반환값이 없습니다.
 */
export const saveCache = async <T>(
  owner: string,
  repo: string,
  data: T,
  analyzedAt = new Date().toISOString(),
  cacheKey = 'cache',
): Promise<void> => {
  const cache: RepoCache<T> = {
    repository: `${owner}/${repo}`,
    lastAnalyzedAt: analyzedAt,
    data,
  };

  await Bun.write(
    getCacheFilePath(owner, repo, cacheKey),
    JSON.stringify(cache, null, 2),
  );

  console.error(`[cache] ${owner}/${repo} — 캐시를 저장했습니다.`);
};

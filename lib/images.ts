/**
 * 이미지 아키텍처.
 *
 * 모든 파일은 원본과 같은 1024x686이며 실제 픽셀 크기와 width/height가 일치합니다.
 * (검증: `node scripts/webp-info.mjs`)
 * 채팅으로 받은 원본이 이 해상도라, 없는 픽셀을 만들어 넣지 않습니다.
 *
 * 중요: 아래 이미지는 AI로 생성한 참고 이미지입니다.
 * 강남 퍼블릭의 실제 룸이나 직원을 촬영한 사진이 아니므로,
 * alt와 캡션에서 확인되지 않은 시설·설비·인원을 사실처럼 표현하지 않습니다.
 */

export const IMAGE_SIZE = { width: 1024, height: 686 } as const;
export const IMAGE_ASPECT = "3 / 2";

export type SiteImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

function image(src: string, alt: string): SiteImage {
  return { src, alt, ...IMAGE_SIZE };
}

export const images = {
  /** 홈 LCP 이미지 — 룸 전체가 보이는 가장 넓은 구도 */
  hero: image(
    "/images/gangnam-public-hero.webp",
    "우드 패널 벽과 대리석 테이블, 마이크 스탠드와 대형 화면이 놓인 넓은 룸. 한 사람이 테이블 옆에 서 있다.",
  ),
  /** 기본 대표 이미지(og:image, LocalBusiness image) */
  og: image(
    "/images/gangnam-public-og.webp",
    "곡선형 브론즈 벽과 간접 조명, 대리석 테이블에 무선 마이크가 놓인 라운지형 룸.",
  ),
  /** 룸 내부 기본형 — 주류가 세팅된 테이블 */
  roomInterior: image(
    "/images/public-room-interior.webp",
    "체스터필드 가죽 소파와 대리석 테이블에 위스키 병과 아이스 버킷, 무선 마이크가 놓인 룸 내부.",
  ),
  /** 룸 형태가 다른 예 — 곡선형 벨벳 마감 */
  roomStyles: image(
    "/images/public-room-styles.webp",
    "곡선형 벨벳 벽 마감과 매립형 화면이 있는 룸. 테이블 옆으로 긴 라운드 소파가 이어진다.",
  ),
  /** 규모가 작은 룸 */
  roomCompact: image(
    "/images/public-room-compact.webp",
    "간접 조명이 들어간 어두운 흡음 패널 벽과 긴 소파가 마주 놓인 폭이 좁은 룸.",
  ),
  /** 테이블 위 기기 — 태블릿과 무선 마이크 */
  tableSetup: image(
    "/images/room-table-setup.webp",
    "룸 테이블 위에 놓인 곡 검색용 태블릿과 무선 마이크 두 개, 얼음 잔과 위스키 병.",
  ),
  /** 초이스 설명용 — 룸에 사람이 함께 앉은 구도 */
  choiceGuide: image(
    "/images/choice-system-guide.webp",
    "샴페인 골드 벽면 조명이 켜진 룸에서 한 사람이 소파에 앉아 마이크를 들고 있다.",
  ),
  /** 룸타임 설명용 — 안주와 잔이 놓인 테이블 */
  roomtimeGuide: image(
    "/images/roomtime-guide.webp",
    "대리석 테이블에 위스키와 잔, 마른안주 접시가 놓인 룸. 한 사람이 마이크를 들고 서 있다.",
  ),
  /** 비용 설명용 — 주류 구성이 여러 병 보이는 구도 */
  drinkSetup: image(
    "/images/drink-setup-guide.webp",
    "테이블에 위스키 여러 병과 샴페인 버킷, 빈 잔이 나란히 놓이고 화면에 곡 목록이 표시된 룸.",
  ),
  /** 라운지형 좌석 — 커튼 배경의 넓은 소파 */
  lounge: image(
    "/images/room-lounge-seating.webp",
    "골드 커튼을 배경으로 넓은 가죽 소파가 놓이고 테이블에 위스키와 과일 접시가 차려진 룸.",
  ),
} as const;

export const defaultOgImage = images.og;

/** 이미지가 실제 촬영본이 아님을 밝히는 공통 고지 문구 */
export const imageDisclaimer =
  "이 사이트의 이미지는 AI로 생성한 참고 이미지입니다. 강남 퍼블릭의 실제 룸이나 직원을 촬영한 사진이 아니며, 실제 시설 구성과 다를 수 있습니다.";

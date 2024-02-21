import { type Group } from '~/utils/resultLogic';

// src/pages/dna/LoadedDna.tsx와 동일
interface Image {
  webp: string;
  png: string;
}

const DNA_IMAGE_BASE_URL = '/images/dna/result';

export const DNA_IMAGE_BY_GROUP: Record<Group, Image> = {
  A: { webp: `${DNA_IMAGE_BASE_URL}/A_dna.webp`, png: `${DNA_IMAGE_BASE_URL}/A_dna.png` },
  B: { webp: `${DNA_IMAGE_BASE_URL}/B_dna.webp`, png: `${DNA_IMAGE_BASE_URL}/B_dna.png` },
  C: { webp: `${DNA_IMAGE_BASE_URL}/C_dna.webp`, png: `${DNA_IMAGE_BASE_URL}/C_dna.png` },
  D: { webp: `${DNA_IMAGE_BASE_URL}/D_dna.webp`, png: `${DNA_IMAGE_BASE_URL}/D_dna.png` },
  E: { webp: `${DNA_IMAGE_BASE_URL}/E_dna.webp`, png: `${DNA_IMAGE_BASE_URL}/E_dna.png` },
  F: { webp: `${DNA_IMAGE_BASE_URL}/F_dna.webp`, png: `${DNA_IMAGE_BASE_URL}/F_dna.png` },
} as const;

const CAREER_CARD_IMAGE_BASE_URL = '/images/dna/careerCard';

export const CAREER_CARD_IMAGE_BY_GROUP: Record<Group, Image> = {
  A: { webp: `${CAREER_CARD_IMAGE_BASE_URL}/A.webp`, png: `${CAREER_CARD_IMAGE_BASE_URL}/A.png` },
  B: { webp: `${CAREER_CARD_IMAGE_BASE_URL}/B.webp`, png: `${CAREER_CARD_IMAGE_BASE_URL}/B.png` },
  C: { webp: `${CAREER_CARD_IMAGE_BASE_URL}/C.webp`, png: `${CAREER_CARD_IMAGE_BASE_URL}/C.png` },
  D: { webp: `${CAREER_CARD_IMAGE_BASE_URL}/D.webp`, png: `${CAREER_CARD_IMAGE_BASE_URL}/D.png` },
  E: { webp: `${CAREER_CARD_IMAGE_BASE_URL}/E.webp`, png: `${CAREER_CARD_IMAGE_BASE_URL}/E.png` },
  F: { webp: `${CAREER_CARD_IMAGE_BASE_URL}/F.webp`, png: `${CAREER_CARD_IMAGE_BASE_URL}/F.png` },
} as const;

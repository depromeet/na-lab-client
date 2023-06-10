import { type Variants } from 'framer-motion';

export const defaultEasing = [0.6, -0.05, 0.01, 0.99];

export const stagger = (delay = 0.3): Variants => ({
  animate: { transition: { staggerChildren: delay } },
});

export const staggerOne: Variants = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export const staggerHalf: Variants = {
  animate: { transition: { staggerChildren: 0.05 } },
};

export const defaultFadeInVariants: Variants = {
  initial: {
    opacity: 0,
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: 'opacity',
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: 'opacity',
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: 'opacity',
  },
};

export const defaultFadeInUpVariants: Variants = {
  initial: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: 'opacity, transform',
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: 'opacity, transform',
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: 'opacity, transform',
  },
};

export const defaultFadeInDownVariants: Variants = {
  initial: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: 'opacity, transform',
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: 'opacity, transform',
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: 'opacity, transform',
  },
};

export const defaultScaleVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.3, ease: defaultEasing },
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: defaultEasing },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.3, ease: defaultEasing },
  },
};

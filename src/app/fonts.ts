import { Amiri, Scheherazade_New, Changa } from 'next/font/google';

export const amiri = Amiri({
    weight: ['400', '700'],
    subsets: ['arabic'],
    variable: '--font-amiri',
    display: 'swap',
});

export const scheherazade = Scheherazade_New({
    weight: ['400', '700'],
    subsets: ['arabic'],
    variable: '--font-scheherazade',
    display: 'swap',
});

export const changa = Changa({
    weight: ['400', '700'],
    subsets: ['arabic'],
    variable: '--font-changa',
    display: 'swap',
});

export type ArabicFont = "amiri" | "scheherazade" | "changa";

export const getArabicFontClass = (font: ArabicFont) => {
    switch (font) {
        case "amiri": return amiri.className;
        case "scheherazade": return scheherazade.className;
        case "changa": return changa.className;
        default: return amiri.className;
    }
};

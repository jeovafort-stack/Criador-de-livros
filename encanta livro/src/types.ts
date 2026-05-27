/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CustomUserData {
  theme: string;
  themeEmoji: string;
  themeImage: string;
  childName: string;
  age: string;
  traits: string[];
  photo: string | null;
  reader: string;
  email: string;
  whatsapp: string;
  
  // Upsells State
  includeSiblingBook: boolean;
  siblingName: string;
  siblingAge: string;
  siblingTraits: string[];
  
  premiumCover: boolean;
  
  customDedication: boolean;
  dedicationText: string;
  
  giftWrapping: boolean;
  coverPoster: boolean;
  heroCertificate: boolean;
  digitalPdf: boolean;
  
  // Customization extra
  favoriteColor: string;
}

export interface FavoriteColor {
  id: string;
  label: string;
  bgClass: string;
  textClass: string;
  emoji: string;
}

export interface ThemeOption {
  id: string;
  label: string;
  emoji: string;
  description: string;
  previewImage: string; // Map to our high-quality attached image files!
  bookCoverTitle: string; // The text on the cover e.g. "O Leão Valentão"
}

export interface AgeOption {
  id: string;
  label: string;
  range: string;
  subtitle: string;
}

export interface TraitOption {
  id: string;
  label: string;
  emoji: string;
}

export interface ReaderOption {
  id: string;
  label: string;
  emoji: string;
  text: string;
}

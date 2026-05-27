/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ThemeOption, AgeOption, TraitOption, ReaderOption, FavoriteColor } from "./types";

// Images mapped to real uploaded assets
export const IMAGES = {
  logo: "/input_file_5.png",
  heroMockup: "https://encantalivro.com.br/wp-content/uploads/2026/05/banner-3.webp", // Beautiful open book mockup
  previewValentina: "/input_file_1.png", // Valentina reading open book
  previewLaura: "/input_file_2.png", // Laura and enchanted forest
  previewAmara: "https://encantalivro.com.br/wp-content/uploads/2026/05/banner-4-scaled.webp", // Beautiful girl with premium book
  previewLeoBed: "https://encantalivro.com.br/wp-content/uploads/2026/05/banner-2.webp", // Mother reading in bed with kids
};

// Elegant Unsplash photorealistic child-themed fallbacks to ensure instant visual appeal
export const IMAGE_FALLBACKS: Record<string, string> = {
  "/input_file_5.png": "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=300&q=80",
  "/input_file_0.png": "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=800&q=80",
  "/input_file_1.png": "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80",
  "/input_file_2.png": "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
  "/input_file_3.png": "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=800&q=80",
  "/input_file_4.png": "https://images.unsplash.com/photo-1511225070737-3a4bd0843ae1?auto=format&fit=crop&w=800&q=80",
};

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: "guardiao-estrelas",
    label: "O Pequeno Guardião das Estrelas",
    emoji: "⭐",
    description: "Uma jornada pelo cosmos onde a criança aprende a guiar poeiras estelares e iluminar os sonhos da noite.",
    previewImage: "https://encantalivro.com.br/wp-content/uploads/2026/05/1estrela.webp",
    bookCoverTitle: "O Pequeno Guardião das Estrelas: {name}",
  },
  {
    id: "floresta-secreta",
    label: "A Floresta Secreta dos Animais Falantes",
    emoji: "🌳",
    description: "Mistérios e amizades com criaturas falantes que mostram o power da empatia e da preservação ambiental.",
    previewImage: "https://encantalivro.com.br/wp-content/uploads/2026/05/flo.webp",
    bookCoverTitle: "{name} e A Floresta Secreta dos Animais Falantes",
  },
  {
    id: "reino-da-imaginacao",
    label: "O Reino Encantado da Imaginação",
    emoji: "🏰",
    description: "Um castelo flutuante onde cada pensamento da criança se torna pura magia e a criatividade é coroada.",
    previewImage: "https://encantalivro.com.br/wp-content/uploads/2026/05/estrela.webp",
    bookCoverTitle: "{name} no Reino Encantado da Imaginação",
  },
  {
    id: "aventura-espacial-mil-galaxias",
    label: "Aventura no Espaço das Mil Galáxias",
    emoji: "🚀",
    description: "Decifre constelações antigas e conduza uma nave mágica por planetas cheios de cores e diversão intergaláctica.",
    previewImage: "https://encantalivro.com.br/wp-content/uploads/2026/05/foguete.webp",
    bookCoverTitle: "{name}: Aventura no Espaço das Mil Galáxias",
  },
  {
    id: "tesouro-piratas-dourado",
    label: "O Tesouro Perdido dos Piratas do Mar Dourado",
    emoji: "🏴‍☠️",
    description: "Mapas misteriosos, ilhas tropicais e segredos navais onde a generosidade é o tesouro mais valioso.",
    previewImage: "https://encantalivro.com.br/wp-content/uploads/2026/05/pirata.webp",
    bookCoverTitle: "{name} e O Tesouro Perdido dos Piratas",
  },
  {
    id: "vale-magico-dinossauros",
    label: "O Vale Mágico dos Dinossauros",
    emoji: "🦖",
    description: "Volte no tempo e brinque com dinossauros gentis, descobrindo curiosidades fascinantes sobre o nosso planeta selvagem.",
    previewImage: "https://encantalivro.com.br/wp-content/uploads/2026/05/dinossauro.webp",
    bookCoverTitle: "{name} no Vale Mágico dos Dinossauros",
  },
  {
    id: "princesa-jardim-borboletas",
    label: "A Princesa e o Jardim das Borboletas Encantadas",
    emoji: "🦋",
    description: "Um jardim de flores brilhantes e borboletas reluzentes que revelam o poder de florescer e ser amigável.",
    previewImage: "https://encantalivro.com.br/wp-content/uploads/2026/05/princesa.webp",
    bookCoverTitle: "{name} e o Jardim das Borboletas",
  },
  {
    id: "super-heroi-coracao-brilhante",
    label: "O Super Herói do Coração Brilhante",
    emoji: "🦸",
    description: "A criança ganha poderes incríveis que se fortalecem com atos de bondade, amor e ajuda ao próximo no dia a dia.",
    previewImage: "https://encantalivro.com.br/wp-content/uploads/2026/05/guardia.webp",
    bookCoverTitle: "{name}: O Super Herói do Coração Brilhante",
  },
];

export const AGE_OPTIONS: AgeOption[] = [
  {
    id: "2-4",
    label: "2 a 4 anos",
    range: "2-4 anos",
    subtitle: "Ideal para primeira infância. Frases curtas e rítmicas com foco visual.",
  },
  {
    id: "5-7",
    label: "5 a 7 anos",
    range: "5-7 anos",
    subtitle: "Perfeito para alfabetização inicial. Estímulo à imaginação ativa.",
  },
  {
    id: "8-12",
    label: "8 a 12 anos",
    range: "8-12 anos",
    subtitle: "Raciocínio lógico, mistérios instigantes e lições valorosas para mentes curiosas.",
  },
];

export const FAVORITE_COLORS: FavoriteColor[] = [
  { id: "azul", label: "Azul Marinho", bgClass: "bg-blue-600", textClass: "text-blue-600", emoji: "💙" },
  { id: "rosa", label: "Rosa Magia", bgClass: "bg-pink-500", textClass: "text-pink-500", emoji: "💖" },
  { id: "vermelho", label: "Vermelho Fogo", bgClass: "bg-rose-600", textClass: "text-rose-600", emoji: "❤️" },
  { id: "amarelo", label: "Amarelo Sol", bgClass: "bg-amber-400", textClass: "text-amber-500", emoji: "💛" },
  { id: "verde", label: "Verde Floresta", bgClass: "bg-emerald-600", textClass: "text-emerald-600", emoji: "💚" },
  { id: "roxo", label: "Roxo Cósmico", bgClass: "bg-purple-600", textClass: "text-purple-600", emoji: "💜" },
  { id: "laranja", label: "Laranja Estelar", bgClass: "bg-orange-500", textClass: "text-orange-500", emoji: "🧡" }
];

export const TRAIT_OPTIONS: TraitOption[] = [
  { id: "corajosa", label: "Corajosa", emoji: "🦁" },
  { id: "divertida", label: "Divertida", emoji: "😄" },
  { id: "sonhadora", label: "Sonhadora", emoji: "💭" },
  { id: "inteligente", label: "Inteligente", emoji: "🧠" },
  { id: "aventureira", label: "Aventureira", emoji: "🌟" },
  { id: "carinhosa", label: "Carinhosa", emoji: "💛" },
];

export const READER_OPTIONS: ReaderOption[] = [
  { id: "mae", label: "Mãe", emoji: "👩", text: "Momentos mágicos de aconchego materno" },
  { id: "pai", label: "Pai", emoji: "👨", text: "Grandes risadas e ensinamentos na cabeceira" },
  { id: "avos", label: "Avós", emoji: "👴👵", text: "Amor em dobro e sabedoria que abraça" },
  { id: "irmaos", label: "Irmãos", emoji: "🧒", text: "Cumplicidade e diversão compartilhada" },
  { id: "familia", label: "Família Toda", emoji: "👨‍👩‍👧", text: "União e memórias geracionais inesquecíveis" },
];

// Feedback microcopies (Req #3 - Microcopy Emocional)
export const EMOTIONAL_MICROCOPIES = {
  afterName: (name: string) => `Que nome lindo! ${name} já brilha como protagonista ✨`,
  afterAge: (age: string) => `Com ${age}, a imaginação está no auge! Essa aventura vai ficar incrível 💛`,
  afterTraits: "Com essas qualidades brilhantes, a nossa história terá um super herói único! 🌟",
  afterPhoto: "Sua foto foi enviada! Estamos deixando tudo ainda mais especial ✨",
  afterPhotoSkipped: "Sem problemas, a magia das ilustrações fará tudo brilhar! 💫",
  afterReader: "Esse elo afetivo é o que torna a leitura um tesouro eterno! 💛",
};

// Premium trust bullets (Req #5 - Valor percebido antes de preço)
export const PREMIUM_VALUE_BULLETS = [
  { label: "Livro personalizado exclusivo", text: "Narrativa e ilustrações sob medida com os dados da criança" },
  { label: "Produção premium excepcional", text: "Capa dura resistente, folhas de alta gramatura e cores vibrantes" },
  { label: "Memória afetiva para toda vida", text: "Aquele abraço quentinho transformado em um objeto de carinho eterno" },
  { label: "Presente verdadeiramente inesquecível", text: "A surpresa de se ver no livro estimula o amor de uma vida inteira pela leitura" },
];

export const REAL_REVIEWS = [
  {
    name: "Carolina Ribeiro",
    role: "Mãe do Theo (4 anos)",
    avatar: "👩‍👦",
    comment: "Eu chorei lendo a primeira vez com o Theo. Ver os olhinhos dele brilharem quando ele se viu na história foi indescritível! Realmente é uma memória com toque físico de muita qualidade.",
    rating: 5,
  },
  {
    name: "Marcos Vinícius",
    role: "Pai da Laura (6 anos)",
    avatar: "👨‍👧",
    comment: "A qualidade do livro capa dura superou todas as expectativas. Páginas grossas, toque suave premium. O microcopy e a facilidade do site são perfeitos.",
    rating: 5,
  },
  {
    name: "Fabiana Souza",
    role: "Mãe da Alice (5 anos)",
    avatar: "👩‍👧",
    comment: "O livro chegou super rápido e com um perfume maravilhoso! A Alice dorme abraçada com o livro dela. Indicarei para todas as minhas amigas mães!",
    rating: 5,
  },
  {
    name: "Renata Vasconcellos",
    role: "Mãe do Arthur (8 anos)",
    avatar: "👩‍👦",
    comment: "Fiquei impressionada com o acabamento da capa dura e a nitidez das cores. Um estímulo incrível para aproximar as crianças da leitura física hoje em dia.",
    rating: 5,
  },
  {
    name: "Thiago Mendes",
    role: "Pai do Lucas (3 anos)",
    avatar: "👨‍👦",
    comment: "O processo todo no site é muito intuitivo e o atendimento pós-compra no WhatsApp é impecável. O Lucas amou se ver vivendo aquela aventura lúdica.",
    rating: 5,
  },
  {
    name: "Letícia Albuquerque",
    role: "Mãe da Valentina (7 anos)",
    avatar: "👩‍👧",
    comment: "A versão premium com a dedicatória é maravilhosa, emociona a família inteira ao ler. É uma autêntica relíquia de amor que guardaremos para sempre no coração.",
    rating: 5,
  },
];

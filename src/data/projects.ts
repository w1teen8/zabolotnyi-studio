export type Category =
  | 'Освіта'
  | 'Краса'
  | 'Кафе'
  | 'Тату'
  | 'Розваги'
  | 'Кондитерські'
  | 'Клінінг';

export interface Project {
  id: string;
  name: string;
  url: string;
  description: string;
  category: Category;
  tech: string[];
}

export const categories: Array<Category | 'Всі'> = [
  'Всі',
  'Освіта',
  'Краса',
  'Кафе',
  'Тату',
  'Розваги',
  'Кондитерські',
  'Клінінг',
];

export const projects: Project[] = [
  {
    id: 'cleaning-website',
    name: 'NEAT.',
    url: 'https://w1teen8.github.io/cleaning-website/',
    description: 'Преміальний сайт-візитка клінінгової компанії для дому та бізнесу.',
    category: 'Клінінг',
    tech: ['HTML5', 'CSS3', 'GSAP'],
  },
  {
    id: 'glow-grammar',
    name: 'Glow Grammar',
    url: 'https://glowgrammar.com',
    description: 'Сучасна освітня платформа для вивчення англійської мови.',
    category: 'Освіта',
    tech: ['React', 'TypeScript', 'GSAP'],
  },
  {
    id: 'upgrade-nmt',
    name: 'UpGrade NMT',
    url: 'https://upgradenmt.com',
    description: 'Повноцінна платформа підготовки до НМТ.',
    category: 'Освіта',
    tech: ['JavaScript', 'CSS3', 'GSAP'],
  },
  {
    id: 'bonforme',
    name: 'Bon For Me',
    url: 'https://w1teen8.github.io/bonforme/',
    description: 'Сайт-вітрина авторської кондитерської з каталогом десертів та оформленням замовлення.',
    category: 'Кондитерські',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
  },
  {
    id: 'svoi-gastrocafe',
    name: 'Гастрокафе «СВОЇ»',
    url: 'https://w1teen8.github.io/svoi-gastrocafe/',
    description: 'Сайт гастрокафе з меню, атмосферними фото та бронюванням столика.',
    category: 'Кафе',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
  },
  {
    id: 'marafet-studio',
    name: 'Marafet Studio',
    url: 'https://w1teen8.github.io/marafet-studio/',
    description: 'Digital-візитка beauty-студії з акцентом на портфоліо майстрів.',
    category: 'Краса',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
  },
  {
    id: 'lubianskaia-irina',
    name: 'Ірина Любʼянська',
    url: 'https://w1teen8.github.io/lubianskaia-irina/',
    description: 'Сайт персонального стиліста з портфоліо образів та записом на консультацію.',
    category: 'Краса',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
  },
  {
    id: 'studio-alony-lukyanenko',
    name: 'Студія Альони Лук\'яненко',
    url: 'https://w1teen8.github.io/studio-alony-lukyanenko/',
    description: 'Сайт б\'юті-студії з презентацією послуг та галереєю результатів.',
    category: 'Краса',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
  },
  {
    id: 'manik-mammy',
    name: 'Manik Mammy',
    url: 'https://w1teen8.github.io/manik_mammy/',
    description: 'Сайт майстра манікюру з каталогом дизайнів та записом на послуги.',
    category: 'Краса',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
  },
  {
    id: 'yanina',
    name: 'Студія краси «Яніна»',
    url: 'https://w1teen8.github.io/yanina/',
    description: 'Презентаційний сайт студії краси з повним переліком послуг.',
    category: 'Краса',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
  },
  {
    id: 'mafia-club-kyiv',
    name: 'Mafia Club Kyiv',
    url: 'https://w1teen8.github.io/mafia-club-kyiv/',
    description: 'Сайт клубу живої гри «Мафія» з розкладом ігор та бронюванням столу.',
    category: 'Розваги',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
  },
  {
    id: '4sezona',
    name: '4 Сезони',
    url: 'https://w1teen8.github.io/4sezona/',
    description: 'Сайт салону краси з каталогом послуг та онлайн-записом.',
    category: 'Краса',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
  },
  {
    id: 'cafe-garmonia',
    name: 'Cafe Garmonia',
    url: 'https://w1teen8.github.io/cafe-garmonia/',
    description: 'Сайт затишного кафе з меню та інформацією про заклад.',
    category: 'Кафе',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
  },
  {
    id: 'dim-tattoo',
    name: 'DIM Tattoo',
    url: 'https://w1teen8.github.io/dim-tattoo/',
    description: 'Сайт тату-майстра з портфоліо робіт та формою запису на сеанс.',
    category: 'Тату',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
  },
];

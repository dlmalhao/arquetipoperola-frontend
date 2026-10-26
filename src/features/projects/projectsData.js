import sampleImage from '../../assets/landing-bg.png';
import sampleImage2 from '../../assets/contact.png';

export const allProjects = [
  {
    id: 1,
    slug: 'aurora',
    name: 'projecto Aurora',
    location: 'Braga',
    typologies: ['T1'],
    types: ['Moradia'],
    typeLabel: 'Tipologia T1',
    description: 'Este projeto foi pensado como uma habitação contemporânea que combina a máxima eficiência funcional com uma sensação de amplitude e luminosidade. A distribuição foi organizada para otimizar o uso diário do espaço, com zonas de convivência abertas, dormitórios bem dimensionados e uma relação direta e natural com a luz exterior. O resultado é uma casa moderadamente compacta, mas extremamente confortável, acolhedora e equilibrada entre estética, praticidade e qualidade de vida.',
    images: [sampleImage, sampleImage2],
  },
  {
    id: 2,
    slug: 'prisma',
    name: 'projecto Prisma',
    location: 'Guimarães',
    typologies: ['T2'],
    types: ['Apartamento'],
    typeLabel: 'Tipologia T2',
    description: 'A proposta Prisma valoriza a simplicidade formal e a organização racional dos espaços, criando uma casa com linhas limpas, soluções inteligentes e um ritmo visual muito equilibrado. O conceito privilegia a luz natural, a circulação fluida entre as divisões e a criação de zonas de convivência amplas, sem perder a sensação de conforto e intimidade nos quartos. Trata-se de uma resposta arquitetónica moderna, funcional e altamente adaptável ao quotidiano de uma família em crescimento.',
    images: [sampleImage, sampleImage2],
  },
  {
    id: 3,
    slug: 'lumen',
    name: 'projecto Lúmen',
    location: 'Porto',
    typologies: ['T3'],
    types: ['Moradia', 'Duplex'],
    typeLabel: 'Tipologia T3',
    description: 'O projeto Lúmen foi desenvolvido com um cuidado especial na qualidade ambiental dos espaços, dando prioridade à circulação natural de luz, à ventilação e ao conforto térmico. A organização interna foi pensada para reforçar a sensação de continuidade entre as áreas sociais e privadas, criando um ambiente sereno e funcional. Com uma estética contemporânea e materiais de acabamento limpos, o conceito combina um elevado nível de conforto doméstico com uma proposta arquitetónica sofisticada e muito bem resolvida.',
    images: [sampleImage, sampleImage2],
  },
  {
    id: 4,
    slug: 'eclipse',
    name: 'projecto Eclipse',
    location: 'Viana do Castelo',
    typologies: ['T4'],
    types: ['Apartamento'],
    typeLabel: 'Tipologia T4',
    description: 'Eclipse surge como uma intervenção arquitetónica minimalista, com foco na integração harmoniosa com a envolvente e na valorização das vistas exteriores. A composição privilegia fachadas simples, materiais de expressão limpa e uma organização interna que maximiza a luz, a perspetiva e o conforto. O projeto procura um equilíbrio entre sobriedade estética e funcionalidade prática, resultando numa residência contemporânea, elegante e muito bem conectada ao terreno.',
    images: [sampleImage, sampleImage2],
  },
  {
    id: 5,
    slug: 'solaris',
    name: 'projecto Solaris',
    location: 'Braga',
    typologies: ['T5'],
    types: ['Moradia', 'Apartamento'],
    typeLabel: 'Tipologia T5',
    description: 'Solaris foi concebido como uma solução de habitação moderna, pensada para oferecer luminosidade, amplitude e uma atmosfera sofisticada em todos os espaços. O projeto assume uma leitura espacial muito clara, com áreas de convivência generosas, quartos bem definidos e um conjunto de detalhes que reforçam a qualidade de vida dos ocupantes. O acabamento e a proporção dos volumes ajudam a criar uma casa elegante, funcional e marcadamente contemporânea, adequada a quem procura conforto sem abrir mão de uma identidade arquitetónica forte.',
    images: [sampleImage, sampleImage2],
  },
  {
    id: 6,
    slug: 'atlas',
    name: 'projecto Atlas',
    location: 'Lisboa',
    typologies: ['T5'],
    types: ['Apartamento', 'Duplex'],
    typeLabel: 'Tipologia T5',
    description: 'Atlas é um projeto com forte identidade arquitetónica, orientado para o equilíbrio entre estrutura, materiais e funcionalidade. A proposta combina volumes bem definidos com uma linguagem contemporânea e uma organização interna que favorece a eficiência da circulação e a qualidade dos espaços. O projeto destaca-se pela confiança estética, pela lógica de construção e pela capacidade de responder às necessidades práticas de uma habitação atual, sem perder a riqueza do seu caráter visual.',
    images: [sampleImage, sampleImage2],
  },
  {
    id: 7,
    slug: 'neptune',
    name: 'projecto Neptune',
    location: 'Faro',
    typologies: ['T4'],
    types: ['Moradia'],
    typeLabel: 'Tipologia T4',
    description: 'Neptune foi pensado como uma solução arquitetónica elegante e muito funcional, capaz de se inserir com naturalidade em contextos urbanos e de responder às exigências do quotidiano contemporâneo. A proposta procura otimizar a experiência de habitar, equilibrando áreas de convivência, privacidade e conforto ao longo do dia. Com um desenho cuidado, materiais de qualidade e um uso inteligente do espaço, o projeto entrega uma casa moderna, acolhedora e altamente adaptável às necessidades do utilizador.',
    images: [sampleImage, sampleImage2],
  },
];

export const allTipologies = [...new Set(allProjects.flatMap((project) => project.typologies))].sort();
export const allProjectTypes = [...new Set(allProjects.flatMap((project) => project.types))].sort();

export function filterProjects({ tipologia, tipo } = {}) {
  return allProjects.filter((project) => {
    const matchesTipologia = !tipologia || project.typologies.includes(tipologia);
    const matchesTipo = !tipo || project.types.includes(tipo);
    return matchesTipologia && matchesTipo;
  });
}

export function getProjectById(id) {
  return allProjects.find((project) => project.id === Number(id));
}

export function getProjectBySlug(slug) {
  return allProjects.find((project) => project.slug === slug);
}

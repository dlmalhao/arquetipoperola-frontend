import { getStrapiMediaUrl, unwrapStrapiEntity, unwrapStrapiRelation } from '../../api/strapi';
import { blocksToText, normalizePlans } from './projectsData';

const availabilityLabels = {
  disponivel: 'Disponível',
  reservado: 'Reservado',
  vendido: 'Vendido',
};

const priceFormatter = new Intl.NumberFormat('pt-PT', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

export function formatPrice(price) {
  return price != null && price !== '' ? priceFormatter.format(price) : 'Sob consulta';
}

export function normalizeImovel(imovel) {
  const entry = unwrapStrapiEntity(imovel);
  if (!entry) return null;

  const typologies = unwrapStrapiRelation(entry.tipologias).map((item) => item.nome).filter(Boolean);
  const typologyLabel = typologies.join(', ');
  const price = formatPrice(entry.preco);
  const availability = availabilityLabels[entry.disponibilidade] ?? entry.disponibilidade;

  const project = unwrapStrapiRelation(entry.projeto)[0];

  return {
    id: entry.id,
    slug: entry.slug,
    name: entry.nome,
    project: project ? { slug: project.slug, name: project.nome } : null,
    price,
    grossArea: entry.area_bruta,
    usefulArea: entry.area_util,
    bedrooms: entry.n_quartos,
    bathrooms: entry.n_casas_banho,
    energyRating: entry.certificacao_energetica,
    availability,
    availabilityKey: entry.disponibilidade,
    videoTour: entry.video_tour,
    typologies,
    cardLabel: [typologyLabel, price].filter(Boolean).join(' · '),
    description: blocksToText(entry.descricao),
    images: unwrapStrapiRelation(entry.imagens).map(getStrapiMediaUrl).filter(Boolean),
    plans: normalizePlans(entry.plantas),
  };
}

export function filterImoveis(imoveis, { tipologia, disponibilidade } = {}) {
  return imoveis.filter((imovel) => {
    const matchesTipologia = !tipologia || imovel.typologies.includes(tipologia);
    const matchesDisponibilidade = !disponibilidade || imovel.availabilityKey === disponibilidade;
    return matchesTipologia && matchesDisponibilidade;
  });
}

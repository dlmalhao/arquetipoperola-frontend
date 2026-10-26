import { getStrapiMediaUrl, unwrapStrapiEntity, unwrapStrapiRelation } from '../../api/strapi';

export function normalizeProject(project) {
  const entry = unwrapStrapiEntity(project);
  if (!entry) return null;

  const typologies = unwrapStrapiRelation(entry.tipologias).map((item) => item.nome).filter(Boolean);
  const types = unwrapStrapiRelation(entry.tipos ?? entry.tipo_de_projetos)
    .map((item) => item.nome)
    .filter(Boolean);
  const images = unwrapStrapiRelation(entry.imagens).map(getStrapiMediaUrl).filter(Boolean);
  const coverImage = getStrapiMediaUrl(entry.imagemCapa);
  const description = Array.isArray(entry.descricao)
    ? entry.descricao.map((block) => (block.children ?? []).map((child) => child.text ?? '').join('')).join('\n\n')
    : entry.descricao;
  const plans = unwrapStrapiRelation(entry.plantas).map((media) => ({
    name: media.name ?? media.alternativeText ?? 'Planta do projeto',
    url: getStrapiMediaUrl(media),
  })).filter((plan) => plan.url);

  return {
    id: entry.id,
    slug: entry.slug,
    name: entry.nome,
    location: entry.localizacao,
    address: entry.morada,
    coordinates: entry.coordenadas,
    grossArea: entry.area_bruta,
    usefulArea: entry.area_util,
    bedrooms: entry.n_quartos,
    bathrooms: entry.n_casas_banho,
    energyRating: entry.certificacao_energetica,
    status: entry.estado,
    completionYear: entry.ano_conclusao,
    availability: entry.disponibilidade,
    videoTour: entry.video_tour,
    typologies,
    types,
    typeLabel: typologies.length ? `Tipologia ${typologies.join(', ')}` : types.join(', '),
    description,
    images: coverImage ? [coverImage, ...images.filter((image) => image !== coverImage)] : images,
    plans,
    publishedAt: entry.publishedAt,
  };
}

export function filterProjects(projects, { tipologia, tipo } = {}) {
  return projects.filter((project) => {
    const matchesTipologia = !tipologia || project.typologies.includes(tipologia);
    const matchesTipo = !tipo || project.types.includes(tipo);
    return matchesTipologia && matchesTipo;
  });
}

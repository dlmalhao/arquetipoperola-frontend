import { getStrapiMediaUrl, unwrapStrapiEntity, unwrapStrapiRelation } from '../../api/strapi';

export function normalizeProject(project) {
  const entry = unwrapStrapiEntity(project);
  if (!entry) return null;

  const typologies = unwrapStrapiRelation(entry.tipologias).map((item) => item.nome).filter(Boolean);
  const types = unwrapStrapiRelation(entry.tipos).map((item) => item.nome).filter(Boolean);
  const images = unwrapStrapiRelation(entry.imagens).map(getStrapiMediaUrl).filter(Boolean);
  const coverImage = getStrapiMediaUrl(entry.imagemCapa);

  return {
    id: entry.id,
    slug: entry.slug,
    name: entry.nome,
    location: entry.localizacao,
    typologies,
    types,
    typeLabel: typologies.length ? `Tipologia ${typologies.join(', ')}` : types.join(', '),
    description: entry.descricao,
    images: coverImage ? [coverImage, ...images.filter((image) => image !== coverImage)] : images,
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

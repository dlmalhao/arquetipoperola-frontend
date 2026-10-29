import { getStrapiMediaUrl, unwrapStrapiEntity, unwrapStrapiRelation } from '../../api/strapi';

const statusLabels = {
  planeamento: 'Em planeamento',
  construcao: 'Em construção',
  concluido: 'Concluído',
};

export function blocksToText(blocks) {
  if (!Array.isArray(blocks)) return blocks;
  return blocks
    .map((block) => (block.children ?? []).map((child) => child.text ?? '').join(''))
    .join('\n\n');
}

export function normalizePlans(plantas) {
  return unwrapStrapiRelation(plantas).map((media) => ({
    name: media.name ?? media.alternativeText ?? 'Planta',
    url: getStrapiMediaUrl(media),
  })).filter((plan) => plan.url);
}

export function normalizeProject(project) {
  const entry = unwrapStrapiEntity(project);
  if (!entry) return null;

  const types = unwrapStrapiRelation(entry.tipos ?? entry.tipo_de_projetos)
    .map((item) => item.nome)
    .filter(Boolean);
  const images = unwrapStrapiRelation(entry.imagens).map(getStrapiMediaUrl).filter(Boolean);
  const coverImage = getStrapiMediaUrl(entry.imagemCapa);

  return {
    id: entry.id,
    slug: entry.slug,
    name: entry.nome,
    location: entry.localizacao,
    address: entry.morada,
    coordinates: entry.coordenadas,
    status: statusLabels[entry.estado] ?? entry.estado,
    completionYear: entry.ano_conclusao,
    videoTour: entry.video_tour,
    types,
    typeLabel: types.join(', '),
    description: blocksToText(entry.descricao),
    images: coverImage ? [coverImage, ...images.filter((image) => image !== coverImage)] : images,
    plans: normalizePlans(entry.plantas),
    publishedAt: entry.publishedAt,
  };
}

export function filterProjects(projects, { tipo } = {}) {
  return projects.filter((project) => !tipo || project.types.includes(tipo));
}

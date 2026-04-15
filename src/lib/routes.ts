export function getArticleUrl(slug: string, type: string, _series?: string): string {
  switch (type) {
    case 'cluster':
    case 'pillar-sub':
    case 'regional':
    case 'serie':
    case 'story':
    default:
      return `/${slug}`;
  }
}

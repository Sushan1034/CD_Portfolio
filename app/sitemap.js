import { siteConfig } from './metadata';

export default async function sitemap() {
  const routes = ['', '/blog', '/training'].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  return [...routes];
}

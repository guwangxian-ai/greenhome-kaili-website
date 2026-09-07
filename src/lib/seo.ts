import { company } from '../data/company';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

// Relative references work locally; production uses the configured Astro.site.
export const siteUrl = (path: string, site?: URL) =>
  site ? new URL(path, site).href : path;

export const organizationId = (site?: URL) => siteUrl('/#organization', site);

export function businessSchema(site?: URL) {
  return {
    '@type': 'HomeAndConstructionBusiness',
    '@id': organizationId(site),
    name: company.fullName,
    alternateName: company.englishName,
    description: company.description,
    url: siteUrl('/', site),
    logo: siteUrl('/favicon.png', site),
    telephone: `+86-${company.phone}`,
    foundingDate: company.foundingDate,
    address: { '@type': 'PostalAddress', ...company.postalAddress },
    areaServed: company.serviceArea.map((name) => ({ '@type': 'Place', name })),
    contactPoint: {
      '@type': 'ContactPoint', telephone: `+86-${company.phone}`,
      contactType: '装修咨询', availableLanguage: 'zh-CN',
      url: siteUrl('/contact/', site),
    },
  };
}

export function serializeSchema(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

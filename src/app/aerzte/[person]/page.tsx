import { reader } from '@/lib/keystatic';
import { DoctorHubPage } from '@/components/content/DoctorHubPage';
import { getDoctorHubUrl } from '@/lib/routes';

const BASE = 'https://medicsingles.de/magazin';

export const dynamicParams = false;

export async function generateStaticParams() {
  const persons = await reader.collections.persons.all();
  return persons
    .filter((p) => p.entry.personType === 'promi-arzt' && p.entry.status !== 'draft')
    .map((p) => ({ person: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ person: string }> }) {
  const { person: slug } = await params;
  const person = await reader.collections.persons.read(slug);
  if (!person) return {};
  const url = `${BASE}${getDoctorHubUrl(slug)}`;
  const title = person.seoTitle || `${person.name} — Steckbrief, Karriere & alle Artikel`;
  const description = person.seoDescription || person.intro || undefined;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'profile',
      siteName: 'Medicsingles Magazin',
      locale: 'de_DE',
      images: person.featuredImage ? [person.featuredImage] : [],
    },
  };
}

export default async function DoctorHub({ params }: { params: Promise<{ person: string }> }) {
  const { person: slug } = await params;
  return <DoctorHubPage slug={slug} />;
}

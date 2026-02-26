import { ContactForm } from '@/components/contact-form';
import { Container } from '@/components/container';
import { BreadcrumbSchema } from '@/components/seo-schemas';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Contact',
  description: 'Contact the B2B Lead Generation Tools editorial team.',
  path: '/contact'
});

export default function ContactPage() {
  return (
    <Container>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: siteConfig.url },
          { name: 'Contact', item: `${siteConfig.url}/contact` }
        ]}
      />
      <section className="py-10">
        <ContactForm />
      </section>
    </Container>
  );
}

import { Container } from '@/components/container';
import { HubHero } from '@/components/hub-hero';
import { BreadcrumbSchema } from '@/components/seo-schemas';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Terms of Use',
  description: 'Terms of use for b2bleadgenerationtools.com.',
  path: '/terms'
});

export default function TermsPage() {
  return (
    <Container>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: siteConfig.url },
          { name: 'Terms of Use', item: `${siteConfig.url}/terms` }
        ]}
      />
      <HubHero
        title="Terms of Use"
        description="Content is for educational business software guidance only. Validate all vendor terms and pricing independently."
        subtopics={['Educational content', 'No legal advice', 'Independent verification']}
      />
      <section className="pb-16">
        <article className="article-content rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <p className="text-sm text-slate-500">Last updated: April 2, 2026</p>

          <p>
            These Terms of Use govern your access to and use of <strong>{siteConfig.url}</strong>. By using this site, you agree to these
            terms. If you do not agree, do not use the site.
          </p>

          <h2>Use of the site</h2>
          <p>
            This website publishes educational content about B2B lead generation, outbound sales, Apollo workflows, prospecting, software
            evaluation, and business growth systems. You may use the site for lawful informational purposes only.
          </p>
          <p>
            You agree not to misuse the site, interfere with its normal operation, attempt unauthorized access, or use the content in a way
            that violates applicable law.
          </p>

          <h2>No professional advice</h2>
          <p>
            Content on this site is provided for general informational and educational purposes only. It is not legal, financial, tax,
            accounting, medical, compliance, or other professional advice.
          </p>
          <p>
            You are responsible for independently evaluating any workflow, software purchase, commercial decision, or vendor claim before
            acting on it.
          </p>

          <h2>Accuracy and changes</h2>
          <p>
            We aim to keep content useful and reasonably accurate, but we do not guarantee that every page, vendor detail, feature list,
            pricing reference, or software workflow is current, complete, or error-free.
          </p>
          <p>
            Software vendors can change pricing, policies, plans, integrations, and feature access at any time. Always confirm current
            details directly on the vendor&apos;s official website.
          </p>

          <h2>Affiliate relationships</h2>
          <p>
            Some pages include affiliate links. If you click a referral link and later sign up or purchase, we may receive a commission at no
            additional cost to you. For more, see the <a href="/affiliate-disclosure">Affiliate Disclosure</a>.
          </p>

          <h2>Intellectual property</h2>
          <p>
            Unless otherwise stated, the content, site structure, written copy, branding, and original materials on this website are owned by
            or licensed to B2B Lead Generation Tools. You may not reproduce, republish, or commercially reuse substantial portions of the site
            without permission.
          </p>

          <h2>Third-party links and services</h2>
          <p>
            This site links to third-party websites, including software vendors and partner tools. We do not control those external sites and
            are not responsible for their content, pricing, policies, availability, or practices.
          </p>

          <h2>No warranties</h2>
          <p>
            The site is provided on an &quot;as is&quot; and &quot;as available&quot; basis. To the maximum extent permitted by law, we disclaim warranties of
            any kind, whether express or implied, including warranties of accuracy, merchantability, fitness for a particular purpose, and
            non-infringement.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, we are not liable for any indirect, incidental, consequential, special, or punitive damages
            arising out of or related to your use of the site, reliance on its content, or use of any third-party service linked from the site.
          </p>

          <h2>Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless B2B Lead Generation Tools from claims, liabilities, damages, losses, and expenses arising
            from your misuse of the site, violation of these terms, or violation of applicable law.
          </p>

          <h2>Termination or restriction</h2>
          <p>
            We may restrict, suspend, or terminate access to the site or any portion of it at any time if needed for security, maintenance,
            operational, or legal reasons.
          </p>

          <h2>Changes to these terms</h2>
          <p>
            We may update these Terms of Use from time to time. The latest version will be posted on this page with the revised date.
            Continued use of the site after updates means you accept the revised terms.
          </p>

          <h2>Contact</h2>
          <p>
            For questions about these terms, advertising, or business cooperation, contact{' '}
            <a href="mailto:vladkatintam@gmail.com">vladkatintam@gmail.com</a>.
          </p>
        </article>
      </section>
    </Container>
  );
}

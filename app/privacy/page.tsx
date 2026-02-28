import { Container } from '@/components/container';
import { HubHero } from '@/components/hub-hero';
import { BreadcrumbSchema } from '@/components/seo-schemas';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Privacy Policy',
  description: 'Privacy policy for b2bleadgenerationtools.com.',
  path: '/privacy'
});

export default function PrivacyPage() {
  return (
    <Container>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: siteConfig.url },
          { name: 'Privacy Policy', item: `${siteConfig.url}/privacy` }
        ]}
      />
      <HubHero
        title="Privacy Policy"
        description="We collect minimal analytics and form data to improve site experience. We do not sell personal data."
        subtopics={['Minimal data collection', 'No personal data sale', 'Secure handling']}
      />
      <section className="pb-16">
        <article className="article-content rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <p className="text-sm text-slate-500">Last updated: February 28, 2026</p>

          <p>
            This Privacy Policy explains how <strong>B2B Lead Generation Tools</strong> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses,
            and protects information when you visit <strong>{siteConfig.url}</strong>.
          </p>
          <p>
            This site publishes educational content about B2B lead generation, outbound sales, Apollo workflows, and related software.
            If you do not agree with this policy, please do not use the site.
          </p>

          <h2>Information We Collect</h2>
          <p>We collect only the information needed to operate the site, respond to messages, and improve performance.</p>
          <ul>
            <li>
              <strong>Analytics data:</strong> basic usage information such as pages viewed, approximate device/browser data, and traffic
              sources through Google Analytics.
            </li>
            <li>
              <strong>Newsletter data:</strong> if you submit your email through our newsletter form, we store the email address you provide.
            </li>
            <li>
              <strong>Contact form data:</strong> if you contact us, we collect the name, email, company information you choose to share, and
              the contents of your message.
            </li>
            <li>
              <strong>Technical data:</strong> server logs, IP-related request data, and anti-spam signals used for security and abuse prevention.
            </li>
          </ul>

          <h2>How We Use Information</h2>
          <ul>
            <li>To operate, maintain, and improve the site.</li>
            <li>To understand how visitors use our content and which pages perform best.</li>
            <li>To respond to contact requests and editorial inquiries.</li>
            <li>To support newsletter delivery and future email communication if you subscribe.</li>
            <li>To detect spam, abuse, misuse, or technical issues.</li>
          </ul>

          <h2>Cookies and Analytics</h2>
          <p>
            We use analytics tools, including Google Analytics, to understand site usage and improve content quality. These tools may use
            cookies or similar technologies to measure traffic, engagement, and page performance.
          </p>
          <p>
            You can control cookies through your browser settings. Blocking some cookies may affect how parts of the site work.
          </p>

          <h2>Newsletter and Contact Forms</h2>
          <p>
            If you subscribe to our newsletter, we use your email address to send updates, guides, and related site content. If you contact
            us, we use your information only to review and respond to your message.
          </p>
          <p>
            We use a basic anti-spam honeypot field and simple validation on forms to reduce abuse. We do not intentionally collect sensitive
            personal information through these forms.
          </p>

          <h2>Affiliate Links and Third-Party Services</h2>
          <p>
            Some pages contain affiliate links, including Apollo referral links. If you click a third-party link, you may be taken to an
            external website that has its own privacy practices. We are not responsible for the privacy policies or content of third-party sites.
          </p>
          <p>
            Third-party services we may rely on include analytics providers, hosting providers, and external software websites linked from our
            editorial content.
          </p>

          <h2>Data Retention</h2>
          <p>
            We retain data only as long as reasonably necessary for analytics, site operations, subscriber management, security review, and
            communication handling. In development, form submissions may be stored locally for testing purposes. In production, we aim to keep
            retention limited to practical business needs.
          </p>

          <h2>How We Protect Information</h2>
          <p>
            We use reasonable administrative and technical measures to protect information against unauthorized access, misuse, or disclosure.
            No website or transmission method is completely secure, so we cannot guarantee absolute security.
          </p>

          <h2>Do We Sell Personal Data?</h2>
          <p>No. We do not sell personal data.</p>

          <h2>Children&apos;s Privacy</h2>
          <p>
            This site is intended for business and professional audiences. It is not directed to children under 13, and we do not knowingly
            collect personal information from children.
          </p>

          <h2>Your Choices</h2>
          <ul>
            <li>You can stop newsletter emails by unsubscribing when that feature is available or by contacting us directly.</li>
            <li>You can disable cookies in your browser.</li>
            <li>You can choose not to submit information through forms on the site.</li>
          </ul>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect site changes, legal requirements, or operational updates. The latest
            version will always be posted on this page with the updated effective date.
          </p>

          <h2>Contact</h2>
          <p>
            If you have questions about this Privacy Policy, you can contact us through the <a href="/contact">contact page</a>.
          </p>
        </article>
      </section>
    </Container>
  );
}

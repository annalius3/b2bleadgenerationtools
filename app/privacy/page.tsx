import { Container } from '@/components/container';
import { HubHero } from '@/components/hub-hero';
import { BreadcrumbSchema } from '@/components/seo-schemas';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Privacy Policy',
  description:
    'How B2B Lead Generation Tools handles personal data: GDPR, UK GDPR, CCPA, LGPD and global privacy rights, cookies, analytics, newsletter data and transfers.',
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
        description="What we collect, why we collect it, how long we keep it, and the rights you have in the EU, UK, US, Brazil, Canada, Australia and beyond."
        subtopics={['GDPR and UK GDPR', 'CCPA and CPRA', 'Global privacy rights']}
      />
      <section className="pb-16">
        <article className="article-content rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <p className="text-sm text-slate-500">Last updated: October 30, 2026</p>

          <p>
            This Privacy Policy explains how <strong>B2B Lead Generation Tools</strong> (“we”, “us”, “our”) collects, uses,
            shares, and protects personal data when you visit <strong>{siteConfig.url}</strong>, subscribe to our newsletter,
            or contact us by email. It applies to the website and to any email we exchange with you. It does not apply to
            third-party websites we link to, including software vendors and affiliate partners.
          </p>
          <p>
            We are an independent educational publisher. For the purposes of the EU General Data Protection Regulation
            (GDPR), the UK GDPR, and similar laws, we act as the <strong>data controller</strong> for the processing
            described here.
          </p>

          <h2 id="summary">At a glance</h2>
          <ul>
            <li>There are no accounts, no payments, and no advertising on this site.</li>
            <li>We only receive your email address if you subscribe to the newsletter or write to us.</li>
            <li>
              We use Google Analytics 4 in consent mode. Visitors in the EEA, UK, and Switzerland are measured
              <strong> without analytics cookies</strong>; advertising signals are disabled for everyone.
            </li>
            <li>We never sell personal data and never share it for cross-context behavioural advertising.</li>
            <li>
              You can exercise any privacy right by emailing{' '}
              <a href="mailto:vladkatintam@gmail.com">vladkatintam@gmail.com</a>. We respond within 30 days, or 45 days for
              California requests.
            </li>
          </ul>

          <h2 id="who-we-are">1. Who we are and how to contact us</h2>
          <p>
            B2B Lead Generation Tools is an independent publisher of educational content about B2B lead generation,
            outbound sales, and Apollo workflows. We are not a data broker, a lead list vendor, or an advertising network,
            and we do not sell contact databases.
          </p>
          <ul>
            <li>
              <strong>Privacy contact:</strong>{' '}
              <a href="mailto:vladkatintam@gmail.com">vladkatintam@gmail.com</a>
            </li>
            <li>
              <strong>Postal contact:</strong> available on request where required by law. Email us and we will provide
              the relevant details.
            </li>
            <li>
              <strong>EU/UK representative:</strong> if we are ever required to appoint one under Article 27 GDPR or the
              UK GDPR, their details will be published on this page.
            </li>
          </ul>

          <h2 id="what-we-collect">2. What we collect</h2>
          <p>
            We keep collection to the minimum needed to run a content website. The table below lists every category of
            personal data we process, where it comes from, and how long we keep it.
          </p>
          <table>
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Examples</th>
                <th scope="col">Source</th>
                <th scope="col">Purpose</th>
                <th scope="col">Retention</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Newsletter data</td>
                <td>Email address, subscription status, signup time, IP address at signup</td>
                <td>You, when you submit the form</td>
                <td>Sending the newsletter and managing your subscription</td>
                <td>Until you unsubscribe, plus up to 30 days in backups</td>
              </tr>
              <tr>
                <td>Contact messages</td>
                <td>Your email address, name or company if you include them, and the message itself</td>
                <td>You, by email</td>
                <td>Reading and replying to your message</td>
                <td>Up to 24 months</td>
              </tr>
              <tr>
                <td>Server logs</td>
                <td>IP address, browser user agent, requested URL, timestamp, referrer</td>
                <td>Your browser, via our hosting provider</td>
                <td>Delivering the site, security, abuse prevention, diagnostics</td>
                <td>Typically up to 30 days, longer only for security investigations</td>
              </tr>
              <tr>
                <td>Analytics data</td>
                <td>Pages viewed, events, device and browser type, language, approximate location (country or city), referrer</td>
                <td>Your browser, via Google Analytics 4</td>
                <td>Understanding which content is useful and improving it</td>
                <td>Up to 14 months in Google Analytics</td>
              </tr>
              <tr>
                <td>Anti-spam signals</td>
                <td>Honeypot field completion and basic request validation</td>
                <td>Your browser</td>
                <td>Blocking automated spam submissions</td>
                <td>Not stored as a separate record</td>
              </tr>
            </tbody>
          </table>
          <p>
            <strong>What we do not collect:</strong> we do not ask for or intentionally process account credentials,
            payment card data, government identifiers, precise geolocation, biometric data, health data, or data from
            children. We do not buy contact lists and we do not enrich visitor data with third-party identity graphs.
          </p>

          <h2 id="legal-bases">3. How we use data and our legal bases</h2>
          <p>
            Under the GDPR and UK GDPR we must have a legal basis for each processing activity. Our bases are:
          </p>
          <ul>
            <li>
              <strong>Consent (Article 6(1)(a)):</strong> sending the newsletter, and setting analytics cookies where
              consent is required. You can withdraw consent at any time without affecting past processing.
            </li>
            <li>
              <strong>Legitimate interests (Article 6(1)(f)):</strong> operating and securing the site, preventing abuse,
              measuring content performance with cookieless analytics, replying to messages, and establishing or defending
              legal claims. We balance these interests against your rights and you may object at any time.
            </li>
            <li>
              <strong>Legal obligation (Article 6(1)(c)):</strong> responding to valid legal requests and keeping records
              where the law requires it.
            </li>
          </ul>
          <p>
            We do not process special category data under Article 9, we do not make solely automated decisions that
            produce legal or similarly significant effects, and we do not build advertising profiles of visitors.
          </p>

          <h2 id="cookies">4. Cookies, analytics, and similar technologies</h2>
          <p>
            We use <strong>Google Analytics 4</strong> (measurement ID <code>G-NF7C5NYTC6</code>) to understand which
            guides are read and which pages need improvement. Google acts as our processor for this measurement.
          </p>
          <p>
            Analytics runs in <strong>Google Consent Mode v2</strong>. Advertising storage, ad user data, and ad
            personalisation are set to <code>denied</code> for every visitor. Analytics storage is set to
            <code>granted</code> only when all of the following are true:
          </p>
          <ul>
            <li>your IP address is not located in the EEA, the United Kingdom, or Switzerland (or Gibraltar and the Crown Dependencies);</li>
            <li>your browser does not send a Global Privacy Control (GPC) or Do Not Track (DNT) signal.</li>
          </ul>
          <p>
            For visitors in the restricted regions, Google Analytics receives <strong>cookieless pings</strong>: page
            views and events are measured in aggregate, no analytics cookies or cross-site identifiers are stored on your
            device, and no data is used for advertising. Because no analytics cookie is set in those regions, no cookie
            banner is required for analytics.
          </p>
          <table>
            <thead>
              <tr>
                <th scope="col">Cookie</th>
                <th scope="col">Provider</th>
                <th scope="col">Purpose</th>
                <th scope="col">Duration</th>
                <th scope="col">When it is set</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>_ga</code>
                </td>
                <td>Google</td>
                <td>Distinguishes unique visitors for aggregate statistics</td>
                <td>Up to 2 years</td>
                <td>Only outside the EEA, UK, and Switzerland, and only without GPC/DNT</td>
              </tr>
              <tr>
                <td>
                  <code>_ga_&lt;container-id&gt;</code>
                </td>
                <td>Google</td>
                <td>Maintains session state for Google Analytics</td>
                <td>Up to 2 years</td>
                <td>Same conditions as above</td>
              </tr>
            </tbody>
          </table>
          <p>
            We do not set first-party advertising cookies, we do not use Google Signals, remarketing, or ads
            personalisation, and we do not embed social media pixels. The newsletter form sets no cookies: after
            submission it redirects back to this site.
          </p>
          <p>
            We store one value in your browser’s <code>sessionStorage</code> named <code>geo-country</code>. It contains
            only a two-letter country code and exists solely to decide whether analytics cookies are allowed. It is not
            shared with anyone and is cleared when you close the tab.
          </p>
          <p>
            <strong>Your controls:</strong> you can block or delete cookies in your browser settings at any time. You can
            install the official{' '}
            <a href="https://tools.google.com/dlpage/gaoptout" rel="noopener noreferrer" target="_blank">
              Google Analytics opt-out browser add-on
            </a>
            . If your browser sends GPC or DNT, we automatically disable analytics cookies. Blocking analytics does not
            affect any content on the site.
          </p>

          <h2 id="newsletter">5. Newsletter</h2>
          <p>
            If you subscribe, we use your email address to send occasional guides and updates about B2B lead generation.
            Subscription uses a double opt-in: you must confirm your address before receiving anything. Every email
            includes an unsubscribe link, and you can also ask us to delete your data at any time.
          </p>
          <p>
            We use <strong>Kit (formerly ConvertKit)</strong> as our email service provider. Kit processes your email
            address, subscription status, signup metadata, and — if enabled — aggregate open and click statistics on our
            behalf under a data processing agreement. Kit is based in the United States; transfers are covered by the
            safeguards described in section 9.
          </p>
          <p>
            When you unsubscribe, we keep a minimal suppression record (your email in hashed or plain form) so that we do
            not contact you again by mistake.
          </p>

          <h2 id="contact">6. Contact messages</h2>
          <p>
            Our contact page uses a <code>mailto:</code> link, which opens your own email application. We receive your
            message through Google Gmail. We use it only to reply and to keep a record of the conversation. Please do not
            send sensitive personal data, credentials, or confidential business information by email.
          </p>

          <h2 id="affiliates">7. Affiliate links and third-party sites</h2>
          <p>
            Some pages contain affiliate links, including Apollo referral links. If you click one and later sign up for a
            paid plan, we may receive a commission at no extra cost to you. This never affects our editorial
            recommendations. See our <a href="/affiliate-disclosure">Affiliate Disclosure</a> for details.
          </p>
          <p>
            When you click an affiliate or vendor link, the destination site may set its own cookies and collect data under
            its own privacy policy. We do not control those sites and do not receive your personal data from them. We may
            receive aggregate reports (for example, the number of referrals or commissions) that do not identify you.
          </p>

          <h2 id="sharing">8. Who we share data with</h2>
          <p>
            We share personal data only with service providers that help us run the site, and only as needed. Each is bound
            by a data processing agreement and may use the data only on our instructions.
          </p>
          <table>
            <thead>
              <tr>
                <th scope="col">Provider</th>
                <th scope="col">Service</th>
                <th scope="col">Data</th>
                <th scope="col">Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Vercel Inc.</td>
                <td>Hosting, content delivery, server logs</td>
                <td>IP address, request metadata, user agent</td>
                <td>United States and global edge network</td>
              </tr>
              <tr>
                <td>Google LLC / Google Ireland Ltd</td>
                <td>Google Analytics 4, Gmail</td>
                <td>Analytics events, email correspondence</td>
                <td>United States, Ireland</td>
              </tr>
              <tr>
                <td>Kit (ConvertKit LLC)</td>
                <td>Newsletter delivery</td>
                <td>Email address, subscription status</td>
                <td>United States</td>
              </tr>
            </tbody>
          </table>
          <p>
            <strong>We do not sell personal data and we do not share it for cross-context behavioural advertising.</strong>{' '}
            We do not disclose data to data brokers, advertising networks, or lead list vendors. We may disclose data if
            required by law, to respond to valid legal process, to protect our rights or safety, or as part of a merger,
            acquisition, or sale of assets (in which case we will notify you where required).
          </p>

          <h2 id="transfers">9. International transfers</h2>
          <p>
            Our providers are mainly based in the United States, so personal data may be transferred outside your country.
            Where the EU, UK, or Swiss law applies, we rely on:
          </p>
          <ul>
            <li>
              the European Commission’s Standard Contractual Clauses (2021/914), or the EU–US Data Privacy Framework
              where the recipient is certified;
            </li>
            <li>
              the UK International Data Transfer Addendum, or the UK Extension to the EU–US Data Privacy Framework where
              applicable;
            </li>
            <li>
              the Swiss–US Data Privacy Framework where the recipient is certified, or Standard Contractual Clauses
              recognised by the FDPIC;
            </li>
          </ul>
          <p>
            Transfers are protected by encryption in transit, access controls, and data minimisation. You can request more
            information about the safeguards we use by emailing us.
          </p>

          <h2 id="retention">10. How long we keep data</h2>
          <ul>
            <li>
              <strong>Newsletter:</strong> until you unsubscribe or ask us to delete your data, plus up to 30 days in
              backups. A minimal suppression record may be kept to honour your opt-out.
            </li>
            <li>
              <strong>Contact messages:</strong> up to 24 months, then deleted unless we need them for an ongoing matter.
            </li>
            <li>
              <strong>Server logs:</strong> typically up to 30 days; longer only where needed to investigate a security
              incident or comply with the law.
            </li>
            <li>
              <strong>Analytics:</strong> up to 14 months in Google Analytics; cookieless pings are aggregated and cannot
              be tied back to you.
            </li>
            <li>
              <strong>Cookie lifetime:</strong> as shown in section 4, and never longer than 2 years.
            </li>
          </ul>

          <h2 id="security">11. Security</h2>
          <p>
            We use HTTPS with HSTS, strict transport and content security headers, access controls on our accounts, and
            data minimisation. Our providers maintain industry-standard security programmes. We do not store payment data
            or sensitive categories of personal data.
          </p>
          <p>
            No method of transmission or storage is completely secure. If a breach affects your rights, we will notify you
            and the relevant authority where the law requires it.
          </p>

          <h2 id="rights">12. Your rights</h2>
          <p>Subject to your local law, you may have the right to:</p>
          <ul>
            <li>know whether we process your personal data and obtain a copy of it;</li>
            <li>correct inaccurate data and complete incomplete data;</li>
            <li>delete your data (the “right to be forgotten”);</li>
            <li>restrict or object to processing, including direct marketing;</li>
            <li>receive your data in a portable, machine-readable format;</li>
            <li>withdraw consent at any time, without affecting processing already carried out;</li>
            <li>not be discriminated against for exercising your rights;</li>
            <li>lodge a complaint with a supervisory authority.</li>
          </ul>
          <p>
            <strong>How to exercise them:</strong> email{' '}
            <a href="mailto:vladkatintam@gmail.com">vladkatintam@gmail.com</a> with enough detail for us to identify the
            data you mean. We may ask you to verify your email address. Requests are free of charge and we answer within
            30 days (45 days under California law, extendable once where permitted). If we cannot fulfil a request, we
            will explain why.
          </p>
          <p>
            California residents may use an authorised agent; we may require written permission and verification of your
            identity. Residents of US states with an appeal right may ask us to reconsider a refusal, and we will respond
            in writing.
          </p>

          <h3>Regional summary</h3>
          <table>
            <thead>
              <tr>
                <th scope="col">Region</th>
                <th scope="col">Law</th>
                <th scope="col">Key rights and authority</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>European Economic Area</td>
                <td>GDPR</td>
                <td>
                  Rights in Articles 15–21; complaint to your national supervisory authority or the{' '}
                  <a href="https://www.edpb.europa.eu" rel="noopener noreferrer" target="_blank">
                    EDPB
                  </a>
                  .
                </td>
              </tr>
              <tr>
                <td>United Kingdom</td>
                <td>UK GDPR and Data Protection Act 2018</td>
                <td>
                  Same core rights; complaint to the{' '}
                  <a href="https://ico.org.uk" rel="noopener noreferrer" target="_blank">
                    ICO
                  </a>
                  .
                </td>
              </tr>
              <tr>
                <td>Switzerland</td>
                <td>FADP</td>
                <td>
                  Access, correction, deletion, objection; complaint to the{' '}
                  <a href="https://www.edoeb.admin.ch" rel="noopener noreferrer" target="_blank">
                    FDPIC
                  </a>
                  .
                </td>
              </tr>
              <tr>
                <td>California, USA</td>
                <td>CCPA/CPRA</td>
                <td>
                  Know, delete, correct, opt out of sale/share, limit sensitive data, non-discrimination; see section 13.
                </td>
              </tr>
              <tr>
                <td>Other US states</td>
                <td>
                  Virginia, Colorado, Connecticut, Utah, Texas, Oregon, Montana and similar laws
                </td>
                <td>Access, correction, deletion, portability, opt-out of targeted advertising and sale, appeal.</td>
              </tr>
              <tr>
                <td>Brazil</td>
                <td>LGPD</td>
                <td>
                  Confirmation, access, correction, anonymisation, portability, deletion, information about sharing;
                  complaint to the{' '}
                  <a href="https://www.gov.br/anpd" rel="noopener noreferrer" target="_blank">
                    ANPD
                  </a>
                  .
                </td>
              </tr>
              <tr>
                <td>Canada</td>
                <td>PIPEDA and Quebec Law 25</td>
                <td>
                  Access, correction, withdrawal of consent; complaint to the{' '}
                  <a href="https://www.priv.gc.ca" rel="noopener noreferrer" target="_blank">
                    OPC
                  </a>{' '}
                  or the CAI in Quebec.
                </td>
              </tr>
              <tr>
                <td>Australia</td>
                <td>Privacy Act 1988 and Australian Privacy Principles</td>
                <td>
                  Access, correction, complaint to the{' '}
                  <a href="https://www.oaic.gov.au" rel="noopener noreferrer" target="_blank">
                    OAIC
                  </a>
                  .
                </td>
              </tr>
              <tr>
                <td>Japan</td>
                <td>APPI</td>
                <td>Disclosure, correction, suspension of use; cross-border transfer safeguards; PPC oversight.</td>
              </tr>
              <tr>
                <td>South Korea</td>
                <td>PIPA</td>
                <td>Access, correction, deletion, suspension; consent for cross-border transfer; PIPC oversight.</td>
              </tr>
              <tr>
                <td>India</td>
                <td>DPDP Act 2023</td>
                <td>Access, correction, erasure, grievance redressal; Data Protection Board of India.</td>
              </tr>
              <tr>
                <td>Singapore</td>
                <td>PDPA</td>
                <td>Access, correction, withdrawal of consent; complaint to the PDPC.</td>
              </tr>
              <tr>
                <td>South Africa</td>
                <td>POPIA</td>
                <td>Access, correction, deletion, objection; complaint to the Information Regulator.</td>
              </tr>
              <tr>
                <td>United Arab Emirates</td>
                <td>PDPL</td>
                <td>Access, correction, deletion, restriction, objection; UAE Data Office.</td>
              </tr>
              <tr>
                <td>New Zealand</td>
                <td>Privacy Act 2020</td>
                <td>Access, correction; complaint to the Privacy Commissioner.</td>
              </tr>
            </tbody>
          </table>
          <p>
            If your country is not listed, you still have the rights granted by your local law. Contact us and we will do
            our best to help, or explain where we cannot.
          </p>

          <h2 id="california">13. California notice at collection</h2>
          <p>
            This section supplements the rest of the policy for California residents under the CCPA as amended by the
            CPRA.
          </p>
          <ul>
            <li>
              <strong>Categories collected in the last 12 months:</strong> identifiers (email address, IP address),
              internet or network activity (pages viewed, events), device and browser information, and approximate
              geolocation derived from IP (country or city level).
            </li>
            <li>
              <strong>Sources:</strong> directly from you (newsletter, email) and automatically from your browser.
            </li>
            <li>
              <strong>Purposes:</strong> providing and securing the site, responding to messages, sending the newsletter,
              and measuring content performance. We do not use data for advertising.
            </li>
            <li>
              <strong>Sale or sharing:</strong> we do not sell personal information and we do not share it for cross-context
              behavioural advertising, as those terms are defined by the CCPA.
            </li>
            <li>
              <strong>Sensitive personal information:</strong> we do not collect it, and therefore do not use or disclose it
              beyond the purposes permitted by law.
            </li>
            <li>
              <strong>Retention:</strong> as described in section 10.
            </li>
            <li>
              <strong>Financial incentives:</strong> none. We do not offer discounts or payments in exchange for data.
            </li>
          </ul>
          <p>
            To exercise your rights, email{' '}
            <a href="mailto:vladkatintam@gmail.com">vladkatintam@gmail.com</a>. Because we do not sell or share personal
            information, there is no separate “Do Not Sell or Share My Personal Information” opt-out link. If that ever
            changes, we will add one and update this policy before the change takes effect.
          </p>

          <h2 id="dnt">14. Global Privacy Control and Do Not Track</h2>
          <p>
            We honour the Global Privacy Control signal and the Do Not Track browser setting by disabling analytics
            cookies. Because we do not run advertising or sell data, these signals do not change anything else on the site.
          </p>

          <h2 id="children">15. Children’s privacy</h2>
          <p>
            This site is written for business professionals and is not directed to children. We do not knowingly collect
            personal data from anyone under 16 in the EEA or UK, or under 13 in the United States. If you believe a child
            has provided us with personal data, email us and we will delete it.
          </p>

          <h2 id="automated">16. Automated decision-making</h2>
          <p>
            We do not use automated decision-making, including profiling, that produces legal or similarly significant
            effects.
          </p>

          <h2 id="changes">17. Changes to this policy</h2>
          <p>
            We may update this policy to reflect changes in our practices, providers, or the law. The revised version will
            always be published on this page with a new “Last updated” date. If a change materially affects your rights, we
            will highlight it on the site or, where we have your email, notify you directly.
          </p>

          <h2 id="complaints">18. Contact and complaints</h2>
          <p>
            Questions, requests, or complaints about privacy can be sent to{' '}
            <a href="mailto:vladkatintam@gmail.com">vladkatintam@gmail.com</a>. We aim to resolve every issue directly and
            will respond within the time limits described in section 12.
          </p>
          <p>
            You also have the right to complain to your local data protection authority at any time. We would appreciate
            the chance to address your concern first.
          </p>
        </article>
      </section>
    </Container>
  );
}

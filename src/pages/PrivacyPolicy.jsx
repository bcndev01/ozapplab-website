import { useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { DataContext } from '../App'
import PageWrapper from '../components/PageWrapper'

export default function PrivacyPolicy() {
  const { appId } = useParams()
  const data = useContext(DataContext)
  const app = data?.apps.find(a => a.id === appId)

  if (!app) return null

  const { lastUpdated, effectiveDate } = app.pages.privacyPolicy

  return (
    <PageWrapper>
      <article className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-text-muted text-sm mb-12">Last updated: {lastUpdated} &middot; Effective: {effectiveDate}</p>

        <div className="prose-custom">
          <p>OzAppLab (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) operates the {app.name} mobile application (the &quot;App&quot;). This Privacy Policy explains how we collect, use, and protect your information.</p>

          <h2>1. Information We Collect</h2>

          <h3>1.1 Information You Provide</h3>
          <ul>
            <li>Custom photos you add to create puzzles (stored locally on your device only)</li>
            <li>Player name for multiplayer games (stored temporarily on our servers)</li>
          </ul>

          <h3>1.2 Automatically Collected Information</h3>
          <ul>
            <li>Game progress and statistics (stored locally and synced via iCloud)</li>
            <li>Device language preference</li>
            <li>Multiplayer room data (room codes, game states)</li>
          </ul>

          <h3>1.3 Third-Party Services</h3>
          <p>Our App uses the following third-party services that may collect information:</p>

          <div className="my-4 p-5 rounded-xl bg-surface/60 border border-border">
            <p className="font-semibold text-text-primary mb-2">a) Google AdMob (Advertising)</p>
            <ul>
              <li>Collects: Device advertising identifier (IDFA), device information, IP address</li>
              <li>Purpose: To serve personalized and non-personalized advertisements</li>
              <li>Privacy Policy: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a></li>
            </ul>
          </div>

          <div className="my-4 p-5 rounded-xl bg-surface/60 border border-border">
            <p className="font-semibold text-text-primary mb-2">b) Apple iCloud (Data Sync)</p>
            <ul>
              <li>Collects: Game progress data via iCloud Key-Value Storage</li>
              <li>Purpose: To sync your game progress across your Apple devices</li>
              <li>Privacy Policy: <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer">apple.com/legal/privacy</a></li>
            </ul>
          </div>

          <div className="my-4 p-5 rounded-xl bg-surface/60 border border-border">
            <p className="font-semibold text-text-primary mb-2">c) Supabase (Multiplayer Backend)</p>
            <ul>
              <li>Collects: Player ID (anonymous UUID), room data, game states</li>
              <li>Purpose: To enable real-time multiplayer functionality</li>
              <li>Data is temporary and deleted when game rooms expire (30 minutes)</li>
              <li>Privacy Policy: <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">supabase.com/privacy</a></li>
            </ul>
          </div>

          <div className="my-4 p-5 rounded-xl bg-surface/60 border border-border">
            <p className="font-semibold text-text-primary mb-2">d) Cloudflare (Content Delivery)</p>
            <ul>
              <li>Collects: IP address, request metadata (standard CDN logs)</li>
              <li>Purpose: To deliver puzzle images efficiently</li>
              <li>Privacy Policy: <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">cloudflare.com/privacypolicy</a></li>
            </ul>
          </div>

          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>Provide and improve the App&apos;s functionality</li>
            <li>Sync your game progress across devices via iCloud</li>
            <li>Enable multiplayer gameplay</li>
            <li>Serve advertisements (for free users)</li>
            <li>Analyze app performance and fix bugs</li>
          </ul>

          <h2>3. Data Storage and Security</h2>
          <ul>
            <li>Game progress is stored locally on your device using encrypted storage</li>
            <li>iCloud data is protected by Apple&apos;s security infrastructure</li>
            <li>Multiplayer data is stored temporarily on Supabase servers (AWS, EU region)</li>
            <li>We do not store personal information on our own servers</li>
            <li>Custom photos never leave your device</li>
          </ul>

          <h2>4. Advertising</h2>
          <p>We use Google AdMob to display advertisements. You can opt out of personalized advertising:</p>
          <ul>
            <li>iOS: Settings &gt; Privacy &amp; Security &gt; Tracking &gt; disable for {app.name}</li>
            <li>You can purchase &quot;Remove Ads&quot; to eliminate all advertisements</li>
          </ul>

          <h2>5. Children&apos;s Privacy</h2>
          <p>{app.name} is rated 12+ due to advertising content. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal data, please contact us.</p>

          <h2>6. In-App Purchases</h2>
          <p>The App offers a one-time &quot;Remove Ads&quot; purchase. Payment is processed by Apple and subject to Apple&apos;s terms and conditions. We do not have access to your payment information.</p>

          <h2>7. Your Rights</h2>
          <ul>
            <li>Access your data (game progress is visible in the app)</li>
            <li>Delete your data (Settings &gt; Reset Progress, or delete the app)</li>
            <li>Opt out of personalized advertising</li>
            <li>Request data deletion by contacting us</li>
          </ul>

          <h2>8. Data Retention</h2>
          <ul>
            <li>Game progress: Retained until you delete the app or reset progress</li>
            <li>Multiplayer data: Automatically deleted after 30 minutes</li>
            <li>Analytics events: Automatically pruned after 30 days</li>
          </ul>

          <h2>9. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated &quot;Last updated&quot; date.</p>

          <h2>10. Contact Us</h2>
          <p>If you have questions about this Privacy Policy, contact us at:</p>
          <ul>
            <li>Email: <a href={`mailto:${data.studio.email}`}>{data.studio.email}</a></li>
            <li>Website: <Link to={`/${appId}/support`}>Support Page</Link></li>
          </ul>

          <h2>11. GDPR (European Users)</h2>
          <p>If you are in the European Economic Area, you have additional rights under GDPR:</p>
          <ul>
            <li>Right to access, rectification, erasure, and data portability</li>
            <li>Right to restrict or object to processing</li>
            <li>Right to lodge a complaint with a supervisory authority</li>
            <li>Data controller: OzAppLab, {data.studio.location}</li>
          </ul>

          <h2>12. CCPA (California Users)</h2>
          <p>If you are a California resident, you have additional rights under CCPA:</p>
          <ul>
            <li>Right to know what personal information is collected</li>
            <li>Right to delete personal information</li>
            <li>Right to opt-out of the sale of personal information</li>
            <li>We do not sell your personal information</li>
          </ul>
        </div>
      </article>
    </PageWrapper>
  )
}

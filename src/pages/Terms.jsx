import { useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { DataContext } from '../App'
import PageWrapper from '../components/PageWrapper'

export default function Terms() {
  const { appId } = useParams()
  const data = useContext(DataContext)
  const app = data?.apps.find(a => a.id === appId)

  if (!app) return null

  return (
    <PageWrapper>
      <article className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Terms of Use</h1>
        <p className="text-text-muted text-sm mb-12">Last updated: {app.pages.terms.lastUpdated}</p>

        <div className="prose-custom">
          <p>Please read these Terms of Use (&quot;Terms&quot;) carefully before using the {app.name} mobile application (&quot;App&quot;) operated by OzAppLab (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;).</p>

          <h2>1. Acceptance of Terms</h2>
          <p>By downloading, installing, or using the App, you agree to be bound by these Terms. If you do not agree, do not use the App.</p>

          <h2>2. License</h2>
          <p>We grant you a limited, non-exclusive, non-transferable, revocable license to use the App for personal, non-commercial purposes, subject to these Terms.</p>

          <h2>3. User Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Reverse engineer, decompile, or disassemble the App</li>
            <li>Use the App for any illegal purpose</li>
            <li>Exploit bugs or glitches for unfair advantage in multiplayer</li>
            <li>Use automated tools, bots, or scripts to interact with the App</li>
            <li>Harass, abuse, or harm other players in multiplayer mode</li>
            <li>Attempt to bypass the advertising or in-app purchase systems</li>
          </ul>

          <h2>4. In-App Purchases</h2>
          <ul>
            <li>The App offers a &quot;Remove Ads&quot; in-app purchase</li>
            <li>All purchases are processed by Apple through the App Store</li>
            <li>Purchases are non-refundable except as required by applicable law</li>
            <li>Refund requests must be directed to Apple</li>
          </ul>

          <h2>5. Multiplayer</h2>
          <ul>
            <li>Multiplayer rooms are temporary and expire after 30 minutes</li>
            <li>We do not guarantee continuous availability of multiplayer services</li>
            <li>We reserve the right to terminate multiplayer sessions that violate these Terms</li>
          </ul>

          <h2>6. Content</h2>
          <ul>
            <li>Puzzle images are licensed for use within the App only</li>
            <li>You may not download, redistribute, or use puzzle images outside the App</li>
            <li>Custom photos you upload remain your property and are stored only on your device</li>
          </ul>

          <h2>7. Advertising</h2>
          <ul>
            <li>Free users will see advertisements (banner, interstitial, and rewarded ads)</li>
            <li>Ad content is provided by third-party ad networks (Google AdMob)</li>
            <li>We are not responsible for the content of third-party advertisements</li>
          </ul>

          <h2>8. Intellectual Property</h2>
          <ul>
            <li>The App, including its design, code, and content, is owned by OzAppLab</li>
            <li>&quot;{app.name}&quot; and the App icon are trademarks of OzAppLab</li>
            <li>You may not use our trademarks without written permission</li>
          </ul>

          <h2>9. Disclaimer of Warranties</h2>
          <p className="font-semibold text-text-secondary">THE APP IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT GUARANTEE THAT THE APP WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES.</p>

          <h2>10. Limitation of Liability</h2>
          <p className="font-semibold text-text-secondary">TO THE MAXIMUM EXTENT PERMITTED BY LAW, OZAPPLAB SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING FROM YOUR USE OF THE APP.</p>

          <h2>11. Termination</h2>
          <p>We may terminate or suspend your access to the App at any time, without notice, for any reason, including violation of these Terms.</p>

          <h2>12. Changes to Terms</h2>
          <p>We may modify these Terms at any time. Continued use of the App after changes constitutes acceptance of the new Terms.</p>

          <h2>13. Governing Law</h2>
          <p>These Terms are governed by the laws of {data.studio.location}. Any disputes shall be resolved in the courts of {data.studio.location}.</p>

          <h2>14. Contact</h2>
          <p>For questions about these Terms:</p>
          <ul>
            <li>Email: <a href={`mailto:${data.studio.email}`}>{data.studio.email}</a></li>
            <li>Website: <Link to={`/${appId}/support`}>Support Page</Link></li>
          </ul>
        </div>
      </article>
    </PageWrapper>
  )
}

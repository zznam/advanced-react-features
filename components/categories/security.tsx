"use client"

import { useState } from "react"
import FeatureCard from "@/components/feature-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, ShieldCheck, AlertCircle } from "lucide-react"

export default function Security() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Security</h2>
      <p className="text-muted-foreground mb-8">
        Best practices and techniques for building secure React applications.
      </p>

      <div className="grid grid-cols-1 gap-6">
        <FeatureCard
          title="81. XSS Prevention"
          description="Prevent cross-site scripting (XSS) attacks in React applications."
          level="intermediate"
          docs="https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html"
        >
          <XSSPreventionDemo />
        </FeatureCard>

        <FeatureCard
          title="82. CSRF Protection"
          description="Protect against cross-site request forgery (CSRF) attacks."
          level="intermediate"
          docs="https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html"
        >
          <CSRFProtectionDemo />
        </FeatureCard>

        <FeatureCard
          title="83. Content Security Policy"
          description="Implement Content Security Policy (CSP) to prevent various attacks."
          level="advanced"
          docs="https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP"
        >
          <ContentSecurityPolicyDemo />
        </FeatureCard>

        <FeatureCard
          title="84. Secure Authentication"
          description="Implement secure authentication practices in React applications."
          level="advanced"
          docs="https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html"
        >
          <SecureAuthenticationDemo />
        </FeatureCard>

        <FeatureCard
          title="85. Secure Data Handling"
          description="Handle sensitive data securely in React applications."
          level="intermediate"
          docs="https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html"
        >
          <SecureDataHandlingDemo />
        </FeatureCard>
      </div>
    </div>
  )
}

// 81. XSS Prevention Demo
function XSSPreventionDemo() {
  const [userInput, setUserInput] = useState("")
  const [renderedSafely, setRenderedSafely] = useState(false)
  const [renderedUnsafely, setRenderedUnsafely] = useState(false)

  const maliciousExample = `<img src="x" onerror="alert('XSS Attack!')" />`

  const handleRenderSafely = () => {
    setRenderedSafely(true)
    setRenderedUnsafely(false)
  }

  const handleRenderUnsafely = () => {
    setRenderedUnsafely(true)
    setRenderedSafely(false)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">XSS Prevention in React</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-md p-4">
            <h4 className="text-sm font-medium mb-2">Safe by Default</h4>
            <p className="text-sm mb-4">
              React automatically escapes values in JSX, preventing most XSS attacks. Try entering some HTML or
              JavaScript below:
            </p>
            <div className="space-y-2">
              <Textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter HTML or JavaScript (e.g. <script>alert('XSS')</script>)"
                className="font-mono text-sm"
              />
              <div className="flex gap-2">
                <Button onClick={handleRenderSafely} size="sm">
                  Render Safely
                </Button>
                <Button onClick={handleRenderUnsafely} variant="outline" size="sm" className="gap-1">
                  <AlertTriangle className="h-4 w-4" />
                  Render Unsafely
                </Button>
              </div>
            </div>
          </div>

          <div className="border rounded-md p-4">
            <h4 className="text-sm font-medium mb-2">Rendering Result</h4>
            {renderedSafely && (
              <div className="space-y-2">
                <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                  <div className="flex items-start">
                    <ShieldCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <div>
                      <h5 className="text-sm font-medium text-green-800">Safe Rendering (React Default)</h5>
                      <p className="text-xs text-green-700 mt-1">
                        React automatically escapes this content before rendering:
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 p-2 bg-white rounded border border-green-200">{userInput}</div>
                </div>
                <pre className="text-xs bg-muted p-2 rounded-md overflow-auto">
                  {`// Safe rendering in React
function Component() {
  return <div>{userInput}</div>;
}`}
                </pre>
              </div>
            )}

            {renderedUnsafely && (
              <div className="space-y-2">
                <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                    <div>
                      <h5 className="text-sm font-medium text-red-800">Unsafe Rendering (dangerouslySetInnerHTML)</h5>
                      <p className="text-xs text-red-700 mt-1">
                        This bypasses React's protections and can lead to XSS vulnerabilities:
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 p-2 bg-white rounded border border-red-200">
                    <div dangerouslySetInnerHTML={{ __html: userInput }} />
                  </div>
                </div>
                <pre className="text-xs bg-muted p-2 rounded-md overflow-auto">
                  {`// Unsafe rendering in React - AVOID THIS!
function Component() {
  return <div dangerouslySetInnerHTML={{ __html: userInput }} />;
}`}
                </pre>
              </div>
            )}

            {!renderedSafely && !renderedUnsafely && (
              <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                Click a render button to see the result
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">XSS Risks and Prevention</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Common XSS Risks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <AlertTriangle className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">dangerouslySetInnerHTML:</span> Bypasses React's built-in XSS
                    protection
                  </span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">URL attributes:</span> Using user input in href, src, or style
                    attributes
                  </span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">eval() and similar:</span> Executing user-provided strings as code
                  </span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">Server-rendered content:</span> Injecting unescaped user data during
                    SSR
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Best Practices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <ShieldCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">Avoid dangerouslySetInnerHTML:</span> Use it only when absolutely
                    necessary and with sanitized content
                  </span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">Sanitize user input:</span> Use libraries like DOMPurify when you need
                    to render HTML
                  </span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">Validate URLs:</span> Ensure URLs start with http:// or https:// for
                    href/src attributes
                  </span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">Use Content Security Policy:</span> Restrict which sources can execute
                    scripts
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          Cross-Site Scripting (XSS) attacks occur when an attacker injects malicious scripts into web pages viewed by
          other users. React provides built-in protection against most XSS attacks by automatically escaping content
          rendered in JSX.
        </p>
        <p className="mt-2">
          However, there are still ways to introduce XSS vulnerabilities in React applications, particularly when using
          dangerouslySetInnerHTML, handling URLs, or integrating with third-party libraries. Always validate and
          sanitize user input, especially when it's used in potentially dangerous contexts.
        </p>
      </div>
    </div>
  )
}

// 82. CSRF Protection Demo
function CSRFProtectionDemo() {
  const [csrfToken, setCsrfToken] = useState("a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6")

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">CSRF Protection Techniques</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-md p-4">
            <h4 className="text-sm font-medium mb-2">What is CSRF?</h4>
            <p className="text-sm">
              Cross-Site Request Forgery (CSRF) attacks trick users into performing unwanted actions on a website where
              they're authenticated. For example, an attacker might create a malicious site that submits a form to your
              bank's transfer money endpoint.
            </p>
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
              <h5 className="text-xs font-medium text-amber-800 flex items-center">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Example Attack Scenario
              </h5>
              <p className="text-xs mt-1 text-amber-700">
                1. User logs into their bank account and gets a session cookie
              </p>
              <p className="text-xs mt-1 text-amber-700">2. Without logging out, they visit a malicious website</p>
              <p className="text-xs mt-1 text-amber-700">
                3. The malicious site contains a hidden form that submits to the bank's transfer endpoint
              </p>
              <p className="text-xs mt-1 text-amber-700">
                4. The browser includes the user's session cookie with the request
              </p>
              <p className="text-xs mt-1 text-amber-700">
                5. The bank processes the transfer, thinking it came from the legitimate user
              </p>
            </div>
          </div>

          <div className="border rounded-md p-4">
            <h4 className="text-sm font-medium mb-2">CSRF Token Implementation</h4>
            <pre className="text-xs bg-muted p-4 rounded-md overflow-auto">
              {`// Server-side: Generate CSRF token
app.get('/api/csrf-token', (req, res) => {
  const csrfToken = generateRandomToken();
  
  // Store the token in the user's session
  req.session.csrfToken = csrfToken;
  
  // Send the token to the client
  res.json({ csrfToken });
});

// Client-side: Include token in requests
async function fetchWithCSRF(url, options = {}) {
  // Get the CSRF token from the API or from a cookie
  const response = await fetch('/api/csrf-token');
  const { csrfToken } = await response.json();
  
  // Add the token to the request headers
  const headers = {
    ...options.headers,
    'X-CSRF-Token': csrfToken,
  };
  
  return fetch(url, {
    ...options,
    headers,
  });
}`}
            </pre>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">CSRF Protection in React</h3>
        <div className="border rounded-md p-4">
          <div className="space-y-4">
            <h4 className="text-sm font-medium mb-2">Example Form with CSRF Protection</h4>
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="amount" className="text-sm font-medium">
                  Transfer Amount
                </label>
                <Input id="amount" type="number" min="0" placeholder="Enter amount" />
              </div>
              <div className="space-y-2">
                <label htmlFor="recipient" className="text-sm font-medium">
                  Recipient Account
                </label>
                <Input id="recipient" placeholder="Enter account number" />
              </div>
              {/* Hidden CSRF token field */}
              <input type="hidden" name="csrf_token" value={csrfToken} />
              <Button type="submit">Transfer Funds</Button>
            </form>

            <div className="p-3 bg-muted rounded-md">
              <h5 className="text-xs font-medium mb-1">Generated HTML includes the CSRF token:</h5>
              <pre className="text-xs overflow-auto">
                {`<form method="post" action="/api/transfer">
  <input type="text" name="amount" value="100" />
  <input type="text" name="recipient" value="123456789" />
  <input type="hidden" name="csrf_token" value="${csrfToken}" />
  <button type="submit">Transfer Funds</button>
</form>`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">CSRF Protection Best Practices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Server-Side Measures</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <ShieldCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">Synchronizer Token Pattern:</span> Generate and validate unique tokens
                    for each session
                  </span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">Double Submit Cookie:</span> Send the token as both a cookie and a
                    request parameter
                  </span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">SameSite Cookies:</span> Set cookies with SameSite=Strict or Lax to
                    prevent cross-site sending
                  </span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">Check Referer Header:</span> Verify the request comes from your domain
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Client-Side Implementation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <ShieldCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">Fetch API Interceptors:</span> Automatically include CSRF tokens in
                    all requests
                  </span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">Custom Hooks:</span> Create a useCSRF hook to manage token fetching
                    and inclusion
                  </span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">Form Components:</span> Build form components that automatically
                    include CSRF tokens
                  </span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">API Client Configuration:</span> Configure Axios or other HTTP clients
                    to include tokens
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          Cross-Site Request Forgery (CSRF) attacks exploit the trust a website has in a user's browser. By implementing
          CSRF protection, you ensure that requests to your server come from legitimate users who intentionally
          initiated the action.
        </p>
        <p className="mt-2">
          In React applications, CSRF protection typically involves generating a unique token on the server, sending it
          to the client, and requiring that token to be included in subsequent requests. The server then validates the
          token before processing the request. This prevents attackers from forging requests, as they won't have access
          to the valid token.
        </p>
      </div>
    </div>
  )
}

// 83. Content Security Policy Demo
function ContentSecurityPolicyDemo() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Content Security Policy (CSP)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-md p-4">
            <h4 className="text-sm font-medium mb-2">What is CSP?</h4>
            <p className="text-sm">
              Content Security Policy is an added layer of security that helps detect and mitigate certain types of
              attacks, including Cross-Site Scripting (XSS) and data injection attacks. CSP works by specifying which
              content sources the browser should consider valid.
            </p>
            <div className="mt-4 p-3 bg-muted rounded-md">
              <h5 className="text-xs font-medium mb-1">CSP Header Example:</h5>
              <pre className="text-xs overflow-auto">
                {`Content-Security-Policy: default-src 'self';
  script-src 'self' https://trusted.cdn.com;
  style-src 'self' https://trusted.cdn.com;
  img-src 'self' https://trusted.cdn.com data:;
  connect-src 'self' https://api.example.com;
  font-src 'self' https://trusted.cdn.com;
  object-src 'none';
  media-src 'self';
  frame-src 'self';`}
              </pre>
            </div>
          </div>

          <div className="border rounded-md p-4">
            <h4 className="text-sm font-medium mb-2">CSP Directives</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="font-medium">default-src:</span> Fallback for other fetch directives
              </li>
              <li>
                <span className="font-medium">script-src:</span> Valid sources for JavaScript
              </li>
              <li>
                <span className="font-medium">style-src:</span> Valid sources for stylesheets
              </li>
              <li>
                <span className="font-medium">img-src:</span> Valid sources for images
              </li>
              <li>
                <span className="font-medium">connect-src:</span> Valid targets for fetch, XHR, WebSocket
              </li>
              <li>
                <span className="font-medium">font-src:</span> Valid sources for fonts
              </li>
              <li>
                <span className="font-medium">object-src:</span> Valid sources for plugins (e.g., &lt;object&gt;)
              </li>
              <li>
                <span className="font-medium">media-src:</span> Valid sources for &lt;audio&gt; and &lt;video&gt;
              </li>
              <li>
                <span className="font-medium">frame-src:</span> Valid sources for &lt;frame&gt; and &lt;iframe&gt;
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Implementing CSP in React</h3>
        <Tabs defaultValue="nextjs">
          <TabsList>
            <TabsTrigger value="nextjs">Next.js</TabsTrigger>
            <TabsTrigger value="cra">Create React App</TabsTrigger>
            <TabsTrigger value="meta">CSP Meta Tag</TabsTrigger>
          </TabsList>
          <TabsContent value="nextjs" className="pt-4">
            <pre className="text-sm bg-muted p-4 rounded-md overflow-auto">
              {`// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: \`
              default-src 'self';
              script-src 'self' ${process.env.NODE_ENV === "development" ? "'unsafe-eval'" : ""};
              style-src 'self' 'unsafe-inline';
              img-src 'self' data:;
              font-src 'self';
              object-src 'none';
              connect-src 'self' https://api.example.com;
            \`.replace(/\\s{2,}/g, ' ').trim()
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig`}
            </pre>
          </TabsContent>
          <TabsContent value="cra" className="pt-4">
            <pre className="text-sm bg-muted p-4 rounded-md overflow-auto">
              {`// For Create React App, you can add CSP headers in your server configuration
// or use the Helmet library to add CSP meta tags

// Example using express.js server
const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    \`
      default-src 'self';
      script-src 'self';
      style-src 'self' 'unsafe-inline';
      img-src 'self' data:;
      font-src 'self';
      object-src 'none';
      connect-src 'self' https://api.example.com;
    \`.replace(/\\s{2,}/g, ' ').trim()
  );
  next();
});

app.use(express.static('build'));

app.listen(3000);`}
            </pre>
          </TabsContent>
          <TabsContent value="meta" className="pt-4">
            <pre className="text-sm bg-muted p-4 rounded-md overflow-auto">
              {`// Using CSP meta tag in your HTML
// public/index.html or app/layout.tsx

<head>
  <meta
    http-equiv="Content-Security-Policy"
    content="
      default-src 'self';
      script-src 'self';
      style-src 'self' 'unsafe-inline';
      img-src 'self' data:;
      font-src 'self';
      object-src 'none';
      connect-src 'self' https://api.example.com;
    "
  />
  <!-- other head elements -->
</head>`}
            </pre>
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">CSP Challenges with React</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Common Challenges</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">Inline Scripts:</span> React may generate inline scripts, requiring
                    'unsafe-inline' or nonces
                  </span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">Inline Styles:</span> Styled-components and other CSS-in-JS libraries
                    use inline styles
                  </span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">eval() in Development:</span> Hot reloading and some bundlers use
                    eval(), requiring 'unsafe-eval'
                  </span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">Third-party Scripts:</span> Analytics, ads, and other third-party
                    scripts need to be allowed
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Solutions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <ShieldCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">Use Nonces:</span> Generate server-side nonces for inline scripts and
                    styles
                  </span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">Strict CSP in Production:</span> Use stricter policies in production
                    than in development
                  </span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">External Stylesheets:</span> Use external CSS instead of inline styles
                    where possible
                  </span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">Hash-based CSP:</span> Use hashes for inline scripts instead of
                    'unsafe-inline'
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          Content Security Policy (CSP) is a powerful security feature that helps prevent XSS attacks by controlling
          which resources can be loaded and executed on your web page. By specifying allowed sources for scripts,
          styles, images, and other content, you can significantly reduce the risk of malicious code execution.
        </p>
        <p className="mt-2">
          Implementing CSP in React applications can be challenging due to the way React works, especially with features
          like inline styles and hot reloading. However, with careful configuration and understanding of your
          application's needs, you can create a robust CSP that enhances security without breaking functionality.
        </p>
      </div>
    </div>
  )
}

// 84. Secure Authentication Demo
function SecureAuthenticationDemo() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Authentication Best Practices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-md p-4">
            <h4 className="text-sm font-medium mb-2">Token-Based Authentication</h4>
            <div className="space-y-4">
              <p className="text-sm">
                Modern React applications typically use token-based authentication (JWT, OAuth) instead of session
                cookies. Here's a typical authentication flow:
              </p>
              <ol className="text-sm space-y-2 list-decimal pl-5">
                <li>User submits credentials (username/password)</li>
                <li>Server validates credentials and issues a token</li>
                <li>Client stores the token (localStorage, secure cookie, etc.)</li>
                <li>Client includes the token in subsequent API requests</li>
                <li>Server validates the token and processes the request</li>
                <li>Token expires after a set time or is invalidated on logout</li>
              </ol>
              <div className="p-3 bg-muted rounded-md">
                <h5 className="text-xs font-medium mb-1">JWT Structure:</h5>
                <pre className="text-xs overflow-auto">
                  {`// JWT consists of three parts: header.payload.signature

// Header (Algorithm & Token Type)
{
  "alg": "HS256",
  "typ": "JWT"
}

// Payload (Claims)
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022,
  "exp": 1516242622
}

// Signature
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)`}
                </pre>
              </div>
            </div>
          </div>

          <div className="border rounded-md p-4">
            <h4 className="text-sm font-medium mb-2">Secure Token Storage</h4>
            <div className="space-y-4">
              <p className="text-sm">
                Where and how you store authentication tokens is critical for security. Each approach has trade-offs:
              </p>
              <div className="space-y-3">
                <div className="p-2 border rounded-md">
                  <h5 className="text-xs font-medium flex items-center">
                    <AlertTriangle className="h-3 w-3 text-amber-500 mr-1" />
                    localStorage / sessionStorage
                  </h5>
                  <p className="text-xs mt-1">
                    Easy to use but vulnerable to XSS attacks. Any JavaScript on your page can access it.
                  </p>
                </div>
                <div className="p-2 border rounded-md">
                  <h5 className="text-xs font-medium flex items-center">
                    <ShieldCheck className="h-3 w-3 text-green-500 mr-1" />
                    HttpOnly Cookies
                  </h5>
                  <p className="text-xs mt-1">
                    Not accessible via JavaScript, protected from XSS, but vulnerable to CSRF unless properly protected.
                  </p>
                </div>
                <div className="p-2 border rounded-md">
                  <h5 className="text-xs font-medium flex items-center">
                    <ShieldCheck className="h-3 w-3 text-green-500 mr-1" />
                    Memory (React State)
                  </h5>
                  <p className="text-xs mt-1">
                    Secure but lost on page refresh. Good for short-lived sessions or when combined with a refresh
                    token.
                  </p>
                </div>
                <div className="p-2 border rounded-md">
                  <h5 className="text-xs font-medium flex items-center">
                    <ShieldCheck className="h-3 w-3 text-green-500 mr-1" />
                    Secure, HttpOnly, SameSite Cookies
                  </h5>
                  <p className="text-xs mt-1">
                    Best approach for most applications. Protected from XSS and CSRF when properly implemented.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Authentication Implementation</h3>
        <Tabs defaultValue="context">
          <TabsList>
            <TabsTrigger value="context">Auth Context</TabsTrigger>
            <TabsTrigger value="login">Login Form</TabsTrigger>
            <TabsTrigger value="protected">Protected Routes</TabsTrigger>
          </TabsList>
          <TabsContent value="context" className="pt-4">
            <pre className="text-sm bg-muted p-4 rounded-md overflow-auto">
              {`// contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
} | null;

type AuthContextType = {
  user: User;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Try to get user info with stored token
        const response = await fetch('/api/me', {
          credentials: 'include', // Include cookies
        });
        
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Include cookies
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }
      
      const userData = await response.json();
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setUser(null);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}`}
            </pre>
          </TabsContent>
          <TabsContent value="login" className="pt-4">
            <pre className="text-sm bg-muted p-4 rounded-md overflow-auto">
              {`// components/LoginForm.tsx
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { login, error, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      // Redirect or show success message
    } catch (err) {
      // Error is handled by the auth context
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      
      <div className="flex items-center">
        <input
          id="remember-me"
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300"
        />
        <label htmlFor="remember-me" className="ml-2 block text-sm">
          Remember me
        </label>
      </div>
      
      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}
      
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 rounded-md bg-blue-600 text-white"
      >
        {loading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
}`}
            </pre>
          </TabsContent>
          <TabsContent value="protected" className="pt-4">
            <pre className="text-sm bg-muted p-4 rounded-md overflow-auto">
              {`// components/ProtectedRoute.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!loading && !user) {
      router.push('/login?returnUrl=' + encodeURIComponent(router.asPath));
    }
  }, [user, loading, router]);

  // Show loading state while checking authentication
  if (loading) {
    return <div>Loading...</div>;
  }

  // Only render children if authenticated
  return user ? <>{children}</> : null;
}

// Usage in pages:
// pages/dashboard.tsx
export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div>
        <h1>Dashboard</h1>
        <p>This page is only visible to authenticated users.</p>
      </div>
    </ProtectedRoute>
  );
}`}
            </pre>
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Authentication Security Checklist</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Frontend Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <ShieldCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">HTTPS Only:</span> Ensure your site is served over HTTPS to protect
                    credentials in transit
                  </span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">Input Validation:</span> Validate user input on the client-side to
                    prevent common attacks
                  </span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">Rate Limiting:</span> Implement rate limiting to prevent brute-force
                    attacks
                  </span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">Password Strength:</span> Enforce strong password policies and provide
                    feedback to users
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Backend Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <ShieldCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">Hashing Passwords:</span> Use strong hashing algorithms (bcrypt,
                    Argon2) to store passwords
                  </span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">Salt Passwords:</span> Use unique salts for each password to prevent
                    rainbow table attacks
                  </span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">Two-Factor Authentication:</span> Implement 2FA for added security
                  </span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">Account Lockout:</span> Lock accounts after multiple failed login
                    attempts
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          Secure authentication is the foundation of any secure web application. By implementing best practices for
          token management, storage, and authentication flows, you can protect user accounts and sensitive data from
          unauthorized access.
        </p>
        <p className="mt-2">
          In React applications, authentication typically involves using an authentication context to manage user state,
          implementing login and logout functionality, and protecting routes that require authentication. Always follow
          security checklists and stay up-to-date with the latest security recommendations to ensure your authentication
          system is robust and secure.
        </p>
      </div>
    </div>
  )
}

// 85. Secure Data Handling Demo
function SecureDataHandlingDemo() {
  const [sensitiveData, setSensitiveData] = useState("")
  const [encryptedData, setEncryptedData] = useState("")

  const handleEncrypt = async () => {
    // Simulate encryption on the client-side (for demonstration purposes only)
    // In a real application, encryption should be done on the server-side
    const key = "YOUR_ENCRYPTION_KEY" // Replace with a strong, server-side key
    const encrypted = CryptoJS.AES.encrypt(sensitiveData, key).toString()
    setEncryptedData(encrypted)
  }

  const handleDecrypt = async () => {
    // Simulate decryption on the client-side (for demonstration purposes only)
    // In a real application, decryption should be done on the server-side
    const key = "YOUR_ENCRYPTION_KEY" // Replace with a strong, server-side key
    try {
      const decrypted = CryptoJS.AES.decrypt(encryptedData, key).toString(CryptoJS.enc.Utf8)
      setSensitiveData(decrypted)
    } catch (error) {
      console.error("Decryption failed:", error)
      alert("Decryption failed. Invalid key or data.")
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Secure Data Handling Techniques</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-md p-4">
            <h4 className="text-sm font-medium mb-2">Client-Side Encryption (Demo)</h4>
            <p className="text-sm">
              This is a simplified demonstration of client-side encryption. <b>Never</b> rely solely on client-side
              encryption for sensitive data in production. Encryption should primarily occur on the server-side.
            </p>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <label htmlFor="sensitive" className="text-sm font-medium">
                  Sensitive Data
                </label>
                <Textarea
                  id="sensitive"
                  placeholder="Enter sensitive data"
                  value={sensitiveData}
                  onChange={(e) => setSensitiveData(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleEncrypt} size="sm">
                  Encrypt
                </Button>
                <Button onClick={handleDecrypt} variant="outline" size="sm">
                  Decrypt
                </Button>
              </div>
              {encryptedData && (
                <div className="space-y-2">
                  <label htmlFor="encrypted" className="text-sm font-medium">
                    Encrypted Data
                  </label>
                  <Textarea id="encrypted" value={encryptedData} readOnly />
                </div>
              )}
            </div>
          </div>

          <div className="border rounded-md p-4">
            <h4 className="text-sm font-medium mb-2">Data Sanitization and Validation</h4>
            <p className="text-sm">
              Always sanitize and validate user input to prevent injection attacks and ensure data integrity.
            </p>
            <div className="mt-4 p-3 bg-muted rounded-md">
              <h5 className="text-xs font-medium mb-1">Example Sanitization (Server-Side):</h5>
              <pre className="text-xs overflow-auto">
                {`// Server-side (Node.js with express-validator)
const { body, validationResult } = require('express-validator');

app.post(
  '/api/profile',
  [
    body('username').trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('bio').trim().escape(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Process the sanitized input
    const { username, email, bio } = req.body;
    // ...
  }
);`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Secure Data Handling Best Practices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Data Storage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <ShieldCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">Encryption at Rest:</span> Encrypt sensitive data when stored in
                    databases or file systems
                  </span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">Access Control:</span> Implement strict access control policies to
                    limit who can access sensitive data
                  </span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">Regular Backups:</span> Create regular backups of your data, and
                    ensure backups are stored securely
                  </span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">Data Masking:</span> Mask sensitive data in non-production
                    environments to protect it from unauthorized access
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Data Transmission</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <ShieldCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">HTTPS:</span> Always use HTTPS to encrypt data in transit between the
                    client and server
                  </span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">TLS:</span> Use Transport Layer Security (TLS) to secure communication
                    channels
                  </span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">Input Validation:</span> Validate all data received from the client to
                    prevent injection attacks
                  </span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">Output Encoding:</span> Encode data before sending it to the client to
                    prevent XSS attacks
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          Secure data handling is crucial for protecting sensitive information in React applications. By implementing
          encryption, sanitization, validation, and following best practices for data storage and transmission, you can
          significantly reduce the risk of data breaches and other security incidents.
        </p>
        <p className="mt-2">
          Remember that client-side encryption should only be used as an additional layer of security and should never
          be the sole method of protecting sensitive data. Always prioritize server-side encryption and follow security
          checklists to ensure your data handling practices are robust and secure.
        </p>
      </div>
    </div>
  )
}

import CryptoJS from "crypto-js"

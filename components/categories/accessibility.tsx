"use client"

import { Checkbox } from "@/components/ui/checkbox"

import type React from "react"

import { useState } from "react"
import FeatureCard from "@/components/feature-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Accessibility() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Accessibility</h2>
      <p className="text-muted-foreground mb-8">
        Techniques and best practices for building accessible React applications.
      </p>

      <div className="grid grid-cols-1 gap-6">
        <FeatureCard
          title="76. Semantic HTML"
          description="Use semantic HTML elements to improve accessibility."
          level="beginner"
          docs="https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML"
        >
          <SemanticHTMLDemo />
        </FeatureCard>

        <FeatureCard
          title="77. ARIA Attributes"
          description="Use ARIA attributes to enhance accessibility for complex components."
          level="intermediate"
          docs="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA"
        >
          <ARIAAttributesDemo />
        </FeatureCard>

        <FeatureCard
          title="78. Keyboard Navigation"
          description="Ensure components are navigable and operable with a keyboard."
          level="intermediate"
          docs="https://www.w3.org/WAI/WCAG21/Understanding/keyboard"
        >
          <KeyboardNavigationDemo />
        </FeatureCard>

        <FeatureCard
          title="79. Focus Management"
          description="Manage focus to improve the experience for keyboard and screen reader users."
          level="advanced"
          docs="https://www.w3.org/WAI/WCAG21/Understanding/focus-order"
        >
          <FocusManagementDemo />
        </FeatureCard>

        <FeatureCard
          title="80. Accessible Forms"
          description="Create forms that are accessible to all users."
          level="intermediate"
          docs="https://www.w3.org/WAI/tutorials/forms/"
        >
          <AccessibleFormsDemo />
        </FeatureCard>
      </div>
    </div>
  )
}

// 76. Semantic HTML Demo
function SemanticHTMLDemo() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <h3 className="font-medium">Non-Semantic Example</h3>
          <div className="border rounded-md p-4">
            <pre className="text-xs bg-muted p-4 rounded-md overflow-auto">
              {`// Non-semantic HTML
<div className="header">
  <div className="title">My Website</div>
  <div className="nav">
    <div className="nav-item">Home</div>
    <div className="nav-item">About</div>
    <div className="nav-item">Contact</div>
  </div>
</div>

<div className="main">
  <div className="article">
    <div className="article-title">Article Title</div>
    <div className="article-content">
      <div>This is the first paragraph.</div>
      <div>This is the second paragraph.</div>
    </div>
  </div>
  
  <div className="sidebar">
    <div className="sidebar-title">Related Links</div>
    <div className="sidebar-links">
      <div>Link 1</div>
      <div>Link 2</div>
    </div>
  </div>
</div>

<div className="footer">
  <div>Copyright 2023</div>
</div>`}
            </pre>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Semantic Example</h3>
          <div className="border rounded-md p-4">
            <pre className="text-xs bg-muted p-4 rounded-md overflow-auto">
              {`// Semantic HTML
<header>
  <h1>My Website</h1>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h2>Article Title</h2>
    <div>
      <p>This is the first paragraph.</p>
      <p>This is the second paragraph.</p>
    </div>
  </article>
  
  <aside>
    <h3>Related Links</h3>
    <ul>
      <li><a href="/link1">Link 1</a></li>
      <li><a href="/link2">Link 2</a></li>
    </ul>
  </aside>
</main>

<footer>
  <p>Copyright 2023</p>
</footer>`}
            </pre>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Live Example</h3>
        <div className="border rounded-md overflow-hidden">
          <header className="bg-primary text-white p-4">
            <h1 className="text-xl font-bold">My Website</h1>
            <nav className="mt-2">
              <ul className="flex space-x-4">
                <li>
                  <a href="#" className="hover:underline">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </header>

          <div className="flex flex-col md:flex-row">
            <main className="flex-1 p-4">
              <article>
                <h2 className="text-lg font-bold mb-2">Article Title</h2>
                <div>
                  <p className="mb-2">This is the first paragraph of the article. It contains important information.</p>
                  <p>This is the second paragraph with additional details about the topic.</p>
                </div>
              </article>
            </main>

            <aside className="md:w-64 p-4 bg-muted">
              <h3 className="text-md font-bold mb-2">Related Links</h3>
              <ul className="space-y-1">
                <li>
                  <a href="#" className="text-blue-600 hover:underline">
                    Link 1
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:underline">
                    Link 2
                  </a>
                </li>
              </ul>
            </aside>
          </div>

          <footer className="bg-gray-100 p-4 text-center text-sm">
            <p>Copyright 2023</p>
          </footer>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          Semantic HTML uses elements that clearly describe their meaning to browsers, developers, and assistive
          technologies. This improves accessibility, SEO, and code maintainability.
        </p>
        <p className="mt-2">Key semantic elements include:</p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>
            <code>&lt;header&gt;</code>, <code>&lt;footer&gt;</code>, <code>&lt;main&gt;</code>,{" "}
            <code>&lt;nav&gt;</code> - Document structure
          </li>
          <li>
            <code>&lt;article&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;aside&gt;</code> - Content grouping
          </li>
          <li>
            <code>&lt;h1&gt;</code> through <code>&lt;h6&gt;</code> - Heading hierarchy
          </li>
          <li>
            <code>&lt;ul&gt;</code>, <code>&lt;ol&gt;</code>, <code>&lt;li&gt;</code> - Lists
          </li>
          <li>
            <code>&lt;figure&gt;</code>, <code>&lt;figcaption&gt;</code> - Images with captions
          </li>
          <li>
            <code>&lt;button&gt;</code>, <code>&lt;a&gt;</code> - Interactive elements
          </li>
        </ul>
      </div>
    </div>
  )
}

// 77. ARIA Attributes Demo
function ARIAAttributesDemo() {
  const [expanded, setExpanded] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">ARIA Roles and States</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-md p-4">
            <h4 className="text-sm font-medium mb-2">Common ARIA Roles</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <code className="bg-muted px-1 rounded">role="button"</code> - Identifies an element as a button
              </li>
              <li>
                <code className="bg-muted px-1 rounded">role="navigation"</code> - Identifies a navigation section
              </li>
              <li>
                <code className="bg-muted px-1 rounded">role="tab"</code> /{" "}
                <code className="bg-muted px-1 rounded">role="tabpanel"</code> - For tab interfaces
              </li>
              <li>
                <code className="bg-muted px-1 rounded">role="dialog"</code> - For modal dialogs
              </li>
              <li>
                <code className="bg-muted px-1 rounded">role="alert"</code> - For important, time-sensitive messages
              </li>
            </ul>
          </div>

          <div className="border rounded-md p-4">
            <h4 className="text-sm font-medium mb-2">Common ARIA States and Properties</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <code className="bg-muted px-1 rounded">aria-label</code> - Provides an accessible name
              </li>
              <li>
                <code className="bg-muted px-1 rounded">aria-expanded</code> - Indicates if a control is expanded
              </li>
              <li>
                <code className="bg-muted px-1 rounded">aria-hidden</code> - Hides content from assistive technology
              </li>
              <li>
                <code className="bg-muted px-1 rounded">aria-selected</code> - Indicates the selected item
              </li>
              <li>
                <code className="bg-muted px-1 rounded">aria-live</code> - Announces dynamic content changes
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">ARIA Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Accordion Example</h4>
            <div className="border rounded-md overflow-hidden">
              <button
                className="w-full p-4 text-left font-medium flex justify-between items-center bg-muted/50"
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
                aria-controls="accordion-content"
              >
                <span>Accordion Header</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transform transition-transform ${expanded ? "rotate-180" : ""}`}
                >
                  <path
                    d="M2 4L6 8L10 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div
                id="accordion-content"
                className={`p-4 ${expanded ? "block" : "hidden"}`}
                role="region"
                aria-labelledby="accordion-header"
              >
                <p>This is the accordion content that can be expanded or collapsed.</p>
              </div>
            </div>
            <pre className="text-xs bg-muted p-2 rounded-md overflow-auto">
              {`<button
  aria-expanded={expanded}
  aria-controls="accordion-content"
>
  Accordion Header
</button>
<div
  id="accordion-content"
  role="region"
  aria-labelledby="accordion-header"
>
  Content
</div>`}
            </pre>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Custom Dropdown Example</h4>
            <div className="relative">
              <button
                className="w-full p-2 border rounded-md flex justify-between items-center"
                aria-haspopup="listbox"
                aria-expanded={expanded}
                aria-labelledby="dropdown-label"
                onClick={() => setExpanded(!expanded)}
              >
                <span id="dropdown-label">{selected || "Select an option"}</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transform transition-transform ${expanded ? "rotate-180" : ""}`}
                >
                  <path
                    d="M2 4L6 8L10 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {expanded && (
                <ul
                  className="absolute z-10 w-full mt-1 border rounded-md bg-white shadow-lg max-h-60 overflow-auto"
                  role="listbox"
                  aria-labelledby="dropdown-label"
                >
                  {["Option 1", "Option 2", "Option 3"].map((option) => (
                    <li
                      key={option}
                      role="option"
                      aria-selected={selected === option}
                      className={`p-2 cursor-pointer hover:bg-muted ${selected === option ? "bg-muted" : ""}`}
                      onClick={() => {
                        setSelected(option)
                        setExpanded(false)
                      }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <pre className="text-xs bg-muted p-2 rounded-md overflow-auto">
              {`<button
  aria-haspopup="listbox"
  aria-expanded={expanded}
  aria-labelledby="dropdown-label"
>
  <span id="dropdown-label">
    {selected || "Select an option"}
  </span>
</button>
<ul
  role="listbox"
  aria-labelledby="dropdown-label"
>
  <li
    role="option"
    aria-selected={selected === option}
  >
    Option
  </li>
</ul>`}
            </pre>
          </div>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          ARIA (Accessible Rich Internet Applications) attributes provide additional semantics to make web content and
          applications more accessible to people with disabilities.
        </p>
        <p className="mt-2">Key principles for using ARIA:</p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>Use semantic HTML whenever possible before resorting to ARIA</li>
          <li>Don't change native semantics unless absolutely necessary</li>
          <li>All interactive ARIA controls must be usable with the keyboard</li>
          <li>Don't use role="presentation" or aria-hidden="true" on focusable elements</li>
          <li>All interactive elements must have an accessible name</li>
        </ul>
      </div>
    </div>
  )
}

// 78. Keyboard Navigation Demo
function KeyboardNavigationDemo() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setActiveIndex((index + 1) % 4)
        break
      case "ArrowUp":
        e.preventDefault()
        setActiveIndex((index - 1 + 4) % 4)
        break
      case "Home":
        e.preventDefault()
        setActiveIndex(0)
        break
      case "End":
        e.preventDefault()
        setActiveIndex(3)
        break
      case "Enter":
      case " ": // Space
        e.preventDefault()
        alert(`Selected item ${index + 1}`)
        break
      case "Escape":
        e.preventDefault()
        setIsMenuOpen(false)
        break
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Keyboard Navigation Patterns</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-md p-4">
            <h4 className="text-sm font-medium mb-2">Common Keyboard Interactions</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="font-medium">Tab/Shift+Tab:</span> Navigate between focusable elements
              </li>
              <li>
                <span className="font-medium">Enter/Space:</span> Activate buttons and links
              </li>
              <li>
                <span className="font-medium">Arrow keys:</span> Navigate within components (menus, tabs, etc.)
              </li>
              <li>
                <span className="font-medium">Escape:</span> Close dialogs, menus, or cancel actions
              </li>
              <li>
                <span className="font-medium">Home/End:</span> Move to first/last item in a list
              </li>
            </ul>
          </div>

          <div className="border rounded-md p-4">
            <h4 className="text-sm font-medium mb-2">Focus Indicators</h4>
            <div className="space-y-4">
              <p className="text-sm">
                Always ensure visible focus indicators for keyboard users. Try tabbing through these elements:
              </p>
              <div className="flex flex-wrap gap-2">
                <Button>Default Button</Button>
                <Button variant="outline">Outline Button</Button>
                <a href="#" className="text-blue-600 hover:underline">
                  Link
                </a>
                <Input className="w-40" placeholder="Input field" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Interactive Example</h3>
        <div className="border rounded-md p-4">
          <div className="space-y-2">
            <p className="text-sm mb-4">
              This menu is keyboard navigable. Click on it or press Tab to focus, then use arrow keys to navigate, Enter
              to select, and Escape to close.
            </p>

            <div className="relative">
              <Button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-haspopup="true"
                aria-expanded={isMenuOpen}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown" && !isMenuOpen) {
                    e.preventDefault()
                    setIsMenuOpen(true)
                  }
                  if (e.key === "Escape" && isMenuOpen) {
                    e.preventDefault()
                    setIsMenuOpen(false)
                  }
                }}
              >
                Menu
              </Button>

              {isMenuOpen && (
                <ul
                  className="absolute z-10 w-48 mt-1 border rounded-md bg-white shadow-lg"
                  role="menu"
                  aria-orientation="vertical"
                >
                  {["Item 1", "Item 2", "Item 3", "Item 4"].map((item, index) => (
                    <li
                      key={index}
                      role="menuitem"
                      tabIndex={0}
                      className={`p-2 cursor-pointer ${activeIndex === index ? "bg-muted" : "hover:bg-muted/50"}`}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onClick={() => alert(`Selected ${item}`)}
                      onFocus={() => setActiveIndex(index)}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Implementation Example</h3>
        <pre className="text-sm bg-muted p-4 rounded-md overflow-auto">
          {`function KeyboardNavigableMenu() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleKeyDown = (e, index) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((index + 1) % items.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((index - 1 + items.length) % items.length);
        break;
      case 'Home':
        e.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setActiveIndex(items.length - 1);
        break;
      case 'Enter':
      case ' ': // Space
        e.preventDefault();
        selectItem(index);
        break;
      case 'Escape':
        e.preventDefault();
        setIsMenuOpen(false);
        break;
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-haspopup="true"
        aria-expanded={isMenuOpen}
        onKeyDown={/* handle key events */}
      >
        Menu
      </button>

      {isMenuOpen && (
        <ul role="menu" aria-orientation="vertical">
          {items.map((item, index) => (
            <li
              key={index}
              role="menuitem"
              tabIndex={0}
              className={activeIndex === index ? 'active' : ''}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onClick={() => selectItem(index)}
              onFocus={() => setActiveIndex(index)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`}
        </pre>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          Keyboard navigation is essential for users who cannot use a mouse, including people with motor disabilities,
          visual impairments, or those who prefer keyboard shortcuts.
        </p>
        <p className="mt-2">Key principles for keyboard accessibility:</p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>All interactive elements must be focusable and operable with a keyboard</li>
          <li>Focus order should be logical and intuitive</li>
          <li>Visible focus indicators must be provided</li>
          <li>Custom widgets should follow established keyboard interaction patterns</li>
          <li>Avoid keyboard traps where focus cannot escape from an element</li>
        </ul>
      </div>
    </div>
  )
}

// 79. Focus Management Demo
function FocusManagementDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Focus Management Techniques</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-md p-4">
            <h4 className="text-sm font-medium mb-2">Modal Dialog Focus</h4>
            <div className="space-y-4">
              <p className="text-sm">
                When a modal opens, focus should move to the modal and be trapped inside until it closes.
              </p>
              <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>

              {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div
                    className="bg-white rounded-lg p-6 w-full max-w-md"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                  >
                    <h2 id="modal-title" className="text-lg font-bold mb-4">
                      Focus Management Demo
                    </h2>
                    <p className="mb-4">
                      This modal traps focus inside. Try tabbing through the elements - focus will cycle within the
                      modal.
                    </p>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setIsModalOpen(false)}>Confirm</Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="border rounded-md p-4">
            <h4 className="text-sm font-medium mb-2">Programmatic Focus</h4>
            <pre className="text-xs bg-muted p-4 rounded-md overflow-auto">
              {`// Using refs to manage focus
const inputRef = useRef(null);

// Focus an element programmatically
const focusInput = () => {
  inputRef.current.focus();
};

// Return focus after an operation
useEffect(() => {
  const previouslyFocused = document.activeElement;
  
  return () => {
    previouslyFocused.focus();
  };
}, []);

// Focus first element in a modal
useEffect(() => {
  if (isOpen) {
    firstFocusableElement.focus();
  }
}, [isOpen]);`}
            </pre>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Skip Links</h3>
        <div className="border rounded-md p-4">
          <div className="space-y-4">
            <p className="text-sm">
              Skip links allow keyboard users to bypass navigation and jump directly to the main content.
            </p>
            <div className="border rounded-md overflow-hidden">
              <div className="relative">
                <a href="#main-content" className="absolute -top-10 left-0 bg-primary text-white p-2 focus:top-0 z-50">
                  Skip to main content
                </a>
                <header className="bg-muted p-4">
                  <nav>
                    <ul className="flex gap-4">
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">
                          Home
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">
                          About
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">
                          Contact
                        </a>
                      </li>
                    </ul>
                  </nav>
                </header>
                <main id="main-content" className="p-4" tabIndex={-1}>
                  <h2 className="text-lg font-bold mb-2">Main Content</h2>
                  <p>This is the main content area that users can skip to.</p>
                </main>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Try tabbing from the beginning of this example - a "Skip to main content" link will appear.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Focus Management in Tabs</h3>
        <div className="border rounded-md p-4">
          <div className="space-y-4">
            <div role="tablist" className="flex border-b">
              {["Tab 1", "Tab 2", "Tab 3"].map((tab, index) => (
                <button
                  key={index}
                  role="tab"
                  aria-selected={activeTab === index}
                  aria-controls={`panel-${index}`}
                  id={`tab-${index}`}
                  tabIndex={activeTab === index ? 0 : -1}
                  className={`px-4 py-2 ${
                    activeTab === index ? "border-b-2 border-primary font-medium" : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab(index)}
                  onKeyDown={(e) => {
                    switch (e.key) {
                      case "ArrowRight":
                        e.preventDefault()
                        setActiveTab((activeTab + 1) % 3)
                        break
                      case "ArrowLeft":
                        e.preventDefault()
                        setActiveTab((activeTab - 1 + 3) % 3)
                        break
                      case "Home":
                        e.preventDefault()
                        setActiveTab(0)
                        break
                      case "End":
                        e.preventDefault()
                        setActiveTab(2)
                        break
                    }
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="pt-2">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  role="tabpanel"
                  id={`panel-${index}`}
                  aria-labelledby={`tab-${index}`}
                  hidden={activeTab !== index}
                  tabIndex={0}
                >
                  {activeTab === index && <p>Content for {`Tab ${index + 1}`}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          Focus management ensures that keyboard users can navigate efficiently and understand where they are in the
          interface. Proper focus management is especially important for dynamic content and interactive widgets.
        </p>
        <p className="mt-2">Key focus management techniques:</p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>Move focus to newly revealed content</li>
          <li>Trap focus in modal dialogs</li>
          <li>Provide skip links to bypass repetitive content</li>
          <li>Restore focus when content is dismissed</li>
          <li>Manage focus within composite widgets like tabs and menus</li>
          <li>Ensure a logical tab order that matches the visual layout</li>
        </ul>
      </div>
    </div>
  )
}

// 80. Accessible Forms Demo
function AccessibleFormsDemo() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    newsletter: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name) {
      newErrors.name = "Name is required"
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      alert("Form submitted successfully!")
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Accessible Form Example</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-md p-4">
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="text-red-500 text-xs">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-red-500 text-xs">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  aria-invalid={!!errors.password}
                  aria-describedby="password-requirements password-error"
                />
                <p id="password-requirements" className="text-xs text-muted-foreground">
                  Password must be at least 8 characters long.
                </p>
                {errors.password && (
                  <p id="password-error" className="text-red-500 text-xs">
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  aria-invalid={!!errors.confirmPassword}
                  aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
                />
                {errors.confirmPassword && (
                  <p id="confirm-password-error" className="text-red-500 text-xs">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="newsletter"
                  name="newsletter"
                  checked={formData.newsletter}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      newsletter: checked as boolean,
                    })
                  }
                />
                <Label htmlFor="newsletter" className="text-sm">
                  Subscribe to newsletter
                </Label>
              </div>

              <Button type="submit">Submit</Button>
            </form>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Accessibility Features</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="font-medium">Labels:</span> Every input has an associated label with a matching "for"
                attribute
              </li>
              <li>
                <span className="font-medium">Error messages:</span> Linked to inputs with aria-describedby
              </li>
              <li>
                <span className="font-medium">Invalid state:</span> Indicated with aria-invalid
              </li>
              <li>
                <span className="font-medium">Instructions:</span> Provided with aria-describedby
              </li>
              <li>
                <span className="font-medium">Keyboard navigation:</span> All form controls are keyboard accessible
              </li>
              <li>
                <span className="font-medium">Focus management:</span> Clear focus styles for all interactive elements
              </li>
            </ul>

            <h4 className="text-sm font-medium mt-6">Key ARIA Attributes</h4>
            <pre className="text-xs bg-muted p-2 rounded-md overflow-auto">
              {`<input
  id="email"
  name="email"
  type="email"
  aria-invalid={!!errors.email}
  aria-describedby="email-error"
/>
{errors.email && (
  <p id="email-error" role="alert">
    {errors.email}
  </p>
)}`}
            </pre>
          </div>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          Accessible forms ensure that all users, including those with disabilities, can successfully complete forms and
          understand any errors or requirements.
        </p>
        <p className="mt-2">Key principles for accessible forms:</p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>Associate labels with form controls</li>
          <li>Provide clear instructions and error messages</li>
          <li>Use appropriate input types (email, tel, etc.)</li>
          <li>Group related form controls with fieldset and legend</li>
          <li>Indicate required fields</li>
          <li>Ensure error messages are programmatically associated with inputs</li>
          <li>Maintain a logical tab order</li>
          <li>Provide feedback for successful form submission</li>
        </ul>
      </div>
    </div>
  )
}

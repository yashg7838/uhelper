import { useState, useEffect, useMemo, createContext, useContext } from 'react'
import './App.css'

// Theme Context
const ThemeContext = createContext()

const useTheme = () => useContext(ThemeContext)

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('uhelper-theme')
    if (stored) return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('uhelper-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Tool data with categories
const TOOLS = [
  // Document Conversion
  { id: 'doc-to-pdf', name: 'DOC to PDF', description: 'Convert Word documents to PDF', category: 'Document', icon: 'FileText', color: '#0b2455' },
  { id: 'pdf-to-word', name: 'PDF to Word', description: 'Convert PDF to Word documents', category: 'Document', icon: 'FileText', color: '#0b2455' },
  { id: 'ppt-to-pdf', name: 'PPT to PDF', description: 'Convert PowerPoint to PDF', category: 'Document', icon: 'Presentation', color: '#0b2455' },
  { id: 'excel-to-pdf', name: 'Excel to PDF', description: 'Convert Excel spreadsheets to PDF', category: 'Document', icon: 'Table', color: '#0b2455' },

  // Image Tools
  { id: 'image-converter', name: 'Image Converter', description: 'Convert between image formats', category: 'Image', icon: 'Image', color: '#f4a124' },
  { id: 'image-resizer', name: 'Image Resizer', description: 'Resize images to specific dimensions', category: 'Image', icon: 'Maximize2', color: '#f4a124' },
  { id: 'image-compressor', name: 'Image Compressor', description: 'Compress images to reduce file size', category: 'Image', icon: 'Minimize2', color: '#f4a124' },

  // Web Dev Tools
  { id: 'json-formatter', name: 'JSON Formatter', description: 'Format and validate JSON data', category: 'Developer', icon: 'Braces', color: '#2d5a7b' },
  { id: 'base64-encoder', name: 'Base64 Encoder', description: 'Encode text to Base64 format', category: 'Developer', icon: 'Code', color: '#2d5a7b' },
  { id: 'url-encoder', name: 'URL Encoder', description: 'Encode URLs for safe transmission', category: 'Developer', icon: 'Link', color: '#2d5a7b' },
  { id: 'html-formatter', name: 'HTML Formatter', description: 'Format and beautify HTML code', category: 'Developer', icon: 'FileCode', color: '#2d5a7b' },
  { id: 'css-formatter', name: 'CSS Formatter', description: 'Format and minify CSS code', category: 'Developer', icon: 'Palette', color: '#2d5a7b' },

  // Utility Tools
  { id: 'color-picker', name: 'Color Picker', description: 'Pick and convert colors', category: 'Utility', icon: 'Palette', color: '#7b4a2d' },
  { id: 'qr-generator', name: 'QR Generator', description: 'Generate QR codes', category: 'Utility', icon: 'QrCode', color: '#7b4a2d' },
  { id: 'password-generator', name: 'Password Generator', description: 'Generate secure passwords', category: 'Utility', icon: 'Key', color: '#7b4a2d' },
  { id: 'uuid-generator', name: 'UUID Generator', description: 'Generate unique identifiers', category: 'Utility', icon: 'Fingerprint', color: '#7b4a2d' },

  // Text Tools
  { id: 'word-counter', name: 'Word Counter', description: 'Count words, characters, lines', category: 'Text', icon: 'Type', color: '#2d7b4a' },
  { id: 'text-case-converter', name: 'Text Case Converter', description: 'Convert text case (UPPER, lower, Title)', category: 'Text', icon: 'AA', color: '#2d7b4a' },
  { id: 'regex-tester', name: 'Regex Tester', description: 'Test regular expressions', category: 'Text', icon: 'Regex', color: '#2d7b4a' },

  // File Tools
  { id: 'file-compressor', name: 'File Compressor', description: 'Compress files to ZIP', category: 'File', icon: 'Archive', color: '#7b2d5a' },
  { id: 'file-extractor', name: 'File Extractor', description: 'Extract compressed archives', category: 'File', icon: 'FolderOpen', color: '#7b2d5a' },
  { id: 'file-splitter', name: 'File Splitter', description: 'Split large files', category: 'File', icon: 'Scissors', color: '#7b2d5a' },

  // PDF Tools
  { id: 'pdf-merger', name: 'PDF Merger', description: 'Merge multiple PDFs together', category: 'PDF', icon: 'Merge', color: '#5a2d7b' },
  { id: 'pdf-splitter', name: 'PDF Splitter', description: 'Split PDF into separate files', category: 'PDF', icon: 'Split', color: '#5a2d7b' },
  { id: 'pdf-compressor', name: 'PDF Compressor', description: 'Reduce PDF file size', category: 'PDF', icon: 'Compress', color: '#5a2d7b' },
  { id: 'pdf-password', name: 'PDF Password', description: 'Add password protection to PDF', category: 'PDF', icon: 'Lock', color: '#5a2d7b' },
]

const CATEGORIES = ['All', 'Document', 'Image', 'Developer', 'Utility', 'Text', 'File', 'PDF']

const ICONS = {
  FileText: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
      <polyline points="14,2 14,8 20,8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <line x1="10" y1="9" x2="8" y2="9"/>
    </svg>
  ),
  Presentation: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h20"/>
      <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/>
      <path d="m7 21 5-5 5 5"/>
    </svg>
  ),
  Table: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18"/>
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <path d="M3 9h18"/>
      <path d="M3 15h18"/>
    </svg>
  ),
  Image: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <circle cx="9" cy="9" r="2"/>
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
    </svg>
  ),
  Maximize2: (
    <svg xmlns="http://www.w.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15,3 21,3 21,9"/>
      <polyline points="9,21 3,21 3,15"/>
      <line x1="21" y1="3" x2="14" y2="10"/>
      <line x1="3" y1="21" x2="10" y2="14"/>
    </svg>
  ),
  Minimize2: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4,14 10,14 10,20"/>
      <polyline points="20,10 14,10 14,4"/>
      <line x1="14" y1="10" x2="21" y2="3"/>
      <line x1="3" y1="21" x2="10" y2="14"/>
    </svg>
  ),
  Braces: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1"/>
      <path d="M16 21h1a2 2 0 0 0 2-2v-5a2 2 0 0 1 2-2 2 2 0 0 0-2-2v-5a2 2 0 0 0-2-2h-1"/>
    </svg>
  ),
  Code: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16,18 22,12 16,6"/>
      <polyline points="8,6 2,12 8,18"/>
    </svg>
  ),
  Link: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  ),
  FileCode: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
      <polyline points="14,2 14,8 20,8"/>
      <path d="m10 13-2 2 2 2"/>
      <path d="m14 17 2-2-2-2"/>
    </svg>
  ),
  Palette: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r="2.5"/>
      <circle cx="17.5" cy="10.5" r="2.5"/>
      <circle cx="8.5" cy="7.5" r="2.5"/>
      <circle cx="6.5" cy="12.5" r="2.5"/>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z"/>
    </svg>
  ),
  QrCode: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
    </svg>
  ),
  Key: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7.5" cy="15.5" r="5.5"/>
      <path d="m21 2-9.6 9.6"/>
      <path d="m15.5 7.5 3 3L22 7l-3-3"/>
    </svg>
  ),
  Fingerprint: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Type: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4,7 4,4 20,4 20,7"/>
      <line x1="9" y1="20" x2="15" y2="20"/>
      <line x1="12" y1="4" x2="12" y2="20"/>
    </svg>
  ),
  AA: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <text x="3" y="18" fontSize="14" fontWeight="bold" fill="currentColor" stroke="none">Aa</text>
    </svg>
  ),
  Regex: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3v10"/>
      <path d="M12.5 11c1.5 0 2.5 1 2.5 2.5s-1 2.5-2.5 2.5S10 15 10 13.5s1-2.5 2.5-2.5z"/>
      <path d="M7 15c-1.5 0-2.5 1-2.5 2.5s1 2.5 2.5 2.5S9.5 19 9.5 17.5 8.5 15 7 15z"/>
      <path d="M3 3l18 18"/>
    </svg>
  ),
  Archive: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="5" rx="2"/>
      <path d="M4 9v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9"/>
      <path d="M10 13h4"/>
    </svg>
  ),
  FolderOpen: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/>
    </svg>
  ),
  Scissors: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="3"/>
      <circle cx="6" cy="18" r="3"/>
      <line x1="20" y1="4" x2="8.12" y2="15.88"/>
      <line x1="14.47" y1="14.48" x2="20" y2="20"/>
      <line x1="8.12" y1="8.12" x2="12" y2="12"/>
    </svg>
  ),
  Merge: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8L22 12L18 16"/>
      <path d="M2 12H22"/>
      <path d="M6 8L2 12L6 16"/>
    </svg>
  ),
  Split: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 3h5v5"/>
      <path d="M8 3H3v5"/>
      <path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3"/>
      <path d="m15 9 6-6"/>
    </svg>
  ),
  Compress: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14V4h10"/>
      <path d="M14 14l6 6"/>
      <path d="M20 14H14V8"/>
      <path d="M14 14V4h6l-6 10z"/>
    </svg>
  ),
  Lock: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
}

// Icons for navigation
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
  </svg>
)

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
  </svg>
)

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.3-4.3"/>
  </svg>
)

const GridIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/>
    <rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/>
  </svg>
)

const ListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"/>
    <line x1="8" y1="12" x2="21" y2="12"/>
    <line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/>
    <line x1="3" y1="12" x2="3.01" y2="12"/>
    <line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
)

const Search = ({ value, onChange }) => (
  <div className="search-container">
    <div className="search-icon">
      <SearchIcon />
    </div>
    <input
      type="text"
      className="search-input"
      placeholder="Search tools... (Ctrl+K)"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <div className="search-kbd">
      <kbd>Ctrl</kbd><kbd>K</kbd>
    </div>
  </div>
)

const ThemeToggle = ({ theme, onToggle }) => (
  <button className="theme-toggle" onClick={onToggle} aria-label="Toggle theme">
    {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
  </button>
)

const CategoryFilter = ({ categories, active, onSelect }) => (
  <div className="category-filter">
    {categories.map(cat => (
      <button
        key={cat}
        className={`category-btn ${active === cat ? 'active' : ''}`}
        onClick={() => onSelect(cat)}
      >
        {cat}
      </button>
    ))}
  </div>
)

const ViewToggle = ({ view, onToggle }) => (
  <div className="view-toggle">
    <button
      className={`view-btn ${view === 'grid' ? 'active' : ''}`}
      onClick={() => onToggle('grid')}
      aria-label="Grid view"
    >
      <GridIcon />
    </button>
    <button
      className={`view-btn ${view === 'list' ? 'active' : ''}`}
      onClick={() => onToggle('list')}
      aria-label="List view"
    >
      <ListIcon />
    </button>
  </div>
)

const ToolCard = ({ tool, index }) => (
  <div
    className="tool-card"
    style={{ animationDelay: `${index * 30}ms` }}
    onClick={() => {}}
  >
    <div className="tool-icon" style={{ backgroundColor: tool.color + '15', color: tool.color }}>
      {ICONS[tool.icon]}
    </div>
    <div className="tool-info">
      <h3 className="tool-name">{tool.name}</h3>
      <p className="tool-description">{tool.description}</p>
    </div>
    <span className="tool-category">{tool.category}</span>
  </div>
)

const ToolListItem = ({ tool, index }) => (
  <div
    className="tool-list-item"
    style={{ animationDelay: `${index * 20}ms` }}
  >
    <div className="tool-icon-small" style={{ backgroundColor: tool.color + '15', color: tool.color }}>
      {ICONS[tool.icon]}
    </div>
    <div className="tool-list-info">
      <h3 className="tool-name">{tool.name}</h3>
      <p className="tool-description">{tool.description}</p>
    </div>
    <span className="tool-category-small">{tool.category}</span>
  </div>
)

function App() {
  const { theme, toggleTheme } = useTheme()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [viewMode, setViewMode] = useState('grid')
  const [recentTools] = useState(() => {
    const stored = localStorage.getItem('uhelper-recent')
    return stored ? JSON.parse(stored) : ['JSON Formatter', 'Base64 Encoder', 'Color Picker']
  })

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeydown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        document.querySelector('.search-input')?.focus()
      }
    }
    document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [])

  const filteredTools = useMemo(() => {
    let tools = TOOLS
    if (activeCategory !== 'All') {
      tools = tools.filter(t => t.category === activeCategory)
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      tools = tools.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      )
    }
    return tools
  }, [searchQuery, activeCategory])

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">uH</div>
            <span className="logo-text">Helper</span>
          </div>
          <nav className="nav">
            <a href="#" className="nav-link active">Tools</a>
            <a href="#" className="nav-link">Docs</a>
            <a href="#" className="nav-link">About</a>
          </nav>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </header>

      <main className="main">
        <section className="hero-section">
          <h1 className="hero-title">
            Company <span className="highlight">Utility Hub</span>
          </h1>
          <p className="hero-subtitle">
            All the tools you need, in one place. Fast, secure, and free to use.
          </p>
          <Search value={searchQuery} onChange={setSearchQuery} />

          {recentTools.length > 0 && (
            <div className="recent-tools">
              <span className="recent-label">Recent:</span>
              {recentTools.slice(0, 3).map((name, i) => (
                <button key={i} className="recent-btn">{name}</button>
              ))}
            </div>
          )}
        </section>

        <section className="tools-section">
          <div className="tools-header">
            <CategoryFilter
              categories={CATEGORIES}
              active={activeCategory}
              onSelect={setActiveCategory}
            />
            <ViewToggle view={viewMode} onToggle={setViewMode} />
          </div>

          <div className="results-info">
            Showing {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''}
          </div>

          {filteredTools.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <SearchIcon />
              </div>
              <h3>No tools found</h3>
              <p>Try adjusting your search or category filter</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="tools-grid">
              {filteredTools.map((tool, i) => (
                <ToolCard key={tool.id} tool={tool} index={i} />
              ))}
            </div>
          ) : (
            <div className="tools-list">
              {filteredTools.map((tool, i) => (
                <ToolListItem key={tool.id} tool={tool} index={i} />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>uHelper - Internal Company Tools</p>
          <div className="footer-links">
            <a href="#">Help</a>
            <a href="#">Feedback</a>
            <a href="#">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function AppWrapper() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  )
}

export default AppWrapper
# David Adeola Blog - Next.js Version

A modern, responsive blog built with Next.js, TypeScript, and styled-components. This is a Next.js port of the original Gatsby blog with the same design and functionality.

## 🚀 Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Styled Components** for CSS-in-JS
- **Dark/Light Theme** with system preference detection
- **Responsive Design** with mobile-first approach
- **Markdown Support** with gray-matter and remark
- **Infinite Scroll** for blog posts
- **Category Filtering** 
- **SEO Optimized** with meta tags
- **Performance Optimized** with Next.js optimizations

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Styled Components
- **Content**: Markdown with gray-matter
- **Date Handling**: date-fns
- **Utilities**: lodash

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd davidadeola-next
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
davidadeola-next/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # Reusable UI components
│   ├── layouts/             # Layout components
│   ├── posts/               # Markdown blog posts
│   ├── styles/              # Styled components and themes
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions
│   └── hooks/               # Custom React hooks
├── public/                  # Static assets
└── package.json
```

## 🎨 Theming

The blog supports both light and dark themes with automatic system preference detection. Theme switching is handled through CSS custom properties and localStorage persistence.

## 📝 Adding Blog Posts

1. Create a new markdown file in `src/posts/blog/`
2. Add frontmatter with the following fields:
   ```yaml
   ---
   title: "Your Post Title"
   category: "Category Name"
   date: "YYYY-MM-DD HH:MM:SS"
   desc: "Post description"
   thumbnail: "./path/to/thumbnail.jpg"
   alt: "Thumbnail alt text"
   ---
   ```
3. Write your content in markdown format

## 🚀 Deployment

The blog can be deployed to any platform that supports Next.js:

- **Vercel** (recommended)
- **Netlify**
- **AWS Amplify**
- **Self-hosted**

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

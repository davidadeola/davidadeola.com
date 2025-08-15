import Head from 'next/head'
import { siteMetadata } from 'Utils/siteMetadata'

interface SEOProps {
  title?: string
  desc?: string
  image?: string
}

const SEO: React.FC<SEOProps> = ({ title, desc = "", image }) => {
  const description = desc || siteMetadata.description
  const ogImageUrl = siteMetadata.siteUrl + (image || "/og-default.png")

  return (
    <Head>
      <title>{title ? `${title} | ${siteMetadata.title}` : siteMetadata.title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title || siteMetadata.title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={siteMetadata.author} />
      <meta name="twitter:title" content={title || siteMetadata.title} />
      <meta name="twitter:description" content={description} />
      <meta property="image" content={ogImageUrl} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="twitter:image" content={ogImageUrl} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default SEO

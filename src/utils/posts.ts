import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import type Post from 'Types/Post'

const postsDirectory = path.join(process.cwd(), 'src/posts/blog')

export function getSortedPostsData(): Post[] {
  // Get file names under /posts/blog
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      slug: `/${id}`,
      title: matterResult.data.title,
      desc: matterResult.data.desc,
      date: matterResult.data.date,
      category: matterResult.data.category,
      thumbnail: matterResult.data.thumbnail,
      alt: matterResult.data.alt,
      content: matterResult.content,
    } as Post
  })

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    }
  })
}

export async function getPostData(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id: slug,
    slug: `/${slug}`,
    title: matterResult.data.title,
    desc: matterResult.data.desc,
    date: matterResult.data.date,
    category: matterResult.data.category,
    thumbnail: matterResult.data.thumbnail,
    alt: matterResult.data.alt,
    content: contentHtml,
  } as Post
}

export function getPostsByCategory(category: string): Post[] {
  const allPosts = getSortedPostsData()
  return allPosts.filter(post => post.category === category)
}

export function getCategories() {
  const allPosts = getSortedPostsData()
  const categories = Array.from(new Set(allPosts.map(post => post.category)))
  return categories.map(category => ({
    name: category,
    count: allPosts.filter(post => post.category === category).length
  }))
}

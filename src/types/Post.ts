export default interface Post {
  id: string
  slug: string
  title: string
  desc: string
  date: string
  category: string
  thumbnail?: string
  alt?: string
  content?: string
}

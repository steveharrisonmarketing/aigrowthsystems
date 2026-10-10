// Which posts are visible. Live site: published and dated today or earlier.
// In review mode (site.showDraftNotes) posts marked "review" show too, labelled as not published.
import { getCollection, type CollectionEntry } from 'astro:content';
import { site } from '../config/site';

export type Post = CollectionEntry<'posts'>;

export async function visiblePosts(): Promise<Post[]> {
  const now = new Date();
  const posts = await getCollection('posts', ({ data }) => {
    if (data.status === 'published') return data.publishDate <= now;
    return site.showDraftNotes && data.status === 'review';
  });
  return posts.sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());
}

export const formatDate = (d: Date) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export const readingMinutes = (body = '') => Math.max(1, Math.round(body.split(/\s+/).length / 220));

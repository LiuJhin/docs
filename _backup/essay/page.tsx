import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/mdx-components";
import TableOfContents from "@/components/toc";
import ShareButtons from "@/components/share-buttons";

export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = allPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 md:py-24">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {post.title}
        </h1>
        <div className="mt-6 text-muted-foreground">
          <time>{new Date(post.date).toLocaleDateString("zh-CN")}</time>
          <span className="mx-3">·</span>
          <span>{post.readingTime?.text || "5 分钟"}</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-3">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <Mdx code={post.body.code} />
          </div>
          <div className="mt-12">
            <ShareButtons
              title={post.title}
              url={`https://yourdomain.com/essay/${post.slug}`}
            />
          </div>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents headings={post.headings} />
          </div>
        </aside>
      </div>
    </article>
  );
}

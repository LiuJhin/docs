// src/app/page.tsx
import Link from "next/link";
import { ArrowRight, Github, Rss } from "lucide-react";

export default function Home() {
  const recentPosts = [
    {
      title: "Why I Finally Left Notion Behind",
      date: "Dec 8, 2025",
      desc: "From a bloated second brain to a lightweight digital garden — my full journey.",
    },
    {
      title: "My 10-Year Developer Toolkit",
      date: "Nov 28, 2025",
      desc: "12 tools I actually use every day. Nothing more, nothing less.",
    },
    {
      title: "Writing Is the Ultimate Thinking Tool",
      date: "Nov 15, 2025",
      desc: "How writing in public reshaped the way I think, learn, and build.",
    },
  ];

  return (
    <>
      {/* Subtle grid + barely-there gradient */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-white dark:bg-black" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/20 dark:from-blue-950/10 dark:to-purple-950/10" />
        <div
          className="absolute inset-0 opacity-25 dark:opacity-10"
          style={{
            backgroundImage: `linear-gradient(#e4e4e7 1px, transparent 1px), linear-gradient(90deg, #e4e4e7 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="min-h-screen flex flex-col px-8 pt-32 pb-24 max-w-5xl mx-auto">
        {/* Navigation */}
        {/* Hero */}
        <main className="flex-1 flex flex-col justify-center max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-tight mb-8">
            {/* Thoughts in permanent ink. */}
            <br />
            Cheers and Enjoy
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12">
            A quiet corner of the internet where I write, reflect, and ship.
            <br />
            No algorithms. No ads. Just ideas that last.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <Link href="/docs">
              <button className="group inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-2xl text-lg font-medium hover:shadow-2xl hover:shadow-foreground/20 transition-all duration-300">
                Read latest writing
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            <Link
              href="/about"
              className="text-lg font-medium text-muted-foreground hover:text-foreground transition inline-flex items-center gap-2"
            >
              More about me
              <span className="text-3xl leading-none">→</span>
            </Link>
          </div>
        </main>

        {/* Recent posts */}
        <section className="mt-32">
          <h2 className="text-3xl font-bold text-foreground mb-10">
            Recent writing
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {recentPosts.map((post) => (
              <Link
                href={`/posts/${post.title.toLowerCase().replace(/\s+/g, "-")}`}
                key={post.title}
                className="group block"
              >
                <article className="h-full rounded-3xl border border-border/70 bg-background/50 p-8 backdrop-blur-sm hover:border-foreground/30 hover:bg-background/90 transition-all duration-300">
                  <time className="text-sm text-muted-foreground">
                    {post.date}
                  </time>
                  <h3 className="mt-3 text-xl font-semibold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                    {post.title}
                  </h3>
                  <p className="mt-4 text-muted-foreground line-clamp-2">
                    {post.desc}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-32 pt-16 border-t border-border text-center text-sm text-muted-foreground">
          <p>
            © 2025 MarkView · Built with Next.js ∙ Typescript ∙ Tailwind ∙ Love
          </p>
        </footer>
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPolicyBySlug } from "../../../api/WordpressAPI";
import type { WPCustomPost } from "../../../api/WordpressAPI";

export function PolicyDetails() {
  const { slug } = useParams<{ slug: string }>();

  const [policy, setPolicy] = useState<WPCustomPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchPolicy = async () => {
      setLoading(true);

      const data = await getPolicyBySlug(slug);
      setPolicy(data);

      setLoading(false);
    };

    fetchPolicy();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    );
  }

  if (!policy) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="text-xl font-semibold">Policy Not Found</h2>
      </div>
    );
  }

  const banner =
    policy._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "";

  return (
    <>
      {/* Banner */}
      <section
        className="relative flex h-[420px] items-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative mx-auto w-full max-w-7xl px-4">
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            {policy.title.rendered}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="bg-gray-100 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-2xl bg-white p-6 shadow-lg md:p-10 lg:p-12">
            <div
              className="
                prose
                prose-lg
                max-w-none
                prose-headings:font-bold
                prose-headings:text-gray-900
                prose-p:text-gray-700
                prose-li:text-gray-700
                prose-a:text-amber-600
                prose-a:no-underline
                hover:prose-a:underline
              "
              dangerouslySetInnerHTML={{
                __html: policy.content.rendered,
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
};
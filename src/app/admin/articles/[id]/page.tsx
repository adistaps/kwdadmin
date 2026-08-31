import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ArticleForm from "../../_components/ArticleForm";
import { updateArticle } from "../../actions/articles";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .single();

  if (!article) notFound();

  const updateWithId = updateArticle.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--ink)] mb-1">Edit Artikel</h1>
      <p className="text-sm text-[var(--muted)] mb-6">{article.title_id}</p>
      <ArticleForm article={article} action={updateWithId} isEdit />
    </div>
  );
}

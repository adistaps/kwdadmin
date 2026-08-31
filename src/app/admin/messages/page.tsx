import { createClient } from "@/lib/supabase/server";
import { deleteMessage } from "../actions/misc";
import DeleteButton from "../_components/DeleteButton";
import MessageStatusSelect from "../_components/MessageStatusSelect";

export default async function AdminMessagesPage() {
  const supabase = await createClient();
  const { data: messages } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--ink)] mb-1">Pesan Masuk</h1>
      <p className="text-sm text-[var(--muted)] mb-6">
        Pesan dari form Contact Us di website.
      </p>

      <div className="flex flex-col gap-3">
        {messages?.map((m) => (
          <div key={m.id} className="bg-white rounded-xl border border-[var(--line)] p-5">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="font-semibold text-[var(--ink)]">{m.name}</p>
                <p className="text-xs text-[var(--muted)]">
                  {m.email} {m.phone ? `· ${m.phone}` : ""}
                </p>
                <p className="text-xs text-[var(--muted)] mt-0.5">
                  {new Date(m.created_at).toLocaleString("id-ID")}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <MessageStatusSelect id={m.id} status={m.status} />
                <DeleteButton id={m.id} action={deleteMessage} label="pesan ini" />
              </div>
            </div>
            {m.subject && (
              <p className="text-sm font-medium text-[var(--ink)] mt-3">{m.subject}</p>
            )}
            <p className="text-sm text-[var(--muted)] mt-1 whitespace-pre-wrap">{m.message}</p>
          </div>
        ))}
        {(!messages || messages.length === 0) && (
          <div className="bg-white rounded-xl border border-[var(--line)] p-8 text-center text-[var(--muted)]">
            Belum ada pesan masuk.
          </div>
        )}
      </div>
    </div>
  );
}

import { createClient } from "@/lib/supabase/server";
import { updateSettings } from "../actions/misc";

export default async function AdminSettingsPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .single();

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--ink)] mb-1">Contact Us</h1>
      <p className="text-sm text-[var(--muted)] mb-6">
        Informasi ini tampil di halaman Contact Us dan Footer website.
      </p>

      <form action={updateSettings} className="max-w-xl flex flex-col gap-5">
        <div>
          <label className="block text-sm font-medium text-[var(--ink)] mb-1">Alamat</label>
          <textarea
            name="address"
            rows={3}
            defaultValue={settings?.address}
            className="w-full rounded-lg border border-[var(--line)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--ink)] mb-1">Telepon</label>
          <input
            name="phone"
            defaultValue={settings?.phone}
            className="w-full rounded-lg border border-[var(--line)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--ink)] mb-1">Nomor WhatsApp</label>
          <input
            name="whatsapp_number"
            placeholder="6281234567890"
            defaultValue={settings?.whatsapp_number}
            className="w-full rounded-lg border border-[var(--line)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--ink)] mb-1">Email</label>
          <input
            name="email"
            type="email"
            defaultValue={settings?.email}
            className="w-full rounded-lg border border-[var(--line)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--ink)] mb-1">Jam Operasional</label>
          <input
            name="operational_hours"
            placeholder="Senin–Jumat, 08.00–17.00"
            defaultValue={settings?.operational_hours}
            className="w-full rounded-lg border border-[var(--line)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--ink)] mb-1">
            Google Maps Embed URL
          </label>
          <input
            name="map_embed_url"
            placeholder="https://www.google.com/maps/embed?..."
            defaultValue={settings?.map_embed_url}
            className="w-full rounded-lg border border-[var(--line)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
          />
          <p className="text-xs text-[var(--muted)] mt-1">
            Dari Google Maps: Share → Embed a map → salin URL di dalam atribut src.
          </p>
        </div>

        <button
          type="submit"
          className="w-fit bg-[var(--blue)] text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[var(--blue-deep)] transition-colors"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}

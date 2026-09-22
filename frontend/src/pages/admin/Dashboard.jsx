import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Leaf, LogOut, Plus, Pencil, Trash2, Newspaper, Images, Upload } from "lucide-react";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { api, imgUrl, formatApiErrorDetail } from "@/lib/api";

const emptyNews = { title: "", category: "Kegiatan", excerpt: "", content: "", image: "", published: true };
const GALLERY_CATS = ["Armada", "Fasilitas", "Operasional", "CSR & Safety"];

function ImagePicker({ value, onChange, testid }) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const { data } = await api.post("/admin/upload", fd);
      onChange(data.path);
      toast.success("Foto berhasil diunggah");
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder="URL gambar atau unggah file" data-testid={`${testid}-url-input`} />
        <label className="shrink-0 cursor-pointer inline-flex items-center gap-2 bg-brand-950 hover:bg-brand-900 text-white text-sm font-semibold px-4 rounded-md transition-colors" data-testid={`${testid}-upload-button`}>
          <Upload className="w-4 h-4" /> {uploading ? "…" : "Unggah"}
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} data-testid={`${testid}-file-input`} />
        </label>
      </div>
      {value && <img src={imgUrl(value)} alt="Pratinjau" className="h-24 rounded-lg object-cover border border-slate-200" />}
    </div>
  );
}

function NewsPanel() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null); // null = list, "new" or id
  const [form, setForm] = useState(emptyNews);

  const load = () => api.get("/admin/news").then(({ data }) => setItems(data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const startEdit = (item) => {
    setEditing(item.id);
    setForm({ title: item.title, category: item.category, excerpt: item.excerpt, content: item.content, image: item.image, published: item.published });
  };

  const save = async (e) => {
    e.preventDefault();
    try {
      if (editing === "new") {
        await api.post("/admin/news", form);
        toast.success("Berita ditambahkan");
      } else {
        await api.put(`/admin/news/${editing}`, form);
        toast.success("Berita diperbarui");
      }
      setEditing(null);
      setForm(emptyNews);
      load();
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail));
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Hapus berita ini?")) return;
    try {
      await api.delete(`/admin/news/${id}`);
      toast.success("Berita dihapus");
      load();
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail));
    }
  };

  if (editing !== null) {
    return (
      <form onSubmit={save} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8" data-testid="news-form">
        <h2 className="font-display text-lg font-bold text-white mb-6">{editing === "new" ? "Tambah Berita" : "Edit Berita"}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-slate-300">Judul *</Label>
            <Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="bg-slate-950 border-slate-700 text-white" data-testid="news-title-input" />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-300">Kategori</Label>
            <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="bg-slate-950 border-slate-700 text-white" data-testid="news-category-input" />
          </div>
        </div>
        <div className="space-y-2 mt-4">
          <Label className="text-slate-300">Ringkasan</Label>
          <Textarea rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="bg-slate-950 border-slate-700 text-white" data-testid="news-excerpt-input" />
        </div>
        <div className="space-y-2 mt-4">
          <Label className="text-slate-300">Isi Berita (pisahkan paragraf dengan baris kosong)</Label>
          <Textarea rows={8} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="bg-slate-950 border-slate-700 text-white" data-testid="news-content-input" />
        </div>
        <div className="space-y-2 mt-4">
          <Label className="text-slate-300">Gambar Utama</Label>
          <ImagePicker value={form.image} onChange={(v) => setForm({ ...form, image: v })} testid="news-image" />
        </div>
        <label className="mt-4 flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
          <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} data-testid="news-published-checkbox" />
          Tampilkan di website (published)
        </label>
        <div className="mt-6 flex gap-3">
          <Button type="submit" className="bg-brand-600 hover:bg-brand-500 text-white" data-testid="news-save-button">Simpan</Button>
          <Button type="button" variant="outline" onClick={() => { setEditing(null); setForm(emptyNews); }} className="border-slate-700 text-slate-300 hover:bg-slate-800" data-testid="news-cancel-button">Batal</Button>
        </div>
      </form>
    );
  }

  return (
    <div data-testid="news-list-panel">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-slate-400">{items.length} berita</p>
        <Button onClick={() => { setEditing("new"); setForm(emptyNews); }} className="bg-brand-600 hover:bg-brand-500 text-white" data-testid="news-add-button">
          <Plus className="w-4 h-4 mr-2" /> Tambah Berita
        </Button>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-xl p-4" data-testid={`news-row-${item.id}`}>
            {item.image && <img src={imgUrl(item.image)} alt="" className="w-16 h-16 rounded-lg object-cover shrink-0 hidden sm:block" />}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white text-sm truncate">{item.title}</p>
              <p className="text-xs text-slate-500 font-mono mt-1">
                {item.category} · {new Date(item.created_at).toLocaleDateString("id-ID")} · {item.published ? "Published" : "Draft"}
              </p>
            </div>
            <button onClick={() => startEdit(item)} className="p-2 text-slate-400 hover:text-white" aria-label="Edit" data-testid={`news-edit-${item.id}`}><Pencil className="w-4 h-4" /></button>
            <button onClick={() => remove(item.id)} className="p-2 text-slate-400 hover:text-red-400" aria-label="Hapus" data-testid={`news-delete-${item.id}`}><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-slate-500">Belum ada berita.</p>}
      </div>
    </div>
  );
}

function GalleryPanel() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: "", category: "Operasional", image: "" });

  const load = () => api.get("/gallery").then(({ data }) => setItems(data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const add = async (e) => {
    e.preventDefault();
    if (!form.image) {
      toast.error("Unggah atau isi URL foto dulu");
      return;
    }
    try {
      await api.post("/admin/gallery", form);
      toast.success("Foto ditambahkan ke galeri");
      setForm({ title: "", category: "Operasional", image: "" });
      load();
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail));
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Hapus foto ini?")) return;
    try {
      await api.delete(`/admin/gallery/${id}`);
      toast.success("Foto dihapus");
      load();
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail));
    }
  };

  return (
    <div data-testid="gallery-panel">
      <form onSubmit={add} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8" data-testid="gallery-form">
        <h2 className="font-display text-lg font-bold text-white mb-5">Tambah Foto</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-slate-300">Judul Foto *</Label>
            <Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="bg-slate-950 border-slate-700 text-white" data-testid="gallery-title-input" />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-300">Kategori</Label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full h-10 rounded-md bg-slate-950 border border-slate-700 text-white text-sm px-3"
              data-testid="gallery-category-select"
            >
              {GALLERY_CATS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div className="space-y-2 mt-4">
          <Label className="text-slate-300">Foto *</Label>
          <ImagePicker value={form.image} onChange={(v) => setForm({ ...form, image: v })} testid="gallery-image" />
        </div>
        <Button type="submit" className="mt-5 bg-brand-600 hover:bg-brand-500 text-white" data-testid="gallery-add-button">
          <Plus className="w-4 h-4 mr-2" /> Tambah ke Galeri
        </Button>
      </form>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" data-testid="admin-gallery-grid">
        {items.map((item) => (
          <div key={item.id} className="group relative rounded-xl overflow-hidden aspect-square bg-slate-900" data-testid={`admin-gallery-item-${item.id}`}>
            <img src={imgUrl(item.image)} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
              <p className="text-white text-xs font-semibold truncate">{item.title}</p>
              <p className="text-slate-400 text-[10px] font-mono">{item.category}</p>
              <button onClick={() => remove(item.id)} className="absolute top-2 right-2 p-2 bg-red-500/90 rounded-lg text-white" aria-label="Hapus foto" data-testid={`gallery-delete-${item.id}`}>
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("berita");

  useEffect(() => {
    if (user === false) navigate("/admin/login", { replace: true });
  }, [user, navigate]);

  if (!user) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-500 text-sm" data-testid="admin-loading">Memuat…</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950" data-testid="admin-dashboard">
      <SEO title="Dashboard Admin" path="/admin" />
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo PT Kaltara Jaya Makmur" className="w-9 h-9 object-contain" />
            <div className="leading-tight">
              <p className="font-display font-bold text-white text-sm">Dashboard Admin</p>
              <p className="text-[10px] font-mono text-slate-500">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" target="_blank" className="text-xs text-slate-400 hover:text-white transition-colors" data-testid="admin-view-site">Lihat Website ↗</Link>
            <Button
              variant="outline"
              size="sm"
              onClick={async () => { await logout(); navigate("/admin/login"); }}
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
              data-testid="admin-logout-button"
            >
              <LogOut className="w-4 h-4 mr-2" /> Keluar
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 py-8">
        <div className="flex gap-2 mb-8" data-testid="admin-tabs">
          <button
            onClick={() => setTab("berita")}
            data-testid="admin-tab-berita"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${tab === "berita" ? "bg-brand-600 text-white" : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"}`}
          >
            <Newspaper className="w-4 h-4" /> Berita
          </button>
          <button
            onClick={() => setTab("galeri")}
            data-testid="admin-tab-galeri"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${tab === "galeri" ? "bg-brand-600 text-white" : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"}`}
          >
            <Images className="w-4 h-4" /> Galeri
          </button>
        </div>

        {tab === "berita" ? <NewsPanel /> : <GalleryPanel />}
      </main>
    </div>
  );
}

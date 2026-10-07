import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  FileText,
  LoaderCircle,
  LogIn,
  LogOut,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import logoAura from '../assets/logo_aura_mini.jpg';
import {
  BLOG_ADMIN_TOKEN_KEY,
  BlogApiError,
  blogService,
  type BlogAdminUser,
} from '../services/blogService';
import type { BlogCategory, BlogPost, BlogPostPayload } from '../types';

const categories: BlogCategory[] = ['Laboral', 'Finanzas', 'Tributario', 'Contabilidad'];

function emptyPost(): BlogPostPayload {
  return {
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image_url: null,
    category: 'Laboral',
    published: false,
    published_at: new Date().toISOString().slice(0, 10),
  };
}

function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function displayDate(value: string | null): string {
  if (!value) return 'Borrador';

  return new Intl.DateTimeFormat('es-PE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(value));
}

export function BlogAdminPage() {
  const [token, setToken] = useState(() => sessionStorage.getItem(BLOG_ADMIN_TOKEN_KEY));
  const [admin, setAdmin] = useState<BlogAdminUser | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [status, setStatus] = useState<'checking' | 'signedOut' | 'signedIn'>(() =>
    sessionStorage.getItem(BLOG_ADMIN_TOKEN_KEY) ? 'checking' : 'signedOut',
  );
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [postForm, setPostForm] = useState<BlogPostPayload>(emptyPost);
  const [slugIsManual, setSlugIsManual] = useState(false);

  useEffect(() => {
    if (!token) {
      return;
    }

    let isMounted = true;
    blogService.getAdminUser(token)
      .then((user) => {
        if (!isMounted) return;
        setAdmin(user);
        setStatus('signedIn');
        setIsLoadingPosts(true);
        return blogService.getAdminPosts(token);
      })
      .then((data) => {
        if (isMounted && data) setPosts(data);
      })
      .catch((requestError: unknown) => {
        if (!isMounted) return;

        if (requestError instanceof BlogApiError && [401, 403].includes(requestError.status)) {
          sessionStorage.removeItem(BLOG_ADMIN_TOKEN_KEY);
          setToken(null);
          setStatus('signedOut');
        } else {
          setStatus('signedOut');
        }

        setError(requestError instanceof Error
          ? requestError.message
          : 'No se pudo verificar la sesión.');
      })
      .finally(() => {
        if (isMounted) setIsLoadingPosts(false);
      });

    return () => {
      isMounted = false;
    };
  }, [token]);

  const visiblePosts = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase('es');

    return posts.filter((post) => {
      const matchesCategory = activeCategory === 'Todas' || post.category === activeCategory;
      const matchesSearch = !normalizedSearch ||
        `${post.title} ${post.excerpt} ${post.content}`.toLocaleLowerCase('es').includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, posts, search]);

  const openNewPostForm = () => {
    setEditingPost(null);
    setPostForm(emptyPost());
    setSlugIsManual(false);
    setError('');
    setSuccess('');
    setIsEditorOpen(true);
  };

  const openEditPostForm = (post: BlogPost) => {
    setEditingPost(post);
    setSlugIsManual(true);
    setPostForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      image_url: post.image_url,
      category: post.category,
      published: post.published,
      published_at: post.published_at?.slice(0, 10) ?? new Date().toISOString().slice(0, 10),
    });
    setError('');
    setSuccess('');
    setIsEditorOpen(true);
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const result = await blogService.login(password);
      sessionStorage.setItem(BLOG_ADMIN_TOKEN_KEY, result.token);
      setToken(result.token);
      setAdmin(result.user);
      setStatus('signedIn');
      setPassword('');
      setIsLoadingPosts(true);
      setPosts(await blogService.getAdminPosts(result.token));
    } catch (requestError) {
      setError(requestError instanceof Error
        ? requestError.message
        : 'No se pudo iniciar sesión.');
    } finally {
      setIsSubmitting(false);
      setIsLoadingPosts(false);
    }
  };

  const handleLogout = async () => {
    if (!token) return;

    setError('');
    try {
      await blogService.logout(token);
    } catch (requestError) {
      setError(requestError instanceof Error
        ? `La sesión local se cerró, pero no se pudo confirmar en el servidor: ${requestError.message}`
        : 'No se pudo confirmar el cierre de sesión en el servidor.');
    } finally {
      sessionStorage.removeItem(BLOG_ADMIN_TOKEN_KEY);
      setToken(null);
      setAdmin(null);
      setPosts([]);
      setStatus('signedOut');
    }
  };

  const handleSavePost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token) return;

    setIsSaving(true);
    setError('');
    setSuccess('');

    const payload = {
      ...postForm,
      image_url: postForm.image_url?.trim() || null,
      published_at: postForm.published ? postForm.published_at : null,
    };

    try {
      if (editingPost) {
        const updatedPost = await blogService.updatePost(token, editingPost.id, payload);
        setPosts((current) => current.map((post) => post.id === updatedPost.id ? updatedPost : post));
        setSuccess('La noticia se actualizó correctamente.');
      } else {
        const createdPost = await blogService.createPost(token, payload);
        setPosts((current) => [createdPost, ...current]);
        setSuccess('La noticia se creó correctamente.');
      }

      setIsEditorOpen(false);
      setEditingPost(null);
    } catch (requestError) {
      setError(requestError instanceof Error
        ? requestError.message
        : 'No se pudo guardar la noticia.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePost = async (post: BlogPost) => {
    if (!token || !window.confirm(`¿Eliminar la noticia "${post.title}"? Esta acción no se puede deshacer.`)) {
      return;
    }

    setError('');
    setSuccess('');
    try {
      await blogService.deletePost(token, post.id);
      setPosts((current) => current.filter((item) => item.id !== post.id));
      setSuccess('La noticia se eliminó correctamente.');
    } catch (requestError) {
      setError(requestError instanceof Error
        ? requestError.message
        : 'No se pudo eliminar la noticia.');
    }
  };

  if (status === 'checking') {
    return (
      <main className="flex grow items-center justify-center bg-[#FAFBFD] px-4 py-24">
        <p className="inline-flex items-center gap-2 text-slate-600" role="status">
          <LoaderCircle size={20} className="animate-spin" aria-hidden="true" />
          Verificando sesión...
        </p>
      </main>
    );
  }

  if (status === 'signedOut') {
    return (
      <main className="flex grow items-center justify-center bg-gradient-to-br from-[#0B192C] to-slate-800 px-4 py-16">
        <section className="w-full max-w-md rounded-2xl border-t-4 border-[#DC2626] bg-white p-7 shadow-2xl sm:p-9">
          <img
            src={logoAura}
            alt="Aura Corporativa"
            className="h-14 w-14 rounded object-contain"
          />
          <h1 className="mt-6 text-center text-2xl font-black text-[#0B192C]">
            Panel de Noticias Blog
          </h1>
          <p className="mt-2 text-center text-sm leading-6 text-slate-500">
            Ingresa tu clave de acceso para administrar el blog.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleLogin}>
            <label className="block text-sm font-bold text-slate-800">
              Contraseña de Administrador
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 font-normal outline-none transition focus:border-[#0B192C] focus:ring-2 focus:ring-slate-200"
                placeholder="Introduce la clave de acceso"
              />
            </label>
            {error && (
              <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#0B192C] px-4 py-3 font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? <LoaderCircle size={18} className="animate-spin" aria-hidden="true" />
                : <LogIn size={18} aria-hidden="true" />}
              Iniciar sesión
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="grow bg-slate-100">
      <section className="bg-[#0B192C] px-4 py-5 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={logoAura} alt="Aura Corporativa" className="h-11 w-11 rounded border border-white/30 object-contain" />
            <div>
              <h1 className="text-xl font-black">Gestor de Noticias</h1>
              <p className="mt-1 text-xs font-semibold text-emerald-300">
                <span aria-hidden="true">●</span> En vivo · {admin?.name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-[#0B192C] transition hover:bg-slate-100"
            >
              <ExternalLink size={16} aria-hidden="true" /> Ver blog
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
            >
              <LogOut size={16} aria-hidden="true" /> Cerrar sesión
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row">
          <label className="flex min-w-0 flex-1 items-center gap-3 rounded-lg border border-slate-200 px-3.5 py-2.5 text-slate-400 focus-within:border-[#0B192C]">
            <Search size={18} aria-hidden="true" />
            <span className="sr-only">Buscar noticias</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar noticias por título o contenido..."
              className="w-full bg-transparent text-sm text-slate-800 outline-none"
            />
          </label>
          <label className="sr-only" htmlFor="admin-category">Filtrar por categoría</label>
          <select
            id="admin-category"
            value={activeCategory}
            onChange={(event) => setActiveCategory(event.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none focus:border-[#0B192C]"
          >
            <option value="Todas">Todas las categorías</option>
            {categories.map((category) => <option key={category}>{category}</option>)}
          </select>
          <button
            type="button"
            onClick={openNewPostForm}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0B192C] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            <Plus size={18} aria-hidden="true" /> Nueva noticia
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-2 text-sm font-semibold text-slate-600">
          <span className="rounded-full bg-white px-4 py-2 shadow-sm">{posts.length} noticias en total</span>
          <span className="rounded-full bg-white px-4 py-2 shadow-sm">Mostrando {visiblePosts.length} resultados</span>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-emerald-700">
            <CheckCircle2 size={16} aria-hidden="true" /> Sincronizado
          </span>
        </div>

        {(error || success) && (
          <p
            className={`mt-4 rounded-lg border p-3 text-sm ${
              error
                ? 'border-red-200 bg-red-50 text-red-700'
                : 'border-emerald-200 bg-emerald-50 text-emerald-700'
            }`}
            role={error ? 'alert' : 'status'}
          >
            {error || success}
          </p>
        )}

        {isEditorOpen && (
          <form
            onSubmit={handleSavePost}
            className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
          >
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="text-xl font-black text-[#0B192C]">
                {editingPost ? 'Editar noticia' : 'Crear noticia'}
              </h2>
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                aria-label="Cerrar formulario"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-slate-700 sm:col-span-2">
                Título
                <input
                  required
                  maxLength={180}
                  value={postForm.title}
                  onChange={(event) => {
                    const title = event.target.value;
                    setPostForm((current) => ({
                      ...current,
                      title,
                      slug: slugIsManual ? current.slug : slugify(title),
                    }));
                  }}
                  className="mt-1.5 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-slate-800 outline-none focus:border-[#0B192C]"
                />
              </label>
              <label className="text-sm font-semibold text-slate-700">
                Slug de la noticia
                <input
                  required
                  maxLength={200}
                  value={postForm.slug}
                  onChange={(event) => {
                    setSlugIsManual(true);
                    setPostForm((current) => ({ ...current, slug: slugify(event.target.value) }));
                  }}
                  className="mt-1.5 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-slate-800 outline-none focus:border-[#0B192C]"
                />
              </label>
              <label className="text-sm font-semibold text-slate-700">
                Categoría
                <select
                  value={postForm.category}
                  onChange={(event) => setPostForm((current) => ({
                    ...current,
                    category: event.target.value as BlogCategory,
                  }))}
                  className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-slate-800 outline-none focus:border-[#0B192C]"
                >
                  {categories.map((category) => <option key={category}>{category}</option>)}
                </select>
              </label>
              <label className="text-sm font-semibold text-slate-700 sm:col-span-2">
                URL de imagen de portada (opcional)
                <input
                  type="url"
                  value={postForm.image_url ?? ''}
                  onChange={(event) => setPostForm((current) => ({
                    ...current,
                    image_url: event.target.value || null,
                  }))}
                  placeholder="https://..."
                  className="mt-1.5 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-slate-800 outline-none focus:border-[#0B192C]"
                />
              </label>
              <label className="text-sm font-semibold text-slate-700 sm:col-span-2">
                Resumen
                <textarea
                  required
                  maxLength={300}
                  rows={2}
                  value={postForm.excerpt}
                  onChange={(event) => setPostForm((current) => ({ ...current, excerpt: event.target.value }))}
                  className="mt-1.5 w-full resize-y rounded-lg border border-slate-200 px-3.5 py-2.5 text-slate-800 outline-none focus:border-[#0B192C]"
                />
              </label>
              <label className="text-sm font-semibold text-slate-700 sm:col-span-2">
                Contenido de la noticia
                <textarea
                  required
                  maxLength={50000}
                  rows={8}
                  value={postForm.content}
                  onChange={(event) => setPostForm((current) => ({ ...current, content: event.target.value }))}
                  className="mt-1.5 w-full resize-y rounded-lg border border-slate-200 px-3.5 py-2.5 text-slate-800 outline-none focus:border-[#0B192C]"
                />
              </label>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={postForm.published}
                  onChange={(event) => setPostForm((current) => ({
                    ...current,
                    published: event.target.checked,
                  }))}
                  className="h-4 w-4 accent-[#DC2626]"
                />
                Publicar en el blog
              </label>
              <label className="text-sm font-semibold text-slate-700">
                Fecha de publicación
                <input
                  type="date"
                  disabled={!postForm.published}
                  value={postForm.published_at ?? ''}
                  onChange={(event) => setPostForm((current) => ({
                    ...current,
                    published_at: event.target.value || null,
                  }))}
                  className="mt-1.5 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-slate-800 outline-none focus:border-[#0B192C] disabled:bg-slate-100"
                />
              </label>
            </div>

            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-2 rounded-lg bg-[#0B192C] px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving && <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />}
                {editingPost ? 'Guardar cambios' : 'Crear noticia'}
              </button>
            </div>
          </form>
        )}

        {isLoadingPosts ? (
          <p className="flex items-center justify-center gap-2 py-20 text-slate-600" role="status">
            <LoaderCircle size={20} className="animate-spin" aria-hidden="true" /> Cargando noticias...
          </p>
        ) : visiblePosts.length > 0 ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visiblePosts.map((post) => (
              <article key={post.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="relative h-44 bg-gradient-to-br from-[#0B192C] to-slate-600">
                  {post.image_url ? (
                    <img src={post.image_url} alt="" className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-white">
                      <FileText size={36} aria-hidden="true" />
                    </div>
                  )}
                  <span className="absolute right-3 top-3 rounded bg-[#0B192C] px-3 py-1.5 text-xs font-bold uppercase text-white">
                    {post.category}
                  </span>
                </div>
                <div className="p-5">
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                    <CalendarDays size={14} aria-hidden="true" /> {displayDate(post.published_at)}
                    <span className={`ml-auto rounded-full px-2 py-1 ${post.published ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                      {post.published ? 'Publicada' : 'Borrador'}
                    </span>
                  </p>
                  <h2 className="mt-3 line-clamp-2 min-h-12 font-black leading-snug text-[#0B192C]">{post.title}</h2>
                  <p className="mt-2 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-slate-600">{post.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                    {post.published ? (
                      <Link to={`/blog/${post.slug}`} className="text-sm font-bold text-[#DC2626] hover:underline">
                        Ver noticia
                      </Link>
                    ) : (
                      <span className="text-sm text-slate-400">Aún no publicada</span>
                    )}
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => openEditPostForm(post)}
                        aria-label={`Editar ${post.title}`}
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-[#0B192C]"
                      >
                        <Pencil size={17} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => void handleDeletePost(post)}
                        aria-label={`Eliminar ${post.title}`}
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-[#DC2626]"
                      >
                        <Trash2 size={17} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-slate-200 bg-white px-6 py-16 text-center text-slate-600">
            {posts.length === 0 ? 'Aún no hay noticias. Crea la primera para comenzar.' : 'No hay resultados para esos filtros.'}
          </div>
        )}
      </section>
    </main>
  );
}

import matter from 'gray-matter'; // Либа для подгрузки markdown
import { z } from 'zod';          // Либа для валидации

/** Схема доставаемых из md данных */
export const ProjectMetaSchema = z.object({
  title: z.string().min(2, "Слишком короткое название"),
  description: z.string(),
  date: z.string().date(),
  role: z.string(),
  stack: z.array(z.string()),
  github: z.string().url().optional(),
  demo: z.string().url().optional(),
  image: z.string(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
});

export type ProjectMeta = z.infer<typeof ProjectMetaSchema>;

export interface ProjectData extends ProjectMeta {
  slug: string;
  content: string;
}

export class ProjectLoader {
  private static instance: ProjectLoader | null = null;
  private cache = new Map<string, ProjectData>();
  private listCache: ProjectData[] | null = null;
  private loadPromise: Promise<void> | null = null;

  private constructor() {}

  static getInstance(): ProjectLoader {
    if (!this.instance) {
      this.instance = new ProjectLoader();
    }
    return this.instance;
  }

  /**
   * Ленивая загрузка и парсинг всех .md файлов.
   * Защита от race-conditions: повторные вызовы ждут первый результат.
   */
  private async loadAll(): Promise<void> {
    if (this.loadPromise) return this.loadPromise;
    if (this.listCache) return Promise.resolve();

    this.loadPromise = (async () => {
      // Vite bundler подтянет файлы на этапе сборки
      const modules = import.meta.glob('../../content/*.md', { as: 'raw' });
      const entries = Object.entries(modules);

      for (const [path, loadFn] of entries) {
        try {
          const raw = await loadFn();
          const slugMatch = path.match(/\/([^/]+)\.md$/);
          const slug = slugMatch?.[1] || 'unknown';

          const { data, content } = matter(raw);
          const meta = ProjectMetaSchema.parse(data);

          this.cache.set(slug, { ...meta, slug, content });
        } catch (err) {
          console.warn(`Ошибка парсинга ${path}:`, err instanceof Error ? err.message : err);
        }
      }

      // Сортировка по дате (новые сверху)
      this.listCache = Array.from(this.cache.values())
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    })();

    await this.loadPromise;
    this.loadPromise = null;
  }

  async getProjects(): Promise<ProjectData[]> {
    await this.loadAll();
    return this.listCache || [];
  }

  async getProjectBySlug(slug: string): Promise<ProjectData | null> {
    await this.loadAll();
    return this.cache.get(slug) || null;
  }

  /** Для очистки кэша в dev-режиме (HMR) */
  resetCache() {
    this.cache.clear();
    this.listCache = null;
    this.loadPromise = null;
  }
}

// Экспорт готового экземпляра
export const projectLoader = ProjectLoader.getInstance();

// Авто-сброс кэша при HMR (Vite)
if (import.meta.hot) {
  import.meta.hot.accept(() => projectLoader.resetCache());
}
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { Camera, Plus, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  memories as baseMemories,
  sortMemories,
  formatDate,
  type Memory,
} from "@/data/memories";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import {
  insertMemory,
  fetchMemories,
  deleteMemory,
  type MemoryRow,
} from "@/lib/supabase";

function toMemory(row: MemoryRow): Memory {
  return {
    id: row.id,
    title: row.title,
    date: row.date,
    description: row.description,
    ...(row.image_url ? { image: row.image_url } : {}),
  };
}

function Photo({ src, alt }: { src?: string | undefined; alt: string }) {
  const [broken, setBroken] = useState(false);
  if (!src || broken)
    return (
      <div className="photo-slot">
        <Camera />
        <span>tu foto aquí</span>
      </div>
    );
  return <img src={src} alt={alt} loading="lazy" onError={() => setBroken(true)} />;
}

function MemoryCard({
  memory,
  side,
  onDelete,
}: {
  memory: Memory;
  side: "left" | "right";
  onDelete?: (() => void) | undefined;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const hasImage = "image" in memory && memory.image !== undefined;
  return (
    <div ref={ref} className={`memory-row ${side} ${visible ? "is-visible" : ""}`}>
      <span className="memory-dot" aria-hidden="true">
        ♥
      </span>
      <article
        className={`memory-card ${hasImage ? "polaroid" : "text-card"}`}
        style={{
          transform: `perspective(700px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) rotate(${side === "left" ? -1.5 : 1.5}deg)`,
        }}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setTilt({
            x: ((e.clientX - r.left) / r.width - 0.5) * 10,
            y: -((e.clientY - r.top) / r.height - 0.5) * 10,
          });
        }}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      >
        <span className="pin" aria-hidden="true" />
        {hasImage && <Photo src={memory.image} alt={memory.title} />}
        <h3>{memory.title}</h3>
        <time>{formatDate(memory.date)}</time>
        {memory.description && <p>“{memory.description}”</p>}
        {onDelete && (
          <Button
            variant="ghost"
            className="memory-delete"
            aria-label="Borrar recuerdo"
            onClick={onDelete}
          >
            <Trash2 />
          </Button>
        )}
      </article>
    </div>
  );
}

function AddMemory({
  memories,
  onSave,
  onClose,
}: {
  memories: Memory[];
  onSave: (memories: Memory[]) => void;
  onClose: () => void;
}) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>();

  useEffect(() => {
    if (!file) {
      setPreview(undefined);
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  }, [file]);

  const createMemoryMutation = useMutation({
    mutationFn: async (): Promise<Memory> => {
      const image = file ? await uploadImageToCloudinary(file) : undefined;
      const row = await insertMemory({
        title: title.trim(),
        date,
        description: description.trim(),
        image_url: image ?? null,
      });
      return toMemory(row);
    },
    onSuccess: (memory) => {
      onSave([...memories, memory]);
    },
  });

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createMemoryMutation.mutate();
  };

  return (
    <form className="memory-form letter" onSubmit={submit}>
      <div className="memory-form-head">
        <h2>Un nuevo recuerdo</h2>
        <Button
          type="button"
          variant="ghost"
          aria-label="Cerrar"
          disabled={createMemoryMutation.isPending}
          onClick={onClose}
        >
          <X />
        </Button>
      </div>
      <label htmlFor="memory-title">
        Título
        <input
          id="memory-title"
          value={title}
          required
          maxLength={80}
          disabled={createMemoryMutation.isPending}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label htmlFor="memory-date">
        Fecha
        <input
          id="memory-date"
          type="date"
          value={date}
          required
          disabled={createMemoryMutation.isPending}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <label htmlFor="memory-description">
        Descripción
        <textarea
          id="memory-description"
          value={description}
          required
          maxLength={300}
          rows={3}
          disabled={createMemoryMutation.isPending}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label htmlFor="memory-image">
        Foto (opcional)
        <input
          id="memory-image"
          type="file"
          accept="image/*"
          disabled={createMemoryMutation.isPending}
          onChange={(e) => setFile(e.currentTarget.files?.[0] ?? null)}
        />
      </label>
      {preview && (
        <img className="memory-preview" src={preview} alt="Vista previa de la foto seleccionada" />
      )}
      {createMemoryMutation.isError && (
        <p className="memory-form-error" role="alert">
          {createMemoryMutation.error.message}
        </p>
      )}
      <Button
        type="submit"
        variant="bloom"
        className="memory-save"
        disabled={createMemoryMutation.isPending}
      >
        {createMemoryMutation.isPending ? "Subiendo y guardando..." : "Guardar recuerdo ♡"}
      </Button>
    </form>
  );
}

export function Timeline() {
  const [local, setLocal] = useState<Memory[]>([]);
  const [adding, setAdding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [supabaseError, setSupabaseError] = useState<string>();
  const lineRef = useRef<HTMLDivElement>(null);

  const deleteMemoryMutation = useMutation({
    mutationFn: async (id: string): Promise<string> => {
      await deleteMemory(id);
      return id;
    },
    onSuccess: (id) => {
      setLocal((prev) => prev.filter((m) => m.id !== id));
      setSupabaseError(undefined);
    },
    onError: (error) => {
      setSupabaseError(
        error instanceof Error ? error.message : "No se pudo eliminar el recuerdo.",
      );
    },
  });

  useEffect(() => {
    let cancelled = false;
    fetchMemories()
      .then((rows) => {
        if (!cancelled) setLocal(rows.map(toMemory));
      })
      .catch((error) => {
        if (!cancelled) {
          setSupabaseError(
            error instanceof Error ? error.message : "No se pudieron cargar los recuerdos.",
          );
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = lineRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = (window.innerHeight * 0.6 - r.top) / r.height;
      setProgress(Math.max(0, Math.min(1, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const localIds = new Set(local.map((m) => m.id));
  const all = sortMemories([...baseMemories, ...local]);
  const years = [...new Set(all.map((m) => m.date.slice(0, 4)))];
  let index = 0;

  return (
    <section className="story" aria-labelledby="story-title">
      <div className="eyebrow">el siguiente capítulo</div>
      <h2 id="story-title" className="story-title">
        Nuestra Historia
      </h2>
      <p className="script story-sub">cada recuerdo, una página de nosotros</p>
      <div className="timeline" ref={lineRef}>
        <div className="timeline-line" aria-hidden="true">
          <div className="timeline-fill" style={{ transform: `scaleY(${progress})` }} />
        </div>
        {years.map((year) => (
          <div className="year-group" key={year}>
            <div className="year-marker">
              <span>{year}</span>
            </div>
            {all
              .filter((m) => m.date.startsWith(year))
              .map((m) => (
                <MemoryCard
                  key={m.id}
                  memory={m}
                  side={index++ % 2 === 0 ? "left" : "right"}
                  onDelete={
                    localIds.has(m.id)
                      ? () => deleteMemoryMutation.mutate(m.id)
                      : undefined
                  }
                />
              ))}
          </div>
        ))}
        <div className="timeline-end" aria-hidden="true">
          ♡
        </div>
      </div>
      <p className="story-continues script">y lo mejor está por venir...</p>
      {supabaseError && (
        <p className="memory-form-error" role="alert">
          {supabaseError}
        </p>
      )}
      <div className="add-memory">
        {adding ? (
          <AddMemory
            memories={local}
            onClose={() => setAdding(false)}
            onSave={(nextMemories) => {
              setLocal(nextMemories);
              setSupabaseError(undefined);
              setAdding(false);
            }}
          />
        ) : (
          <Button variant="ghost" className="note-button" onClick={() => setAdding(true)}>
            <Plus /> Añadir un recuerdo
          </Button>
        )}
      </div>
    </section>
  );
}

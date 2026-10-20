import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Fila de un recuerdo tal como se guarda en Supabase.
 */
export type MemoryRow = {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  description: string;
  image_url?: string | null;
  created_at: string;
};

/**
 * Datos necesarios para insertar un nuevo recuerdo.
 */
export type MemoryInsert = {
  title: string;
  date: string;
  description: string;
  image_url?: string | null;
};

let client: SupabaseClient | null = null;

/**
 * Devuelve (y crea si es necesario) el cliente de Supabase.
 * Lee las variables de entorno en tiempo de llamada para no fallar al importar
 * el módulo si aún no se han configurado.
 */
function getClient(): SupabaseClient {
  if (client) return client;
  const url = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error(
      "Faltan las variables de entorno de Supabase. Agrega VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY a tu archivo .env (copia de .env.example).",
    );
  }
  client = createClient(url, anonKey);
  return client;
}

/**
 * Inserta un recuerdo en la tabla `memories` de Supabase.
 * Recibe la descripción y la URL de la foto (obtenida previamente de Cloudinary).
 */
export async function insertMemory(memory: MemoryInsert): Promise<MemoryRow> {
  const { data, error } = await getClient()
    .from("memories")
    .insert(memory)
    .select()
    .single();

  if (error) {
    throw new Error(
      error.message ?? "No se pudo insertar el recuerdo en Supabase.",
    );
  }
  if (!data) {
    throw new Error("Supabase no devolvió el recuerdo insertado.");
  }
  return data as MemoryRow;
}

/**
 * Carga los recuerdos guardados en Supabase, ordenados por fecha.
 */
export async function fetchMemories(): Promise<MemoryRow[]> {
  const { data, error } = await getClient()
    .from("memories")
    .select("*")
    .order("date", { ascending: true });

  if (error) {
    throw new Error(
      error.message ?? "No se pudieron cargar los recuerdos de Supabase.",
    );
  }
  return (data ?? []) as MemoryRow[];
}

/**
 * Elimina un recuerdo de Supabase por su id.
 */
export async function deleteMemory(id: string): Promise<void> {
  const { error } = await getClient().from("memories").delete().eq("id", id);
  if (error) {
    throw new Error(error.message ?? "No se pudo eliminar el recuerdo de Supabase.");
  }
}

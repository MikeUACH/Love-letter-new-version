-- Ejecuta este SQL en el Editor SQL de tu proyecto de Supabase.
-- Crea la tabla `memories` y habilita Row Level Security (RLS) para que
-- cualquiera pueda leer y escribir (adecuado para esta carta sin autenticación).

create table if not exists memories (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date date not null,
  description text not null default '',
  image_url text,
  created_at timestamptz not null default now()
);

-- Índice para ordenar eficientemente por fecha
create index if not exists memories_date_idx on memories (date asc);

-- Habilitar RLS
alter table memories enable row level security;

-- Política de lectura pública
create policy "memories_select_public"
  on memories for select
  using (true);

-- Política de inserción pública
create policy "memories_insert_public"
  on memories for insert
  with check (true);

-- Política de actualización pública
create policy "memories_update_public"
  on memories for update
  using (true)
  with check (true);

-- Política de eliminación pública
create policy "memories_delete_public"
  on memories for delete
  using (true);

-- Comentarios de columnas
comment on table memories is 'Recuerdos de la historia de amor (carta para Kenthia).';
comment on column memories.title is 'Título del recuerdo.';
comment on column memories.date is 'Fecha del recuerdo (YYYY-MM-DD).';
comment on column memories.description is 'Descripción del recuerdo.';
comment on column memories.image_url is 'URL de la foto (subida a Cloudinary).';

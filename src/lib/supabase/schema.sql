-- Enable extensions (if not already enabled)
create extension if not exists "uuid-ossp";

-------------------------------------------------------
-- POSTS
-- Just an ID + timestamp to reference in likes/comments
-------------------------------------------------------
create table if not exists posts (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default now()
);

-------------------------------------------------------
-- COMMENTS
-- Each comment tied to a post, with a user_id + text
-------------------------------------------------------
create table if not exists comments (
  id uuid primary key default uuid_generate_v4(),
  post_id uuid not null references posts(id) on delete cascade,
  user_id text not null, -- anonymous UUID from frontend
  content text not null,
  created_at timestamp with time zone default now()
);

-- RLS
alter table comments enable row level security;

-- Policies
create policy if not exists "Enable insert for all" on comments
for insert
to public
with check (true);

create policy if not exists "Enable select for all" on comments
for select
to public
using (true);

create policy if not exists "Enable delete own comment" on comments
for delete
to public
using (true);

-------------------------------------------------------
-- LIKES
-- One like per user per post
-------------------------------------------------------
create table if not exists likes (
  id uuid primary key default uuid_generate_v4(),
  post_id uuid not null references posts(id) on delete cascade,
  user_id text not null,
  created_at timestamp with time zone default now(),
  unique (post_id, user_id)
);

-- RLS
alter table likes enable row level security;

-- Policies
create policy if not exists "Enable insert for all" on likes
for insert
to public
with check (true);

create policy if not exists "Enable select for all" on likes
for select
to public
using (true);

create policy if not exists "Enable delete own like" on likes
for delete
to public
using (true);

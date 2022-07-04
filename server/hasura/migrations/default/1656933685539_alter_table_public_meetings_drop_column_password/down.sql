alter table "public"."meetings" alter column "password" drop not null;
alter table "public"."meetings" add column "password" text;

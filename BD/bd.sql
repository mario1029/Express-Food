CREATE TABLE "usuario" (
  "correo" varchar PRIMARY KEY,
  "nombre" varchar,
  "numero" varchar,
  "direccion" varchar,
  "contrasenia" varchar,
  "admin" boolean
);

CREATE TABLE "conductor" (
  "id_conductor" integer PRIMARY KEY,
  "urlFoto" varchar,
  "nombre" varchar,
  "numero" varchar,
  "direccion" varchar,
  "placavehiculo" varchar,
  "colorvehiculo" varchar,
  "empresa" varchar,
  "disponible" boolean
);

CREATE TABLE "establecimiento" (
  "id_establecimiento" SERIAL PRIMARY KEY,
  "nombre" varchar,
  "direccion" varchar,
  "correoe" varchar,
  "numerocontacto" varchar,
  "urlpagina" varchar,
  "urlfoto" varchar,
  "correo" varchar
);

CREATE TABLE "producto" (
  "id_producto" SERIAL PRIMARY KEY,
  "nombre" varchar,
  "descripcion" varchar,
  "precio" numeric,
  "disponible" boolean,
  "urlfoto" varchar,
  "id_establecimiento" integer
);

CREATE TABLE "pedido" (
  "id_pedido" SERIAL PRIMARY KEY,
  "correo" varchar,
  "id_conductor" integer,
  "fecha" date
);

CREATE TABLE "detalles_pedido" (
  "id_pedido" integer,
  "id_producto" integer,
  "cantidad" integer,
  PRIMARY KEY ("id_pedido", "id_producto")
);

ALTER TABLE "establecimiento" ADD FOREIGN KEY ("correo") REFERENCES "usuario" ("correo") on delete cascade on update cascade;

ALTER TABLE "pedido" ADD FOREIGN KEY ("correo") REFERENCES "usuario" ("correo") on delete cascade on update cascade;

ALTER TABLE "pedido" ADD FOREIGN KEY ("id_conductor") REFERENCES "conductor" ("id_conductor") on delete set null on update cascade;

ALTER TABLE "detalles_pedido" ADD FOREIGN KEY ("id_pedido") REFERENCES "pedido" ("id_pedido") on delete cascade on update cascade;

ALTER TABLE "detalles_pedido" ADD FOREIGN KEY ("id_producto") REFERENCES "producto" ("id_producto");
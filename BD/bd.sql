CREATE TABLE "usuario" (
  "correo" varchar PRIMARY KEY,
  "nombre" varchar,
  "numero" varchar,
  "contrasenia" varchar,
  "direccion" varchar,
  "admin" boolean
);

CREATE TABLE "conductor" (
  "id_conductor" integer PRIMARY KEY,
  "urlFoto" varchar,
  "nombre" varchar,
  "numero" varchar,
  "direccion" varchar,
  "placaVehiculo" varchar,
  "colorVehiculo" varchar,
  "empresa" varchar,
  "disponible" boolean
);

CREATE TABLE "establecimiento" (
  "id_establecimiento" SERIAL PRIMARY KEY,
  "nombre" varchar,
  "direccion" varchar,
  "correoE" varchar,
  "numeroContacto" varchar,
  "urlPagina" varchar,
  "correo" varchar
);

CREATE TABLE "producto" (
  "id_producto" SERIAL PRIMARY KEY,
  "nombre" varchar,
  "descripcion" varchar
);

CREATE TABLE "producto_establecimiento" (
  "id_producto" integer,
  "id_establecimiento" integer,
  "precio" numeric,
  "disponible" boolean,
  PRIMARY KEY ("id_producto", "id_establecimiento")
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

ALTER TABLE "establecimiento" ADD FOREIGN KEY ("correo") REFERENCES "usuario" ("correo");


ALTER TABLE "establecimiento" ADD FOREIGN KEY ("correo") REFERENCES "usuario" ("correo") on delete cascade on update cascade;

ALTER TABLE "producto_establecimiento" ADD FOREIGN KEY ("id_producto") REFERENCES "producto" ("id_producto") on delete cascade on update cascade;

ALTER TABLE "producto_establecimiento" ADD FOREIGN KEY ("id_establecimiento") REFERENCES "establecimiento" ("id_establecimiento") on delete cascade on update cascade;

ALTER TABLE "pedido" ADD FOREIGN KEY ("correo") REFERENCES "usuario" ("correo") on delete cascade on update cascade;

ALTER TABLE "pedido" ADD FOREIGN KEY ("id_conductor") REFERENCES "conductor" ("id_conductor") on delete set null on update cascade;

ALTER TABLE "detalles_pedido" ADD FOREIGN KEY ("id_pedido") REFERENCES "pedido" ("id_pedido") on delete cascade on update cascade;

ALTER TABLE "detalles_pedido" ADD FOREIGN KEY ("id_producto") REFERENCES "producto" ("id_producto");


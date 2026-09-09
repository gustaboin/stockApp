import Fastify from "fastify";
import productsRoutes from "./routes/products.routes";

export const app = Fastify({
  logger: true,
});

app.register(productsRoutes, {
  prefix: "/api/products",
});
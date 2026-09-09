import { FastifyInstance } from "fastify";
import { getProductByBarcode } from "../services/openFoodFacts.service";

export default async function productsRoutes(
  app: FastifyInstance,
) {
  app.get<{
    Params: {
      barcode: string;
    };
  }>("/barcode/:barcode", async (request, reply) => {
    const { barcode } = request.params;

    const product = await getProductByBarcode(barcode);

    if (!product) {
      return reply.code(404).send({
        error: "Product not found",
      });
    }

    return product;
  });
}
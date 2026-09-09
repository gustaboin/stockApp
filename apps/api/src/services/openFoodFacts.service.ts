const OPEN_FOOD_FACTS_URL =
  "https://world.openfoodfacts.org/api/v2/product";

export type OpenFoodFactsProduct = {
  code: string;
  product_name?: string;
  brands?: string;
  quantity?: string;
  categories?: string;
  image_url?: string;
};

type OpenFoodFactsResponse = {
  code: string;
  status: number;
  status_verbose?: string;
  product?: OpenFoodFactsProduct;
};

export async function getProductByBarcode(
  barcode: string,
): Promise<OpenFoodFactsProduct | null> {
  const fields = [
    "code",
    "product_name",
    "brands",
    "quantity",
    "categories",
    "image_url",
  ].join(",");

  const url = `${OPEN_FOOD_FACTS_URL}/${barcode}?fields=${fields}`;

  const response = await fetch(url, {
    headers: {
      "User-Agent": "StockApp/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Open Food Facts returned ${response.status}`,
    );
  }

  const data =
    (await response.json()) as OpenFoodFactsResponse;

  if (data.status !== 1 || !data.product) {
    return null;
  }

  return data.product;
}

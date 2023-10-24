export type Product = {
  categories: string[];
  item: {
    id: string;
    title: string;
    price: {
      currency: string;
      amount: number;
      decimals: number;
    };
    picture_url: string;
    condition: string;
    free_shipping: boolean;
    sold_qty: number;
    description: string;
  }
}

export type Products = {
  query: string;
  categories:
  Array<string>;
  items: Array<{
    id: string;
    title: string;
    price: {
      currency: string;
      amount: number;
      decimals: number;
    };
    picture_url: string;
    condition: string;
    free_shipping: boolean;
    city_name: string;
  }>;
}

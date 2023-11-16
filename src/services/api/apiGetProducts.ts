import { API_BASE_URL, API_PRODUCTS_ENDPOINT } from '../../constants';
import { ProductModelRoot } from '../../models/ProductModel';

export const getProducts = async (): Promise<ProductModelRoot> => {
  //For migratable code to axios
  const response = await fetch(API_BASE_URL + API_PRODUCTS_ENDPOINT);

  const result = (await response.json()) as Promise<ProductModelRoot>;

  return result;
};

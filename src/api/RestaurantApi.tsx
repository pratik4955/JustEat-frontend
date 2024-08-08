import { SearchState } from "@/pages/SearchPage";
import { Restaurant, RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

// Ensure that the environment variable is correctly loaded
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
if (!API_BASE_URL) {
  console.error('API_BASE_URL is not defined in the environment variables');
}

export const useGetRestaurant = (restaurantId?: string) => {
  const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
    if (!restaurantId) {
      throw new Error("Restaurant ID is required");
    }

    const response = await fetch(`${API_BASE_URL}/api/restaurant/${restaurantId}`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to get restaurant: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    ["fetchRestaurant", restaurantId],
    getRestaurantByIdRequest,
    { enabled: !!restaurantId }
  );

  return { restaurant, isLoading };
};

export const useSearchRestaurants = (searchState: SearchState, city?: string) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sortOption);

    const url = `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`;
    console.log('Fetching URL:', url);

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to get restaurant: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return response.json();
  };

  const { data: results, isLoading } = useQuery(
    ["searchRestaurants", searchState, city],
    createSearchRequest,
    { enabled: !!city }
  );

  return { results, isLoading };
};

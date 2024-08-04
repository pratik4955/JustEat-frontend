export type User = {
    _id: string;
    email: string;
    name: string;
    addressLine1: string;
    city: string;
    country: string;
  };

  export type Restaurant = {
    _id: string;
    user: string;
    restaurantName: string;
    city: string;
    country: string;
    deliveryPrice: number;
    estimatedDeliveryTime: number;
    cuisines: string[];
    menuItems: MenuItem[];
    imageUrl: string;
    lastUpdated: string;
  };

  export type MenuItem = {
    _id: string;
    name: string;
    price: number;
  };

  export type Order = {
    _id: string;
    restaurant: Restaurant;
    user: User;
    cartItems: {
      menuItemId: string;
      name: string;
      quantity: string;
    }[];
    deliveryDetails: {
      name: string;
      addressLine1: string;
      city: string;
      email: string;
    };
    totalAmount: number;
    createdAt: string;
    restaurantId: string;
  };
  


export type loginDto = { email: string; password: string };
export type signupDto = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
};
export type eventCategory = 0 | 1 | 2 | 3 | 4 | 5 | 6; // Define a union type for the valid category values
export type eventCategoryName =
  | "music"
  | "sports"
  | "academic"
  | "volunteer"
  | "social"
  | "cultural"
  | "other"; // Define a union type for the valid category values
export type addressType = {
  roomNumber: string | null;
  street: string | null;
  City: string | null;
  State: string | null;
  Country: string | null;
  Pin: string | null;
};

export type loginDto = { email: string; password: string };
export type signupDto = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
};
export type eventCategory = 0 | 1 | 2 | 3 | 4 | 5 | 6; // Define a union type for the valid category values

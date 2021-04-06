// Auth Service

export interface BodyPOSTSignup {
  email: string;
  password: string;
  id: string;
}

export interface ResultPOSTSignup {
  email: string;
  id: string;
}

export interface PostSignin {
  email: string;
  password: string;
}

// User Service

export interface FetchUserData {
  id: string;
  name: string;
  interests: {
    Technology: string[];
    Business: string[];
    Design: string[];
  };
  faculty: string;
}

export interface CreateUserData {
  name: string;
  interests: {
    Technology: string[];
    Business: string[];
    Design: string[];
  };
  faculty: string;
}

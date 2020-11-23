import {UserInfo} from "angular-oauth2-oidc/types";

export interface Account extends UserInfo{
  id?: number;
  name?: string;
  email?: string;
  imageUrl?: string;
  emailVerified?: boolean;
  provider?: string;
  providerId?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

export interface JwtToken {
  accessToken: string;
  tokenType: "Bearer";
}
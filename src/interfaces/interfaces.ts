export interface UserInfo {
  accountId: string;
  balance?: number;
  balanceInUsd?: number;
  balanceSymbol?: string;
  currencyCode?: string;
  currencyName?: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface UserAccount {
  accountId: string;
  accountStatus: string;
  accountType: string;
  address?: string;
  businessName?: string;
  businessSize?: string;
  businessUseCase?: string;
  createdAt: string; // Or Date if you plan to work with date objects
  email: string;
  firstName: string;
  howDidYouFindUs: string;
  jobTitle: string;
  lastLogin?: string | null;
  lastName: string;
  membershipType?: string; // "BUSINESS" | "INDIVIDUAL";
  monthlyVolume?: string;
  onboardType?: string; // enum -  "INDIVIDUAL" | "BUSINESS";
  phoneCountryCode?: string;
  phoneNumber: string;
  tradingName?: string;
  website?: string;
}

export interface Currency {
  code: string;
  name: string;
}

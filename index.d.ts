interface Country {
  name: string;
  flag: string;
  isoName: string;
  currencyCode: string;
}

interface Currency {
  name: string;
  code: string;
  rate: number;
}

interface DecodedToken {
  iss: string;
  sub: string;
  aud: string[];
  iat: number;
  exp: number;
  scope: string;
  azp: string;
  permissions: string[];
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

interface Sort {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
}

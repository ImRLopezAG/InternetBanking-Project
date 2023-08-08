interface CONSTANTS {
  BASEURL: string
  ROUTES: {
    [key: string]: string
  }
}

export const CONSTANTS: CONSTANTS = {
  BASEURL: 'https://dev-internet-banking-api.vercel.app/api',
  ROUTES: {
    AUTH: '/auth',
    USER: '/user',
    PRODUCT: '/product',
    PAYMENT: '/payment',
  }
}

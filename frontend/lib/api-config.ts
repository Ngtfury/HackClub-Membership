export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  endpoints: {
    submit: '/api/submit',
    // Add more endpoints here as needed
    // users: '/api/users',
    // auth: '/api/auth',
  },
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  }
}

// You can also add different configurations for different environments
export const getApiConfig = (environment: 'development' | 'production' | 'staging' = 'development') => {
  const configs = {
    development: {
      ...apiConfig,
      baseUrl: 'http://localhost:3000',
    },
    staging: {
      ...apiConfig,
      baseUrl: 'https://staging-api.techconnect.com',
    },
    production: {
      ...apiConfig,
      baseUrl: 'https://api.techconnect.com',
    }
  }
  
  return configs[environment]
}

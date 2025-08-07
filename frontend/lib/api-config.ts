export const apiConfig = {
  baseUrl: 'https://hackclub-membership-api.onrender.com',
  endpoints: {
    submit: '/submit',
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
      baseUrl: 'https://hackclub-membership-api.onrender.com',
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

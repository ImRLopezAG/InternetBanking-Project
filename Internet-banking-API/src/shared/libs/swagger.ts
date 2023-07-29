import swaggerJSDoc, { OAS3Definition, OAS3Options } from 'swagger-jsdoc'
import { PORT } from '../../utils/constants'

const swaggerDefinition: OAS3Definition = {
  openapi: '3.0.0',
  info: {
    title: 'Internet - Banking  API',
    version: '1.0',
    description:
      'This is the API documentation for the Internet Banking API, you can find more about this project in the following links:',
    contact: {
      name: 'Angel Lopez',
      url: 'https://imrlopez.dev'
    }
  },
  servers: [
    {
      description: 'Development server',
      url: `http://localhost:${PORT}`
    },
    {
      description: 'Production vercel server',
      url: 'https://internet-banking-api.vercel.app/'
    },
    {
      description: 'Development vercel server',
      url: 'https://dev-internet-banking-api.vercel.app/'
    }
  ],
  components: {
    securitySchemes: {
      Bearer: {
        type: 'http',
        scheme: 'Bearer',
        in: 'header',
        description: 'JWT Authorization header using the Bearer scheme.',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      Authentication: {
        type: 'object',
        properties: {
          message: {
            type: 'string'
          },
          token: {
            type: 'string'
          }
        },
        example: {
          message: 'Login successful',
          token: 'your token'
        }
      },
      UserLogin: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
          username: {
            type: 'string',
            description: 'User username'
          },
          password: {
            type: 'string',
            description: 'User password'
          }
        },
        example: {
          username: 'johnDoe',
          password: 'password'
        }
      },
      SaveUser: {
        type: 'object',
        properties: {
          firstName: {
            type: 'string'
          },
          lastName: {
            type: 'string'
          },
          username: {
            type: 'string'
          },
          email: {
            type: 'string'
          },
          password: {
            type: 'string'
          },
          balance: {
            type: 'number'
          },
          role: {
            type: 'number',
            enum: ['admin', 'client'],
            default: 'client',
            description: '1 for admin, 2 for client'
          }
        },
        example: {
          firstName: 'John',
          lastName: 'Doe',
          username: 'John',
          email: 'john@example.com',
          password: '123456abc',
          balance: 500,
          role: 2
        }
      },
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'string'
          },
          username: {
            type: 'string'
          },
          email: {
            type: 'string'
          },
          firstName: {
            type: 'string'
          },
          lastName: {
            type: 'string'
          },
          password: {
            type: 'string'
          },
          role: {
            type: 'string',
            enum: ['user', 'admin']
          }
        }
      },
      SaveProduct: {
        type: 'object',
        required: ['user'],
        properties: {
          user: {
            type: 'string'
          },
          type: {
            type: 'number',
            enum: ['debit', 'credit', 'saving', 'loan'],
            default: 'savings',
            description: '1 for debit, 2 for credit, 3 for savings, 4 for loan'
          },
          balance: {
            type: 'number'
          },
          limit: {
            type: 'number',
            description: 'Only for credit cards'
          }
        },
        example: {
          user: 'your user id',
          type: 3,
          balance: 500
        }
      },
      Product: {
        type: 'object',
        properties: {
          id: {
            type: 'string'
          },
          pin: {
            type: 'string'
          },
          cvv: {
            type: 'string'
          },
          expirationDate: {
            type: 'string'
          },
          cardNumber: {
            type: 'string'
          },
          cardHolder: {
            type: 'string'
          },
          user: {
            type: 'string'
          },
          balance: {
            type: 'number'
          },
          active: {
            type: 'boolean'
          },
          type: {
            type: 'string',
            enum: ['savings', 'credit', 'loan']
          }
        }
      },
      SaveBeneficiary: {
        type: 'object',
        required: ['sender', 'receptor'],
        properties: {
          sender: {
            type: 'string'
          },
          receptor: {
            type: 'string'
          }
        },
        example: {
          sender: 'your user id',
          receptor: 'beneficiary user id'
        }
      },
      Beneficiary: {
        type: 'object',
        properties: {
          id: {
            type: 'string'
          },
          sender: {
            type: 'string'
          },
          receptor: {
            type: 'string'
          }
        }
      },
      SavePayment: {
        type: 'object',
        required: ['sender', 'receptor', 'amount'],
        properties: {
          sender: {
            type: 'string'
          },
          receptor: {
            type: 'string'
          },
          amount: {
            type: 'number'
          }
        }
      },
      Payment: {
        type: 'object',
        properties: {
          id: {
            type: 'string'
          },
          sender: {
            type: 'string'
          },
          receptor: {
            type: 'string'
          },
          amount: {
            type: 'number'
          }
        }
      }
    }
  },
  tags: [
    {
      name: 'Authentication',
      description: 'Authentication management'
    },
    {
      name: 'User',
      description: 'User management'
    },
    {
      name: 'Product',
      description: 'Product management'
    },
    {
      name: 'Beneficiary',
      description: 'Beneficiary management'
    },
    {
      name: 'Payment',
      description: 'Payment management'
    }
  ],
  paths: {
    '/api/auth/login': {
      post: {
        tags: ['Authentication'],
        summary: 'Login',
        description: 'Login',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserLogin'
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Login successful',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Authentication'
                }
              }
            }
          },
          400: {
            description: 'Bad request'
          },
          500: {
            description: 'Internal server error'
          }
        }
      }
    },
    '/api/auth/sign-up': {
      post: {
        tags: ['Authentication'],
        summary: 'Create a user',
        description: 'Create a user',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SaveUser'
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Create a user'
          },
          400: {
            description: 'Bad request'
          },
          401: {
            description: 'Unauthorized'
          },
          500: {
            description: 'Internal server error'
          }
        }
      }
    },
    '/api/auth/update/{id}': {
      put: {
        tags: ['Authentication'],
        summary: 'Update a user',
        description:
          'You need to login to update a user and you can only update your own user',
        security: [
          {
            Bearer: []
          }
        ],
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'string'
            },
            required: true,
            description: 'User id'
          }
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SaveUser'
              }
            }
          }
        },
        responses: {
          200: {
            description: 'User updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User'
                }
              }
            }
          },
          400: {
            description: 'Invalid request body or parameter'
          },
          401: {
            description: 'Unauthorized'
          },
          404: {
            description: 'User not found'
          },
          500: {
            description: 'Internal server error'
          }
        }
      }
    },
    '/api/user/list': {
      get: {
        tags: ['User'],
        summary: 'Get all users',
        description: 'Get all users',
        security: [
          {
            Bearer: []
          }
        ],
        responses: {
          200: {
            description: 'Get all users',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/User'
                  }
                }
              }
            }
          },
          401: {
            description: 'Unauthorized'
          },
          404: {
            description: 'Not found'
          }
        }
      }
    },
    '/api/user/get/{id}': {
      get: {
        tags: ['User'],
        summary: 'Get a user',
        description: 'Get a user',
        security: [
          {
            Bearer: []
          }
        ],
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'string'
            },
            required: true,
            description: 'User id'
          }
        ],
        responses: {
          200: {
            description: 'Get a user',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User'
                }
              }
            }
          },
          401: {
            description: 'Unauthorized'
          },
          404: {
            description: 'Not found'
          },
          500: {
            description: 'Internal server error'
          }
        }
      }
    },
    '/api/user/get/{email}': {
      get: {
        tags: ['User'],
        summary: 'Get user by email',
        description: 'Get a user by their email address',
        security: [
          {
            Bearer: []
          }
        ],
        parameters: [
          {
            in: 'path',
            name: 'email',
            schema: {
              type: 'string'
            },
            required: true,
            description: "User's email address"
          }
        ],
        responses: {
          200: {
            description: 'Get a user by email',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User'
                }
              }
            }
          },
          401: {
            description: 'Unauthorized'
          },
          404: {
            description: 'User not found'
          },
          500: {
            description: 'Internal server error'
          }
        }
      }
    },
    '/api/user/get/{username}': {
      get: {
        tags: ['User'],
        summary: 'Get user by username',
        description: 'Get a user by their username',
        security: [
          {
            Bearer: []
          }
        ],
        parameters: [
          {
            in: 'path',
            name: 'username',
            schema: {
              type: 'string'
            },
            required: true,
            description: "User's username"
          }
        ],
        responses: {
          200: {
            description: 'Get a user by username',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User'
                }
              }
            }
          },
          401: {
            description: 'Unauthorized'
          },
          404: {
            description: 'User not found'
          },
          500: {
            description: 'Internal server error'
          }
        }
      }
    },
    '/api/user/delete/{id}': {
      delete: {
        tags: ['User'],
        summary: 'Delete a user',
        description: 'Delete a user',
        security: [
          {
            Bearer: []
          }
        ],
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'string'
            },
            required: true,
            description: 'User id'
          }
        ],
        responses: {
          204: {
            description: 'Delete a user'
          },
          401: {
            description: 'Unauthorized'
          },
          404: {
            description: 'Not found'
          },
          500: {
            description: 'Internal server error'
          }
        }
      }
    },
    '/api/product/list': {
      get: {
        tags: ['Product'],
        summary: 'Get all products',
        description: 'Get all products',
        security: [
          {
            Bearer: []
          }
        ],
        responses: {
          200: {
            description: 'Get all products',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Product'
                  }
                }
              }
            }
          },
          401: {
            description: 'Unauthorized'
          },
          404: {
            description: 'Not found'
          }
        }
      }
    },
    '/api/product/list/{owner}': {
      get: {
        tags: ['Product'],
        summary: 'Get all products by owner',
        description: 'Get all products owner',
        security: [
          {
            Bearer: []
          }
        ],
        parameters: [
          {
            in: 'path',
            name: 'owner',
            schema: {
              type: 'string'
            },
            required: true,
            description: 'User id'
          }
        ],
        responses: {
          200: {
            description: 'Get all products',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Product'
                  }
                }
              }
            }
          },
          401: {
            description: 'Unauthorized'
          },
          404: {
            description: 'Not found'
          }
        }
      }
    },
    '/api/product/get/{pin}': {
      get: {
        tags: ['Product'],
        summary: 'Get a product',
        description: 'Get a product by its pin',
        security: [
          {
            Bearer: []
          }
        ],
        parameters: [
          {
            in: 'path',
            name: 'pin',
            schema: {
              type: 'string'
            },
            required: true,
            description: 'Product Pin'
          }
        ],
        responses: {
          200: {
            description: 'Get a product',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Product'
                }
              }
            }
          },
          401: {
            description: 'Unauthorized'
          },
          404: {
            description: 'Not found'
          },
          500: {
            description: 'Internal server error'
          }
        }
      }
    },
    '/api/product/get/{id}': {
      get: {
        tags: ['Product'],
        summary: 'Get a product',
        description: 'Get a product by its ID',
        security: [
          {
            Bearer: []
          }
        ],
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'string'
            },
            required: true,
            description: 'Product ID'
          }
        ],
        responses: {
          200: {
            description: 'Get a product',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Product'
                }
              }
            }
          },
          401: {
            description: 'Unauthorized'
          },
          404: {
            description: 'Not found'
          },
          500: {
            description: 'Internal server error'
          }
        }
      }
    },
    '/api/product/create': {
      post: {
        tags: ['Product'],
        summary: 'Create a product',
        description: 'Create a new product',
        security: [
          {
            Bearer: []
          }
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SaveProduct'
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Create a product'
          },
          400: {
            description: 'Bad request'
          },
          401: {
            description: 'Unauthorized'
          },
          500: {
            description: 'Internal server error'
          }
        }
      }
    },
    '/api/product/add-balance': {
      post: {
        tags: ['Product'],
        summary: 'Add Balance',
        description: 'Add balance to a product',
        security: [
          {
            Bearer: []
          }
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                format: 'application/json',
                type: 'object',
                properties: {
                  pin: {
                    type: 'string'
                  },
                  balance: {
                    type: 'number'
                  }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Add balance to a product'
          },
          400: {
            description: 'Bad request'
          },
          401: {
            description: 'Unauthorized'
          },
          500: {
            description: 'Internal server error'
          }
        }
      }
    },
    '/api/product/update/{id}': {
      put: {
        tags: ['Product'],
        summary: 'Update a Product',
        description:
          'You need to login to update a Product and you can only update your own Product',
        security: [
          {
            Bearer: []
          }
        ],
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'string'
            },
            required: true,
            description: 'Product id'
          }
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SaveProduct'
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Product updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Product'
                }
              }
            }
          },
          400: {
            description: 'Invalid request body or parameter'
          },
          401: {
            description: 'Unauthorized'
          },
          404: {
            description: 'Product not found'
          },
          500: {
            description: 'Internal server error'
          }
        }
      }
    },
    '/api/product/delete/{id}': {
      delete: {
        tags: ['Product'],
        summary: 'Delete a product',
        description: 'Delete a product by its ID',
        security: [
          {
            Bearer: []
          }
        ],
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'string'
            },
            required: true,
            description: 'Product ID'
          }
        ],
        responses: {
          204: {
            description: 'Delete a product'
          },
          401: {
            description: 'Unauthorized'
          },
          404: {
            description: 'Not found'
          },
          500: {
            description: 'Internal server error'
          }
        }
      }
    },
    '/api/beneficiary/list': {
      get: {
        tags: ['Beneficiary'],
        summary: 'Get all beneficiaries',
        description: 'Get all beneficiaries',
        security: [
          {
            Bearer: []
          }
        ],
        responses: {
          200: {
            description: 'Get all beneficiaries',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Beneficiary'
                  }
                }
              }
            }
          },
          401: {
            description: 'Unauthorized'
          },
          404: {
            description: 'Not found'
          },
          500: {
            description: 'Internal server error'
          }
        }
      }
    },
    '/api/beneficiary/list/{sender}': {
      get: {
        tags: ['Beneficiary'],
        summary: 'Get all beneficiaries',
        description: 'Get all beneficiaries by sender',
        security: [
          {
            Bearer: []
          }
        ],
        parameters: [
          {
            in: 'path',
            name: 'sender',
            schema: {
              type: 'string'
            },
            required: true,
            description: 'Sender id'
          }
        ],
        responses: {
          200: {
            description: 'Get all beneficiaries',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Beneficiary'
                  }
                }
              }
            }
          },
          401: {
            description: 'Unauthorized'
          },
          404: {
            description: 'Not found'
          },
          500: {
            description: 'Internal server error'
          }
        }
      }
    },
    '/api/Beneficiary/create': {
      post: {
        tags: ['Beneficiary'],
        summary: 'Create a Beneficiary',
        description: 'Create a Beneficiary',
        security: [
          {
            Bearer: []
          }
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SaveBeneficiary'
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Create a Beneficiary'
          },
          400: {
            description: 'Bad request'
          },
          401: {
            description: 'Unauthorized'
          },
          500: {
            description: 'Internal server error'
          }
        }
      }
    },
    '/api/Beneficiary/delete/{id}': {
      delete: {
        tags: ['Beneficiary'],
        summary: 'Delete a Beneficiary',
        description: 'Delete a Beneficiary',
        security: [
          {
            Bearer: []
          }
        ],
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'string'
            },
            required: true,
            description: 'Beneficiary id'
          }
        ],
        responses: {
          204: {
            description: 'Delete a Beneficiary'
          },
          401: {
            description: 'Unauthorized'
          },
          404: {
            description: 'Not found'
          },
          500: {
            description: 'Internal server error'
          }
        }
      }
    },
    '/api/payment/list': {
      get: {
        tags: ['Payment'],
        summary: 'Get all payments',
        description: 'Get all payments',
        security: [
          {
            Bearer: []
          }
        ],
        responses: {
          200: {
            description: 'Get all payments',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Payment'
                  }
                }
              }
            }
          },
          401: {
            description: 'Unauthorized'
          },
          404: {
            description: 'Not found'
          },
          500: {
            description: 'Internal server error'
          }
        }
      }
    },
    '/api/payment/list/{sender}': {
      get: {
        tags: ['Payment'],
        summary: 'Get all payments by sender',
        description: 'Get all payments',
        security: [
          {
            Bearer: []
          }
        ],
        parameters: [
          {
            in: 'path',
            name: 'sender',
            schema: {
              type: 'string'
            },
            required: true,
            description: 'Sender id'
          }
        ],
        responses: {
          200: {
            description: 'Get all payments',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Payment'
                  }
                }
              }
            }
          },
          401: {
            description: 'Unauthorized'
          },
          404: {
            description: 'Not found'
          },
          500: {
            description: 'Internal server error'
          }
        }
      }
    },
    '/api/payment/get/{id}': {
      get: {
        tags: ['Payment'],
        summary: 'Get a payment',
        description: 'Get a payment',
        security: [
          {
            Bearer: []
          }
        ],
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'string'
            },
            required: true,
            description: 'Payment id'
          }
        ],
        responses: {
          200: {
            description: 'Get a payment',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Payment'
                }
              }
            }
          },
          401: {
            description: 'Unauthorized'
          },
          404: {
            description: 'Payment not found'
          },
          500: {
            description: 'Internal server error'
          }
        }
      }
    },
    '/api/payment/create': {
      post: {
        tags: ['Payment'],
        summary: 'Create a Payment',
        description: 'Create a Payment',
        security: [
          {
            Bearer: []
          }
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SavePayment'
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Create a Payment'
          },
          400: {
            description: 'Bad request'
          },
          401: {
            description: 'Unauthorized'
          },
          500: {
            description: 'Internal server error'
          }
        }
      }
    },
    '/api/payment/loan': {
      post: {
        tags: ['Payment'],
        summary: 'Loan Payment',
        description: 'Loan Payment',
        security: [
          {
            Bearer: []
          }
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                format: 'application/json',
                type: 'object',
                properties: {
                  sender: {
                    type: 'string'
                  },
                  receptor: {
                    type: 'string'
                  },
                  amount: {
                    type: 'number'
                  }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Loan Payment'
          },
          400: {
            description: 'Bad request'
          },
          401: {
            description: 'Unauthorized'
          },
          500: {
            description: 'Internal server error'
          }
        }
      }
    },
    '/api/payment/credit': {
      post: {
        tags: ['Payment'],
        summary: 'Credit Payment',
        description: 'Credit Payment',
        security: [
          {
            Bearer: []
          }
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                format: 'application/json',
                type: 'object',
                properties: {
                  sender: {
                    type: 'string'
                  },
                  receptor: {
                    type: 'string'
                  },
                  amount: {
                    type: 'number'
                  }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Loan Payment'
          },
          400: {
            description: 'Bad request'
          },
          401: {
            description: 'Unauthorized'
          },
          500: {
            description: 'Internal server error'
          }
        }
      }
    }
  }
}

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ['./src/routes/*.router.ts'],
  explorer: true,
  security: [{ Bearer: [] }]
}

export const swaggerSetup = swaggerJSDoc(swaggerOptions)

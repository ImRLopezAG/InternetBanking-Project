import swaggerJSDoc, { OAS3Definition, OAS3Options } from 'swagger-jsdoc'
import { PORT } from '../../utils/constants'

const swaggerDefinition: OAS3Definition = {
  openapi: '3.0.0',
  info: {
    title: 'Internet - Banking  API',
    version: '1.0',
    description:
      'This is a REST API application made with Express. It retrieves data from Internet - Banking  DB and returns it in JSON format.',
    contact: {
      name: 'Angel Lopez',
      url: 'https://imrlopez.dev'
    }
  },
  servers: [
    {
      url: `${PORT.startsWith('https') ? PORT : `http://localhost:${PORT}`}`
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
          role: {
            type: 'string',
            enum: ['client', 'admin']
          }
        },
        example: {
          firstName: 'John',
          lastName: 'Doe',
          username: 'John',
          email: 'john@example.com',
          password: '123456abc',
          role: 'client'
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
            type: 'string',
            enum: ['savings', 'credit', 'loan'],
            default: 'savings'
          }
        },
        example: {
          user: 'your user id',
          type: 'loan'
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
    '/api/user/list': {
      get: {
        tags: ['User'],
        summary: 'Get all users',
        description: 'Get all users',
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
    '/api/user/email/{email}': {
      get: {
        tags: ['User'],
        summary: 'Get user by email',
        description: 'Get a user by their email address',
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
    '/api/user/username/{username}': {
      get: {
        tags: ['User'],
        summary: 'Get user by username',
        description: 'Get a user by their username',
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
    '/api/user/create': {
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
    '/api/user/update/{id}': {
      put: {
        tags: ['User'],
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
    '/api/user/delete/{id}': {
      delete: {
        tags: ['User'],
        summary: 'Delete a user',
        description: 'Delete a user',
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
    '/api/product/get/{id}': {
      get: {
        tags: ['Product'],
        summary: 'Get a product',
        description: 'Get a product by its ID',
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
    '/api/product/delete/{id}': {
      delete: {
        tags: ['Product'],
        summary: 'Delete a product',
        description: 'Delete a product by its ID',
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

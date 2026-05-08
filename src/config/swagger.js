const swaggerUi = require('swagger-ui-express');

const swaggerDocument = {
  openapi: '3.0.0',

  info: {
    title: 'API Raízes do Nordeste',
    version: '1.0.0',
    description: 'Documentação da API Back-end do projeto Raízes do Nordeste'
  },

  servers: [
    {
      url: 'http://localhost:3000'
    }
  ],

  paths: {
    '/auth/register': {
      post: {
        summary: 'Cadastrar usuário',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              example: {
                name: 'Admin',
                email: 'admin@email.com',
                password: '123456'
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Usuário cadastrado com sucesso'
          },
          400: {
            description: 'Usuário já existe'
          }
        }
      }
    },

    '/auth/login': {
      post: {
        summary: 'Login do usuário',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              example: {
                email: 'admin@email.com',
                password: '123456'
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Token JWT gerado'
          },
          401: {
            description: 'Credenciais inválidas'
          }
        }
      }
    },

    '/orders': {
      get: {
        summary: 'Listar pedidos',
        tags: ['Pedidos'],
        security: [
          {
            bearerAuth: []
          }
        ],
        responses: {
          200: {
            description: 'Lista de pedidos retornada com sucesso'
          },
          401: {
            description: 'Token inválido'
          }
        }
      },

      post: {
        summary: 'Criar pedido',
        tags: ['Pedidos'],
        security: [
          {
            bearerAuth: []
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              example: {
                product: 'Pizza Nordestina',
                quantity: 2
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Pedido criado com sucesso'
          },
          401: {
            description: 'Token inválido'
          },
          409: {
            description: 'Estoque insuficiente'
          }
        }
      }
    },

    '/payments': {
      post: {
        summary: 'Pagamento mock',
        tags: ['Pagamentos'],
        security: [
          {
            bearerAuth: []
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              example: {
                orderId: 1,
                paymentMethod: 'PIX'
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Pagamento aprovado'
          },
          401: {
            description: 'Token inválido'
          }
        }
      }
    }
  },

  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
};

module.exports = {
  swaggerUi,
  swaggerDocument
};
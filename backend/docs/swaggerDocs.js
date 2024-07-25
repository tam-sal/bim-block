const registerDoc = {
  tags: [
    {
      name: 'Auth',
      description: 'Authentication and user management'
    }
  ],
  '/auth/register': {
    post: {
      summary: 'Register a new user',
      tags: ['Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                  description: "User's email",
                  example: 'user@example.com'
                },
                password: {
                  type: 'string',
                  description: "User's password",
                  example: 'MyP@ssw0rd'
                },
                confirmedPassword: {
                  type: 'string',
                  description: 'Password confirmation',
                  example: 'MyP@ssw0rd'
                }
              }
            }
          }
        }
      },
      responses: {
        201: {
          description: 'User registered successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'string',
                    example: 'user@example.com has been successfully registered'
                  }
                }
              }
            }
          }
        },
        400: {
          description: 'Bad request'
        },
        409: {
          description: 'Conflict - User already exists'
        }
      }
    }
  }
};

export default { paths: registerDoc };
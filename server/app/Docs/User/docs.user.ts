export const userRouterDoc = {
     '/users/': {
         post: {
             summary: 'Register a New User',
             description: 'Creates a new user account in the system.',
             tags: ['Users'],
             requestBody: {
                 required: true,
                 content: {
                     'application/json': {
                         schema: {
                             type: 'object',
                             properties: {
                                 username: { type: 'string', description: 'Full name of the user', example: 'John Doe' },
                                 email: { type: 'string', format: 'email', description: 'User email address', example: 'johndoe@example.com' },
                                 password: { type: 'string', format: 'password', description: 'User password', example: 'StrongP@ssw0rd' },
                                 role: { type: 'string', enum: ['user', 'admin'], description: 'User role', example: 'user' },
                             },
                             required: ['name', 'email', 'password'],
                         },
                     },
                 },
             },
             responses: {
                 201: { description: 'User registered successfully.' },
                 400: { description: 'Invalid input data.' },
                 409: { description: 'Email already exists.' },
                 500: { description: 'Internal server error.' },
             },
         },
     },
     '/users/auth': {
         post: {
             summary: 'User Login',
             description: 'Authenticates a user and returns a token upon successful login.',
             tags: ['Users'],
             requestBody: {
                 required: true,
                 content: {
                     'application/json': {
                         schema: {
                             type: 'object',
                             properties: {
                                 email: { type: 'string', format: 'email', description: 'User email address', example: 'johndoe@example.com' },
                                 password: { type: 'string', format: 'password', description: 'User password', example: 'StrongP@ssw0rd' },
                             },
                             required: ['email', 'password'],
                         },
                     },
                 },
             },
             responses: {
                 200: { description: 'User logged in successfully, returns token.' },
                 400: { description: 'Invalid email or password.' },
                 500: { description: 'Internal server error.' },
             },
         },
     },
 };
 
 export default userRouterDoc;
 
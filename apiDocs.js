module.exports =
    {
        openapi: '3.0.1',
        info: {
            version: '1.0.0',
            title: 'Employees',
            description: 'Employees API',
            contact: {
                name: 'Vinn Njeru',
                email: 'vmbugua@cytonn.com',
                url: 'https://vinnjeru.com'
            },
            license: {
                name: 'Apache 2.0',
                url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
            }
        },
        servers: [
            {
                url: 'http://localhost:4000/',
                description: 'Local server'
            },
        ],
        tags: [
            {
                name: 'CRUD operations'
            }
        ],
        paths: {
            '/users': {
                /* ... */
                post: {
                    tags: ['CRUD operations'],
                    description: 'Create users',
                    operationId: 'createUsers',
                    parameters: [],
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Users'
                                }
                            }
                        },
                        required: true
                    },
                    responses: {
                        '200': {
                            description: 'New users were created'
                        },
                        '400': {
                            description: 'Invalid parameters',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error'
                                    },
                                    example: {
                                        message: 'User identificationNumbers 10, 20 already exist',
                                        internal_code: 'invalid_parameters'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
    };
export const environment = {
    server: {
        port: process.env.SERVER_PORT || 3001
    },
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || '5432',
        database: process.env.DB_DATABASE || 'teste',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres'
    }
};
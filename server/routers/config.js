module.exports = {
    DEV: {
        client: 'pg',
        // ElephantSQL Config
        // connection:'postgres://qvddfhyu:zyxUNHQzhz0Vd6J0lM@stampy.db.elephantsql.com:5432/qvddfhyu'
        connection: {
            user: 'dev',
            //password: 'letmein',
            database: 'dev-restaurants-app'
        },
        // enable debug mode
        // debug: true      
    },
    TEST: {
        client: 'pg',
        // ElephantSQL Config
        // connection:'postgres://qvddfhyu:zyxUNHQzhz0Vd6J0lM@stampy.db.elephantsql.com:5432/qvddfhyu'
        connection: {
            user: 'dev',
            password: 'letmein',
            database: 'dev-restaurants-app'
        }
    },
    // Define production database later
    PROD: {},
}
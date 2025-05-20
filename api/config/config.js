const { DATABASE_URL, JWT_SECRET } = process.env;

module.exports = {
    DATABASE_URL, JWT_SECRET: `${JWT_SECRET}`
}
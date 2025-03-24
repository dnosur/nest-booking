interface ServerConfig {
    port: number;
    protocol: string;
    host: string;
}
interface BcryptConfig {
    saltRounds: number;
}
interface JwtConfig {
    JWT_USER_SECRET: string;
}
interface RegexConfig {
    email: RegExp;
}
interface DbConfig {
    name: string;
    password: string;
    user: string;
    host: string;
    port: string;
}
interface Config {
    server: ServerConfig;
    bcrypt: BcryptConfig;
    isLocal: boolean;
    jwt: JwtConfig;
    regex: RegexConfig;
    db: DbConfig;
}
declare const config: Config;
export default config;

import { UserDatabase } from "../database/UserDatabase"
import { TLoginInputDTO, TLoginOutputDTO, TSignupInputDTO, TSignupOutputDTO } from "../dtos/UserDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { User } from "../models/User"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { TTokenPayload, USER_ROLES } from "../types"

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ) {}

    public signup = async (input: TSignupInputDTO): Promise<TSignupOutputDTO> => {
        const { name, email, password } = input

        if (typeof name !== "string") {
            throw new BadRequestError("'name' deve ser string")
        }

        if (typeof email !== "string") {
            throw new BadRequestError("'email' deve ser string")
        }

        if (typeof password !== "string") {
            throw new BadRequestError("'password' deve ser string")
        }
        
        // hash de password
		const hashedPassword = await this.hashManager.hash(password)

        const newUser = new User(
            this.idGenerator.generate(),
            name,
            email,
            hashedPassword,
            USER_ROLES.NORMAL,
            new Date().toISOString()
        )

        const newUserDB = newUser.toDBModel()
        await this.userDatabase.insert(newUserDB)

        const tokenPayload: TTokenPayload = {
            id: newUser.getId(),
            name: newUser.getName(),
            role: newUser.getRole()
        }

        const token = this.tokenManager.createToken(tokenPayload)

        const output: TSignupOutputDTO = {
            token
        }

        return output
    }

    public login = async (input: TLoginInputDTO): Promise<TLoginOutputDTO> => {
        const { email, password } = input

        if (typeof email !== "string") {
            throw new Error("'email' deve ser string")
        }

        if (typeof password !== "string") {
            throw new Error("'password' deve ser string")
        }

        const userDB = await this.userDatabase.findByEmail(email)

        if (!userDB) {
            throw new NotFoundError("'email' não encontrado")
        }

        const user = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role,
            userDB.created_at
        )

        const hashedPassword = user.getPassword()
        const isPasswordCorrect = await this.hashManager.compare(password, hashedPassword)
        
        if (!isPasswordCorrect){
                throw new BadRequestError("'email' ou 'senha' incorretos");
         }

        const payload: TTokenPayload = {
            id: user.getId(),
            name: user.getName(),
            role: user.getRole()
        }

        const token = this.tokenManager.createToken(payload)

        const output: TLoginOutputDTO = {
            token
        }

        return output
    }
}
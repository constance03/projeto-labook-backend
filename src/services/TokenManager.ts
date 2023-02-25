import jwt from 'jsonwebtoken'
import dotenv from 'dotenv' //veja como fazer essa importação na página de "Variáveis de ambiente (ENV)"
import { TTokenPayload } from '../types'

dotenv.config()

export class TokenManager {

    public createToken = (payload: TTokenPayload): string => {
        const token = jwt.sign(
            payload,
            process.env.JWT_KEY as string,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        )

        return token
    }

    public getPayload = (token: string): TTokenPayload | null => {
        try {
            const payload = jwt.verify(
                token,
                process.env.JWT_KEY as string
            )

            return payload as TTokenPayload

        } catch (error) {
            return null
        }
    }
}
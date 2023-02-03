import { Request, Response } from 'express'

export class PostController { 
    public getPosts = async (req: Request, res: Response) => {
        try {
            const characterDatabase = new PostDatabase()
            const charactersDB: TCharacterDB[] = await characterDatabase.findCharacters()
    
            const characters = charactersDB.map((characterDB) => new Character(
                characterDB.id,
                characterDB.name,
                characterDB.origin
            ))
    
            res.status(200).send(characters)
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }
}
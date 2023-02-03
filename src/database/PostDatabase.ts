import { TPostDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
    public static TABLE_POSTS = "posts"

    public async findPosts () {
        const result: TPostDB[] = await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
        return result
    }
}
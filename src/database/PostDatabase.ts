import { POST_LIKE, TLikeDislikeDB, TPostDB, TPostWithCreatorDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
    public static TABLE_POSTS = "posts"
    public static TABLE_LIKES_DISLIKES = "likes_dislikes"

    public getPostsWithCreators = async (): Promise<TPostWithCreatorDB[]> => {
        const result: TPostWithCreatorDB[] = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .select(
            "posts.id",
            "posts.creator_id",
            "posts.content",
            "posts.likes",
            "posts.dislikes",
            "posts.created_at",
            "posts.updated_at",
            "users.name AS creator_name"
        )
        .join("users", "posts.creator_id", "=", "users.id")

        return result
    }
    
    public insert = async (newPostDB: TPostDB): Promise<void> => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .insert(newPostDB)
    }

    public findById = async (id: string): Promise<TPostDB | undefined> => {
        const result: TPostDB[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .select()
            .where({id})

            return result[0]
    }

    public update = async (id: string, postDB: TPostDB): Promise<void> => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .update(postDB)
            .where({ id })
    }

    public delete = async (id: string): Promise<void> => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .delete()
            .where({ id })
    }

    public findPostsWithCreatorsById = async (postId: string) : Promise<TPostWithCreatorDB | undefined> => {
        const result: TPostWithCreatorDB[] = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .select(
            "posts.id",
            "posts.creator_id",
            "posts.content",
            "posts.likes",
            "posts.dislikes",
            "posts.created_at",
            "posts.updated_at",
            "users.name AS creator_name"
        )
        .join("users", "posts.creator_id", "=", "users.id")
        .where("posts.id", postId)

        return result[0]
    }

    public likeOrDislike = async (likeDislike: TLikeDislikeDB): Promise<void> => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_LIKES_DISLIKES)
            .insert(likeDislike)
    }

    public findLikeDislike = async (likeDislikeToFind: TLikeDislikeDB): Promise<POST_LIKE | null> => {
        const [ likeDislikeDB ]: TLikeDislikeDB[] = await BaseDatabase
        .connection(PostDatabase.TABLE_LIKES_DISLIKES)
        .select()
        .where({
            user_id: likeDislikeToFind.user_id,
            post_id: likeDislikeToFind.post_id
        })

        if (likeDislikeDB) {
            return likeDislikeDB.like === 1 ? POST_LIKE.ALREADY_LIKED : POST_LIKE.ALREADY_DISLIKED
        } else {
            return null
        }

    }

    public removeLikeDislike = async (likeDislikeDB: TLikeDislikeDB): Promise<void> => {
        await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES)
        .delete()
        .where({
            user_id: likeDislikeDB.user_id,
            post_id: likeDislikeDB.post_id
        })
    }

    public updateLikeDislike = async (likeDislikeDB: TLikeDislikeDB): Promise<void> => {
        await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES)
        .update(likeDislikeDB)
        .where({
            user_id: likeDislikeDB.user_id,
            post_id: likeDislikeDB.post_id
        })
    }

}
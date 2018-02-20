export interface IPost {
    id: string,
    title: string,
    body: string
}

export interface IPostList {
    entries: IPost[]
}
export interface BlogsJson {
  base_url: string,
  blogs: {
    name: string,
    file: string,
    tags: string[],
    created: string,
    updated: string
  }[]
}

export async function getBlogsJson(): Promise<BlogsJson> {
  const file = Bun.file("./blogs.json");
  return (await file.json()) as BlogsJson
}

export async function setBlogsJson(blogsJson: BlogsJson) {
  await Bun.write("./blogs.json", JSON.stringify(blogsJson, null, 2))
}
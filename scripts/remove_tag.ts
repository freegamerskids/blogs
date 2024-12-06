import { getBlogsJson, setBlogsJson } from "./util";

(async () => {
  const args = process.argv.slice(2);
  if (args.length < 2) return console.log("usage: <file name> <tag>");
  
  const blogs = await getBlogsJson();
  
  const date = new Date().toUTCString();
  let file = args.shift() ?? "unnamed.md";
  file = (file.endsWith(".md") ? file : `${file}.md`)
  
  for (const blog of blogs.blogs) {
    if (blog.file === file) {
      const tagIndex = blog.tags.indexOf(args[0])
      if (tagIndex === -1) return console.log("tag doesn't exists")
      blog.tags.splice(tagIndex, 1)
      blog.updated = date
    }
  }
  
  setBlogsJson(blogs);
})()
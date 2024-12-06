import { getBlogsJson, setBlogsJson } from "./util";

(async () => {
  const args = process.argv.slice(2);
  if (args.length < 2) return console.log("usage: <file name> <tags>");
  
  const blogs = await getBlogsJson();
  
  const date = new Date().toUTCString();
  let file = args.shift() ?? "unnamed.md";
  file = (file.endsWith(".md") ? file : `${file}.md`)
  
  for (const blog of blogs.blogs) {
    if (blog.file === file) {
      for (const tag of blog.tags) {
        const tagIndex = args.indexOf(tag)
        if (tagIndex === -1) continue;
        args.splice(tagIndex, 1)
      }
      blog.updated = date
      blog.tags = blog.tags.concat(args)
    }
  }
  
  setBlogsJson(blogs);
})()
import { getBlogsJson, setBlogsJson } from "./util";

(async () => {
  const args = process.argv.slice(2);
  if (args.length < 2) return console.log("usage: <file name> \"<name of blog>\"");
  
  const blogs = await getBlogsJson();
  
  const date = new Date().toUTCString();
  let file = args.shift() ?? "unnamed.md";
  file = (file.endsWith(".md") ? file : `${file}.md`)
  
  for (const blog of blogs.blogs) {
    if (blog.file === file) {
      blog.name = args.join(" ").replaceAll('"', "")
      blog.updated = date
    }
  }
  
  setBlogsJson(blogs);
})()
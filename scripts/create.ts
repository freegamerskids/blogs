import { getBlogsJson, setBlogsJson } from "./util";

(async () => {
  const args = process.argv.slice(2);
  if (args.length < 2) return console.log("usage: <file name> \"<name of blog>\"");
  
  const blogs = await getBlogsJson();
  
  const date = new Date().toUTCString();
  let file = args.shift() ?? "unnamed.md"
  file = (file.endsWith(".md") ? file : `${file}.md`)
  
  const bunFile = Bun.file(`./blogs/${file}`)
  if (await bunFile.exists()) return console.log("file already exists")
  Bun.write(bunFile, "")
  
  blogs.blogs.push({
    file: (file.endsWith(".md") ? file : `${file}.md`),
    name: args.join(" ").replaceAll('"', ""),
    created: date,
    updated: date,
    tags: []
  })
  
  setBlogsJson(blogs);
})()
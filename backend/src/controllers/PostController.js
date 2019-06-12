const Post = require("../models/Post");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

module.exports = {
  async index(req, res) {
    const posts = await Post.find().sort("-createdAt");
    return res.json(posts);
  },

  async store(req, res) {
    const { author, place, description, hashtags } = req.body;
    const { filename: image } = req.file;

    const [name, ext] = image.split(".");
    const filename = `${name}.jpg`;

    await sharp(req.file.path)
      .resize(500) //tamanho da max da img
      .jpeg({ quality: 70 }) //qualidade 70%
      .toFile(path.resolve(req.file.destination, "resized", filename));

    fs.unlinkSync(req.file.path); //deleta a img original

    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image: filename
    });

    req.io.emit("post", post);

    return res.json(post);
  }
};

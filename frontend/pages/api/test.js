import landingService from "../../src/services/landing.sercice";
import layoutService from "../../src/services/layout.service";
import postService from "../../src/services/post.services";

export default async function handler(req, res) {
    res.status(200).json(await postService.getBySlug('publicacao-3', pt-BR))
  }
  
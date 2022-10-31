import landingService from "../../src/services/landing.sercice";
import layoutService from "../../src/services/layout.service";

export default async function handler(req, res) {
    res.status(200).json(await landingService.get("en"))
  }
  
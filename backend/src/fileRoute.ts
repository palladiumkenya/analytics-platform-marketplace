import express from 'express';
import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { uploadFile, getFileUrl, getFile } from "./service/fileService";
import { Plugin } from "./entity/Plugin";
import { AppDataSource } from "./dataSource";

const upload = multer();
const router = express.Router();
type responseType = "file" | "json";
const pluginRepo = AppDataSource.getRepository(Plugin);

router.get("/", async(req: Request, res: Response, next: NextFunction) => {
  const plugins = await pluginRepo.find();
  res.json({
    data: plugins
  });
});

router.post(
  "/upload",
  upload.any(),
  async (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as Express.Multer.File[];
    const { description, category, pluginName } = req.body;
    console.log('request body', req.body);
    if (!files[0]) return res.status(400).json({ error: "No file uploaded" });
    const { buffer, mimetype, fieldname, originalname } = files[0];
    try {
      const result = await uploadFile(originalname, buffer, mimetype);
      const pluginKey = result.key;
      const pluginUrl = await getFileUrl(pluginKey);
      // persist in db
      console.log('upload results', pluginUrl);
      const plugin = await pluginRepo.create({ pluginName, description, pluginUrl, pluginKey , version: 1, categoryId: 1, createdAt: new Date() });
      await pluginRepo.save(plugin);
      res.json({ message: "Successfully uploaded config"});
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

router.get("/mappers", async (req: Request, res: Response, next: NextFunction) => {
try {
    const config = req.query.config as string | undefined;
    const responseType = req.query.type as responseType;
    if (!config) {
      return res.status(400).json({ error: "Config parameter is required" });
    }
    if (!responseType) {
      return res.status(400).json({ error: "Type parameter is required" });
    }
    if (responseType === "file") {
      const url = await getFileUrl(config);
      res.json({ url });
    } else if (responseType === "json") {
      const content = await getFile(config);
      try {
        const parsed = JSON.parse(content);
        return res.json(parsed);
      } catch (err) {
        next(err);
        // return res.type("text/plain").send(content);
      }
    }
        
  } catch (err) {
    next(err);
  }
});

export default router;
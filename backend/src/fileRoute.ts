import express from 'express';
import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { uploadFile, getFileUrl, getFile } from "./service/fileService";
import { Plugin } from "./entity/Plugin";
import { AppDataSource } from "./dataSource";
import { PluginCategory } from './entity/PluginCategory';

const upload = multer();
const router = express.Router();
type responseType = "file" | "json";
const pluginRepo = AppDataSource.getRepository(Plugin);

router.get("/", async(req: Request, res: Response, next: NextFunction) => {
    const plugins = await pluginRepo.find();
    res.json({
      data: plugins,
    });
});

router.get("/mappers", async (req: Request, res: Response, next: NextFunction) => {
try {
    let config = req.query.config as string;
    const responseType = req.query.type as responseType;
    if (!config) {
      return res.status(400).json({ error: "Config parameter is required" });
    }
    if (!responseType) {
      return res.status(400).json({ error: "Type parameter is required" });
    }
    if (config === "default") {
      const defaultPlugin = await pluginRepo.createQueryBuilder("plugin")
      .innerJoin(PluginCategory, "plugin_category", "plugin_category.id = plugin.category_id")
      .orderBy("plugin.created_at", "ASC")
      .getOne();
      if (defaultPlugin) {
       config = defaultPlugin.pluginKey;
      }
      
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
      }
    }        
  } catch (err) {
    next(err);
  }
});

router.get("/:pluginId", async(req: Request, res: Response, next: NextFunction) => {
  const pluginId = Number(req.params.pluginId);
  try {
    const plugin = await pluginRepo.findOneBy({
      id: pluginId
    });

    if(!plugin) {
      return res.status(404).json({ error: "Plugin not found"});
    }
    const signedUrl = await getFileUrl(plugin.pluginKey);
    const data = {
      url: signedUrl,
      pluginName: plugin.pluginName
    }
    res.json({data})
  } catch (error) {
    next(error);
  }
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
      const existingPlugin = await pluginRepo.findOneBy({
        pluginName
      });

      if (existingPlugin) {
        const updatedVersion = existingPlugin.version + 1;
        existingPlugin.version = updatedVersion;
        pluginRepo.save(existingPlugin);
      } else {
        const result = await uploadFile(originalname, buffer, mimetype);
        const pluginKey = result.key;
        const pluginUrl = await getFileUrl(pluginKey);
        // persist in db
        const plugin = await pluginRepo.create({
          pluginName,
          description,
          pluginUrl,
          pluginKey,
          version: 1,
          categoryId: 1,
          createdAt: new Date(),
        });
        await pluginRepo.save(plugin);
      }
      res.json({ message: "Successfully uploaded config"});
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);



export default router;
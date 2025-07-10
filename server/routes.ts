import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

const searchQuerySchema = z.object({
  industry: z.string().optional(),
  stages: z.array(z.string()).optional(),
  checkSizes: z.array(z.string()).optional(),
  geographicFocus: z.array(z.string()).optional(),
  limit: z.coerce.number().optional(),
  offset: z.coerce.number().optional(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all VCs
  app.get("/api/vcs", async (req, res) => {
    try {
      const vcs = await storage.getAllVCs();
      res.json(vcs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch VCs" });
    }
  });

  // Search VCs - this needs to be before the :id route
  app.get("/api/vcs/search", async (req, res) => {
    try {
      const query = searchQuerySchema.parse(req.query);
      const results = await storage.searchVCs(query);
      res.json(results);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid search parameters", details: error.errors });
      }
      res.status(500).json({ error: "Failed to search VCs" });
    }
  });

  // Get a specific VC
  app.get("/api/vcs/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const vc = await storage.getVC(id);
      
      if (!vc) {
        return res.status(404).json({ error: "VC not found" });
      }
      
      res.json(vc);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch VC" });
    }
  });

  // Get contact information
  app.get("/api/vcs/:id/contact", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const vc = await storage.getVC(id);
      
      if (!vc) {
        return res.status(404).json({ error: "VC not found" });
      }
      
      // Return contact information
      res.json({
        name: vc.name,
        email: vc.email,
        firm: vc.firm,
        website: vc.website,
        twitter: vc.twitter,
        verified: vc.isVerified,
        note: "Contact information sourced from vcsheet.com and verified"
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contact information" });
    }
  });

  // Refresh VC data endpoint
  app.post("/api/vcs/refresh", async (req, res) => {
    try {
      const result = await storage.refreshVCs();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to refresh VC data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

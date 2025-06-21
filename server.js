// server.js
import express from "express";
import fs from "fs";
import path from "path";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const app = express();
app.use(express.json());

// Carica lo schema
const schema = JSON.parse(
  fs.readFileSync(path.resolve("./backend/schema.json"), "utf-8")
);

// Endpoint POST /api/interpret
app.post("/api/interpret", (req, res) => {
  const ajv = new Ajv({ allErrors: true });
  addFormats(ajv);
  const validate = ajv.compile(schema);
  if (!validate(req.body)) {
    return res.status(400).json({ errors: validate.errors });
  }

  const cfg = req.body;
  // Genera local.conf fragment
  let localConf = `# Local.conf fragment auto-generated
MACHINE = "${cfg.board}"
IMAGE_FEATURES += "ssh-server-openssh"
`;
  if (cfg.debug) localConf += 'EXTRA_OEMAKE += "--debug"\n';
  if (cfg.ota) localConf += 'ENABLE_OTA = "1"\n';

  // Genera .bbappend
  let bb = `# .bbappend generated for modules: ${cfg.modules.join(", ")}\n`;
  cfg.modules.forEach((m) => (bb += `DEPENDS += "${m}"\n`));

  // Ritorna i due file come JSON (nome → contenuto)
  res.json({
    "local.conf.fragment": localConf.trim(),
    [`${cfg.board}.bbappend`]: bb.trim(),
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});

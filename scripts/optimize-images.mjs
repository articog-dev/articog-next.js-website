import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const inputDir = path.resolve("media-src");
const outputDir = path.resolve("media-out");
const extensions = new Set([".png", ".jpg", ".jpeg"]);

async function getSourceFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await getSourceFiles(entryPath));
    else if (extensions.has(path.extname(entry.name).toLowerCase())) files.push(entryPath);
  }

  return files;
}

try {
  const sourceFiles = await getSourceFiles(inputDir);

  await fs.mkdir(outputDir, { recursive: true });

  for (const sourcePath of sourceFiles) {
    const relativePath = path.relative(inputDir, sourcePath);
    const outputPath = path.join(outputDir, `${path.parse(relativePath).name}.webp`);
    const before = (await fs.stat(sourcePath)).size;

    await sharp(sourcePath)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 78, effort: 5 })
      .toFile(outputPath);

    const after = (await fs.stat(outputPath)).size;
    console.log(`${relativePath}: ${before} bytes -> ${path.basename(outputPath)}: ${after} bytes`);
  }
} catch (error) {
  if (error.code === "ENOENT") {
    console.log("media-src/ does not exist; add source images there before running optimization.");
  } else {
    throw error;
  }
}

const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  // Create destination directory if it doesn't exist
  fs.mkdirSync(dest, { recursive: true });

  // Read items in source directory
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    // Avoid copying public/data recursively to itself if called incorrectly
    if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === '.git') {
      continue;
    }

    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      // Copy file, overwriting existing
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const rootDataDir = path.join(__dirname, '..', 'data');
const publicDataDir = path.join(__dirname, '..', 'public', 'data');

try {
  if (fs.existsSync(rootDataDir)) {
    console.log(`[Sync] Syncing root data directory: ${rootDataDir} -> ${publicDataDir}`);
    // Clean public/data directory if it exists to keep in sync
    if (fs.existsSync(publicDataDir)) {
      fs.rmSync(publicDataDir, { recursive: true, force: true });
    }
    copyDir(rootDataDir, publicDataDir);
    console.log('[Sync] Data synced successfully.');
  } else {
    console.warn(`[Sync] Warning: Root data directory not found at: ${rootDataDir}`);
  }
} catch (error) {
  console.error('[Sync] Error during data sync:', error);
  process.exit(1);
}

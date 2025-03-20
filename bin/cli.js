#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const componentName = process.argv[2];
if (!componentName) {
  console.error('Please specify a component name');
  process.exit(1);
}

const sourceDir = path.join(__dirname, '../src/components', componentName);
const targetDir = path.join(process.cwd(), 'src/components', componentName);

// Create target directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Copy component files
try {
  const files = fs.readdirSync(sourceDir);
  files.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);
    fs.copyFileSync(sourcePath, targetPath);
  });

  console.log(`✨ Successfully copied ${componentName} component to your project!`);
  console.log(`📁 Location: ${targetDir}`);
  
  // Check and install peer dependencies
  const packageJson = require('../package.json');
  const peerDeps = packageJson.peerDependencies || {};
  
  console.log('\n📦 Installing peer dependencies...');
  Object.entries(peerDeps).forEach(([dep, version]) => {
    try {
      execSync(`npm list ${dep} || npm install ${dep}@${version}`, { stdio: 'inherit' });
    } catch (error) {
      console.warn(`⚠️  Warning: Could not install ${dep}. You may need to install it manually.`);
    }
  });
  
  console.log('\n🎉 All done! You can now import the component from:');
  console.log(`   import { ${componentName} } from './components/${componentName}'`);
} catch (error) {
  console.error(`❌ Error: ${error.message}`);
  process.exit(1);
}

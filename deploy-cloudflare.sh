#!/usr/bin/env bash
# Cloudflare Pages Deployment Script
# Run this after pushing to GitHub to trigger a build, or use with wrangler for direct deploy

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

PROJECT_NAME="react-portfolio-q2r"
BUILD_DIR="dist"

echo -e "${GREEN}🚀 Cloudflare Pages Deployment${NC}"
echo "=================================="

# 1. Install dependencies
echo -e "\n${YELLOW}📦 Installing dependencies...${NC}"
npm ci

# 2. Build for production
echo -e "\n${YELLOW}🔨 Building for production...${NC}"
npm run build

# 3. Verify build output
echo -e "\n${YELLOW}✅ Verifying build output...${NC}"
if [[ ! -d "$BUILD_DIR" ]]; then
  echo -e "${RED}❌ Build directory not found!${NC}"
  exit 1
fi

if [[ ! -f "$BUILD_DIR/_redirects" ]]; then
  echo -e "${RED}❌ _redirects file missing from build output!${NC}"
  exit 1
fi

if [[ ! -f "$BUILD_DIR/_headers" ]]; then
  echo -e "${RED}❌ _headers file missing from build output!${NC}"
  exit 1
fi

if [[ ! -f "$BUILD_DIR/sitemap.xml" ]]; then
  echo -e "${RED}❌ sitemap.xml missing from build output!${NC}"
  exit 1
fi

echo -e "${GREEN}✅ All required files present in build output${NC}"

# 4. Show build summary
echo -e "\n${GREEN}📊 Build Summary:${NC}"
echo "  - Build directory: $BUILD_DIR"
echo "  - Files:"
ls -la "$BUILD_DIR"/ | grep -E "^\-" | awk '{print "    " $9 " (" $5 " bytes)"}'

# 5. Deploy options
echo -e "\n${YELLOW}🚀 Deployment Options:${NC}"
echo "  Option 1: Git push (auto-deploy via Cloudflare Pages)"
echo "    git add -A && git commit -m \"deploy: production build\" && git push"
echo ""
echo "  Option 2: Direct deploy with Wrangler (requires auth)"
echo "    npx wrangler pages deploy $BUILD_DIR --project-name=$PROJECT_NAME"
echo ""
echo "  Option 3: Manual upload via Cloudflare Dashboard"
echo "    Upload the '$BUILD_DIR' folder contents"

# 6. Post-deploy verification
echo -e "\n${YELLOW}🔍 Post-Deploy Verification (run after deploy):${NC}"
echo "  # Test redirects"
echo "  curl -I https://vedprakash.me/index.html"
echo "  curl -I https://vedprakash.me/about"
echo "  curl -I https://www.vedprakash.me/"
echo ""
echo "  # Test canonical tags (view source)"
echo "  curl -s https://vedprakash.me/ | grep -i canonical"
echo ""
echo "  # Test security headers"
echo "  curl -I https://vedprakash.me/"

echo -e "\n${GREEN}✨ Done!${NC}"
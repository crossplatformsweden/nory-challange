#!/bin/bash
echo "==============================================="
echo "Testing TypeScript Backend Configuration"
echo "==============================================="

# Check if TypeScript is installed and available
echo "Checking TypeScript installation..."
if ! pnpm tsc --version; then
  echo "TypeScript is not available. Please make sure it's installed properly."
  exit 1
fi

# Check TypeScript configuration
echo "Checking TypeScript configuration..."
pnpm check-types

# Build the project
echo "Building the project..."
pnpm build

# Test the server (if it builds successfully)
if [ $? -eq 0 ]; then
  echo "Build successful. You can now start the server with:"
  echo "pnpm dev       # Development mode with auto-restart"
  echo "pnpm dev:ts    # Development mode with ts-node (faster)"
  echo "pnpm start     # Production mode (after build)"
  echo ""
  echo "The server will be available at http://localhost:8080"
  echo "API Documentation will be available at http://localhost:8080/api-docs/"
else
  echo "Build failed. Please check the errors above."
  exit 1
fi

echo "==============================================="
echo "Setup complete!"
echo "==============================================="
#!/bin/bash

set -euo pipefail

# Function to log messages in green
log() {
    echo -e "\033[1;32m$1\033[0m"
}

# Detect the operating system
OS="$(uname -s)"

# Function to install build-essential and curl on Linux
install_linux_packages() {
    log "Updating package list and installing essential packages..."
    sudo apt-get update
    sudo apt-get install -y build-essential curl
}

# Function to install Node.js LTS if not installed
install_node() {
    if ! command -v node &>/dev/null; then
        log "Node.js not found. Installing Node.js LTS..."
        if [[ "$OS" == "Linux" ]]; then
            curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
            sudo apt-get install -y nodejs
        elif [[ "$OS" == "Darwin" ]]; then
            # macOS
            if command -v brew &>/dev/null; then
                brew install node
            else
                echo "Homebrew not found. Please install Homebrew or Node.js manually."
                exit 1
            fi
        else
            echo "Unsupported OS: $OS"
            exit 1
        fi
    else
        log "Node.js is already installed. Skipping installation."
    fi
}

# Function to install pnpm if not installed
install_pnpm() {
    if ! command -v pnpm &>/dev/null; then
        log "pnpm not found. Installing pnpm..."
        if [[ "$EUID" -ne 0 ]]; then
            sudo npm install -g pnpm@8.15.6
        else
            npm install -g pnpm@8.15.6
        fi
    else
        log "pnpm is already installed. Skipping installation."
    fi
}

# Exit if running on macOS
if [[ "$(uname -s)" == "Darwin" ]]; then
    echo "This script is intended for Linux environments only."
    exit 0
fi

# Exit if running in GitHub Actions
if [[ -n "${GITHUB_ACTIONS:-}" ]]; then
    echo "This script is not intended to run in GitHub Actions."
    exit 0
fi

# Clone the repository only if /app does not exist
if [ ! -d "/app" ]; then
    log "Cloning repository into /app..."
    sudo mkdir -p /app
    sudo chown "$(id -u):$(id -g)" /app
    git config --global core.hooksPath /dev/null
    git config --global --add url.https://github.com/.insteadOf https://github.com/
    git config --global --add url.https://github.com/.insteadOf git@github.com:
    git clone --depth 1 --shallow-submodules --recurse-submodules https://github.com/crossplatformsweden/nory-challange /app
else
    log "/app directory already exists. Skipping clone."
fi

cd /app

# Install essential packages on Linux
if [[ "$OS" == "Linux" ]]; then
    install_linux_packages
fi

# Install Node.js if not installed
install_node

# Run npx commands
log "Installing Husky..."
npx husky install

log "Installing Playwright and Chromium browser with dependencies..."
npx playwright install --with-deps chromium

# Install pnpm after npx commands
install_pnpm

# Install project dependencies with pnpm
log "Installing project dependencies with pnpm..."
pnpm install

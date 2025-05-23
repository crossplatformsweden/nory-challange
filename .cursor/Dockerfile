# Extend Playwright base image
FROM mcr.microsoft.com/playwright:v1.52.0-noble

# Accept GitHub token as a build argument
ARG GH_TOKEN
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV GH_TOKEN=$GH_TOKEN

# Install necessary packages and pnpm
RUN apt-get update && \
    apt-get install -y curl gnupg jq gpg lsb-release && \
    corepack enable && \
    corepack prepare pnpm@8.15.6 --activate

# Install GitHub CLI
RUN curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | \
      dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg && \
    chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg && \
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] \
      https://cli.github.com/packages stable main" > /etc/apt/sources.list.d/github-cli.list && \
    apt-get update && \
    apt-get install -y gh && \
    rm -rf /var/lib/apt/lists/*

# Authenticate GitHub CLI non-interactively
RUN mkdir -p /root/.config/gh && \
    echo "github.com:" > /root/.config/gh/hosts.yml && \
    echo "    oauth_token: ${GH_TOKEN}" >> /root/.config/gh/hosts.yml && \
    echo "    git_protocol: https" >> /root/.config/gh/hosts.yml && \
    echo "    user: $(curl -s -H \"Authorization: token ${GH_TOKEN}\" https://api.github.com/user | jq -r .login)" >> /root/.config/gh/hosts.yml

# Set work directory
WORKDIR /app

# Copy project files
COPY . .

# Install dependencies and browsers
RUN pnpm install && pnpm exec playwright install

# Default command
CMD [ "bash" ]
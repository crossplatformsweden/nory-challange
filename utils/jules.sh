#!/bin/bash
set -e


# === PARAMETERS ===
GH_TOKEN="$1"
COMMIT_MSG="$2"

if [ -z "$GH_TOKEN" ] || [ -z "$COMMIT_MSG" ]; then
    echo "❌ Usage: ./jules.sh <github_token> <commit_message>"
    exit 1
fi

# === ENVIRONMENT ===
export NODE_ENV=development
BRANCH=$(git rev-parse --abbrev-ref HEAD)

# === FORCE INSTALL GitHub CLI ===
echo "[*] Forcing GitHub CLI install..."
sudo apt-get update
sudo apt-get install -y curl jq gpg
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg |
    sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg &&
    sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] \
  https://cli.github.com/packages stable main" |
    sudo tee /etc/apt/sources.list.d/github-cli.list >/dev/null

sudo apt-get update
sudo apt-get install -y gh

# === FORCE AUTHENTICATE GH CLI ===
echo "[*] Configuring GitHub CLI authentication..."
mkdir -p ~/.config/gh
cat >~/.config/gh/hosts.yml <<EOF
github.com:
    oauth_token: $GH_TOKEN
    git_protocol: https
    user: $(curl -s -H "Authorization: token $GH_TOKEN" https://api.github.com/user | jq -r .login)
EOF

gh auth status

# === COMMIT & PUSH ===
echo "[*] Committing and pushing changes..."
git add .
git commit -am "$COMMIT_MSG" --no-verify || echo "⚠️ No changes to commit"
git push origin "$BRANCH" --no-verify

# === PR CHECK / CREATE ===
echo "[*] Checking for existing pull request..."
PR_URL=$(gh pr list --head "$BRANCH" --json url -q '.[0].url')

if [ -z "$PR_URL" ]; then
    echo "[*] Creating new pull request to 'main'..."
    PR_URL=$(gh pr create --base main --head "$BRANCH" \
        --title "$COMMIT_MSG" \
        --body "Automated PR by Jules script" \
        --json url -q .url)
else
    echo "[*] Pull request already exists: $PR_URL"
fi

echo "[*] Pull request: $PR_URL"

# === WAIT FOR BUILD RESULT (CURRENT BRANCH) ===
echo "[*] Waiting for '🌿 Feature Branch Workflow' result on branch: $BRANCH..."

while true; do
    sleep 5
    RUN_JSON=$(gh run list --branch "$BRANCH" --workflow "🌿 Feature Branch Workflow" --limit 1 --json databaseId,name,status,conclusion,headBranch,startedAt,url)

    if [[ $(echo "$RUN_JSON" | jq length) -eq 0 ]]; then
        echo "[*] Waiting for workflow to start..."
        continue
    fi

    HEAD_BRANCH=$(echo "$RUN_JSON" | jq -r '.[0].headBranch')
    STATUS=$(echo "$RUN_JSON" | jq -r '.[0].status')
    CONCLUSION=$(echo "$RUN_JSON" | jq -r '.[0].conclusion')
    RUN_URL=$(echo "$RUN_JSON" | jq -r '.[0].url')

    if [ "$HEAD_BRANCH" != "$BRANCH" ]; then
        echo "[*] Ignoring run from different branch: $HEAD_BRANCH"
        continue
    fi

    if [ "$STATUS" == "completed" ]; then
        echo ""
        echo "✅ BUILD COMPLETED"
        echo "URL: $RUN_URL"
        echo "BRANCH: $HEAD_BRANCH"
        echo "RESULT: $CONCLUSION"
        echo "DETAILS:"
        echo "$RUN_JSON" | jq
        break
    else
        echo "[*] Workflow status: $STATUS (waiting...)"
    fi
done

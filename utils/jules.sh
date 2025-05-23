#!/bin/bash
set -e

# === PARAMETERS ===
GH_TOKEN="$1"
COMMIT_MSG="$2"

if [ -z "$GH_TOKEN" ] || [ -z "$COMMIT_MSG" ]; then
    echo "❌ Usage: npm run jules <github_token> \"<commit_message>\""
    exit 1
fi

# === ENVIRONMENT ===
export NODE_ENV=development
BRANCH=$(git rev-parse --abbrev-ref HEAD)

# === INSTALL GH CLI ===
echo "[*] Installing GitHub CLI..."
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

# === AUTH GH CLI ===
echo "[*] Authenticating GitHub CLI..."
mkdir -p ~/.config/gh
cat >~/.config/gh/hosts.yml <<EOF
github.com:
    oauth_token: $GH_TOKEN
    git_protocol: https
    user: $(curl -s -H "Authorization: token $GH_TOKEN" https://api.github.com/user | jq -r .login)
EOF

#gh auth status

# === SKIP PR IF ON MAIN BRANCH ===
if [ "$BRANCH" == "main" ]; then
    echo "✅ You are on the main branch. No pull request needed."
    echo "🎉 Success. Nothing more to do."
    exit 0
fi

# # === COMMIT AND PUSH ===
# echo "[*] Checking for files to commit..."
# git add .
# if git diff --cached --quiet; then
#     echo "[*] No files to commit. Continuing to PR and build monitoring."
# else
#     git commit -am "$COMMIT_MSG" --no-verify
#     git push origin "$BRANCH" --no-verify
# fi

# === PR CHECK / CREATE ===
# echo "[*] Checking or creating pull request for branch '$BRANCH'..."
# PR_URL=$(gh pr list --head "$BRANCH" --json url -q '.[0].url')

# if [ -z "$PR_URL" ]; then
#     echo "[*] Creating pull request..."
#     gh pr create --base main --head "$BRANCH" --title "$COMMIT_MSG" --body "Automated PR by Jules script"
#     PR_URL=$(gh pr list --head "$BRANCH" --json url -q '.[0].url')
# fi

# echo "[*] Pull request created or found: $PR_URL"

# # === WAIT FOR BUILD RESULT ===
# echo "[*] Waiting for '🌿 Feature Branch Workflow' to complete on branch '$BRANCH'..."

# while true; do
#     sleep 5

#     RUN_JSON=$(gh run list --branch "$BRANCH" --workflow "🌿 Feature Branch Workflow" --limit 1 --json name,status,conclusion,headBranch,url,databaseId)

#     if [[ $(echo "$RUN_JSON" | jq length) -eq 0 ]]; then
#         echo "[*] Waiting for workflow to appear..."
#         continue
#     fi

#     HEAD_BRANCH=$(echo "$RUN_JSON" | jq -r '.[0].headBranch')
#     STATUS=$(echo "$RUN_JSON" | jq -r '.[0].status')
#     CONCLUSION=$(echo "$RUN_JSON" | jq -r '.[0].conclusion')
#     RUN_URL=$(echo "$RUN_JSON" | jq -r '.[0].url')
#     RUN_ID=$(echo "$RUN_JSON" | jq -r '.[0].databaseId')

#     if [ "$HEAD_BRANCH" != "$BRANCH" ]; then
#         echo "[*] Ignoring unrelated branch: $HEAD_BRANCH"
#         continue
#     fi

#     if [ "$STATUS" == "completed" ]; then
#         echo ""
#         echo "🔍 Build Result: $CONCLUSION"
#         echo "🔗 $RUN_URL"
#         echo "$RUN_JSON" | jq

#         if [ "$CONCLUSION" == "success" ]; then
#             echo ""
#             echo "✅✅✅ BUILD SUCCESSFUL ✅✅✅"
#             echo "🎉 The branch '$BRANCH' has passed all checks."

#             echo "[*] Verifying pull request files:"
#             gh pr view "$PR_URL" --json files -q '.files[].path' | jq -R -s -c 'split("\n") | map(select(. != ""))' | jq

#             echo "[*] Checking for any final changes..."
#             git add .
#             if git diff --cached --quiet; then
#                 echo "🎯 No additional changes to commit."
#                 echo "🎉 Task complete. Build is green and PR is verified!"
#             else
#                 git commit -am "✅ Post-build sync" --no-verify
#                 git push origin "$BRANCH" --no-verify
#                 echo "[*] Triggering Jules again..."
#                 npx jules
#             fi
#         else
#             echo ""
#             echo "❌ Build failed!"
#             echo "📄 Reviewing GitHub Actions log using gh CLI:"
#             echo ""

#             gh run view "$RUN_ID" --log || echo "⚠️ Could not retrieve full logs."

#             echo ""
#             echo "💡 Fix the issues in your code, and then run:"
#             echo ""
#             echo "   npx jules <your_token> \"Fix build errors\""
#             echo ""
#             echo "🔐 Make sure your GitHub token is configured properly."
#         fi
#         break
#     else
#         echo "[*] Build status: $STATUS... still waiting"
#     fi
# done

echo "[run pnpm all] to test locally and use gh cli to view current pull request status"
echo "[*] Done."
echo "🎉 Success. Nothing more to do."
exit 0

#!/bin/bash

# Step 0: Expand path
TARGET_DIR="$HOME/Source/nory-challange"

# Step 1: Close Terminal, VSCode, and Cursor
osascript <<EOF
tell application "Visual Studio Code" to quit
tell application "Cursor" to quit
EOF

# Wait for apps to close
sleep 2

# Step 2: Open Visual Studio Code at specified path
open -a "Visual Studio Code" "$TARGET_DIR"

# Wait for VSCode to fully launch and stabilize
sleep 5

# Step 3: Open Cursor at specified path
open -a "Cursor" "$TARGET_DIR"

# Wait for Cursor to fully launch and stabilize
sleep 15

# Step 4: Ensure Cursor window is focused
osascript <<EOF
tell application "System Events"
    tell application process "Cursor"
        set frontmost to true
    end tell
end tell
EOF

# Step 5: Simulate Cmd+Shift+P, search, and type
osascript <<EOF
tell application "System Events"
    delay 0.5
    tell application process "Cursor"
        set frontmost to true
        delay 1
        keystroke "P" using {command down, shift down}
        delay 1
        keystroke "Cursor: New Chat"
        delay 1
        key code 36 -- press Enter
        delay 2
        keystroke "fix backend app TODO.MD (READ ALL LINES IN FILE) read build-test-result.txt end of file for build result and fix all erros in sequentaial order package by package, dont ask just fix. if the result are not ready sleep for a minute. READE ALL OF TODO.MD before you start. Fix lint then build erros, then tests, then e2e test. For for any test fixes make sure you validate all test ids. Make sure you run the right pnpm command in right package or folder using the pnpm --filter for follow up fixes such as pnpm test:unit before e2e. Make sure the jest test works before the e2e tests. Write and read to TODO.MD with plan and progress and what pnpm command to run with correct filter flag in what folder recursively make sure to write there before you start. Read it before you start as well to get some background info. When build-test-result.txt is completed commit and push. Only commit and push if everything is working. do not use --verify-ignore"
        delay 0.5
        key code 36 -- press Enter
    end tell
end tell
EOF

# Step 6: After 2 minutes, focus Cursor, run '>Cursor: Focus Chat', and send follow-up message
sleep 180
osascript <<EOF
tell application "System Events"
    tell application process "Cursor"
        set frontmost to true
        delay 1
        keystroke "P" using {command down, shift down}
        delay 1
        keystroke ">Cursor: Focus Chat"
        delay 1
        key code 36 -- press Enter
        delay 1
        keystroke "Read todo.md and continue with the best approach, follow best practice"
        delay 0.5
        key code 36 -- press Enter
    end tell
end tell
EOF

# Step 7: After another 2 minutes, repeat follow-up message
sleep 120
osascript <<EOF
tell application "System Events"
    tell application process "Cursor"
        set frontmost to true
        delay 1
        keystroke "P" using {command down, shift down}
        delay 1
        keystroke ">Cursor: Focus Chat"
        delay 1
        key code 36 -- press Enter
        delay 1
        keystroke "Read todo.md and continue with the best approach, follow best practice"
        delay 0.5
        key code 36 -- press Enter
    end tell
end tell
EOF

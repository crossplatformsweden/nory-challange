#!/bin/bash

# Step 0: Expand path
TARGET_DIR="$HOME/Source/nory-challange"

# Step 1: Close Terminal, VSCode, and Cursor
osascript <<EOF
tell application "Visual Studio Code" to quit
tell application "Cursor" to quitl
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
        keystroke "see build-test-result.txt and read todo.md and do not use --verify-ignore in any commit if all tasks are complete commit and push using git or gh cli. Verify buildserver pullrequest if everything is complete and test is green. Plan and think then execute! Dont ask. Execute! Start with a task!"
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
        keystroke "Read backend todo.md and continue with the best approach, follow best practice"
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

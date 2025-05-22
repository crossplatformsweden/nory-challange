#!/bin/bash

# Define target directory
TARGET_DIR="$HOME/Source/nory-challange"

# Step 1: Close applications
osascript <<EOF
tell application "Visual Studio Code" to quit
tell application "Cursor" to quit
EOF

# Wait for applications to close
sleep 2

# Step 2: Open Visual Studio Code
open -a "Visual Studio Code" "$TARGET_DIR"
sleep 5

# Step 3: Open Cursor
open -a "Cursor" "$TARGET_DIR"
sleep 10

# Step 3.5: Position Cursor fullscreen on external monitor (2560x1440 at {-2560, 0})
osascript <<EOF
tell application "System Events"
    tell application process "Cursor"
        set frontmost to true
        delay 0.5
        try
            set position of window 1 to {-2560, 0}
            set size of window 1 to {2560, 1440}
        end try
    end tell
end tell
EOF

# Step 4: Focus Cursor and initiate new chat
osascript <<EOF
tell application "System Events"
    tell application process "Cursor"
        set frontmost to true
        delay 1
        keystroke "P" using {command down, shift down}
        delay 1
        keystroke "Cursor: New Chat"
        delay 1
        key code 36 -- Enter
        delay 1
        keystroke "read build-test-result.txt and fix build and lint errors. Run pnpm lint && pnpm build. If it works, commit and push. Update todo.md."
        delay 0.5
        key code 36 -- Enter
    end tell
end tell
EOF


# Wait for 3 minutes
sleep 180

# Step 5: Focus chat and send follow-up message
osascript <<EOF
tell application "System Events"
    tell application process "Cursor"
        set frontmost to true
        delay 1
        keystroke "P" using {command down, shift down}
        delay 1
        keystroke "Cursor: Focus Chat"
        delay 1
        key code 36 -- Enter
        delay 1
        keystroke "Continue with the best approach, follow best practices. After changes, update todo.md. Run pnpm all and make commits."
        delay 0.5
        key code 36 -- Enter
    end tell
end tell
EOF

# Wait for 3 minutes
sleep 180

# Step 6: Final follow-up message
osascript <<EOF
tell application "System Events"
    tell application process "Cursor"
        set frontmost to true
        delay 1
        keystroke "P" using {command down, shift down}
        delay 1
        keystroke "Cursor: Focus Chat"
        delay 1
        key code 36 -- Enter
        delay 1
        keystroke "Ensure there are no lint and build errors. If none, make a commit."
        delay 0.5
        key code 36 -- Enter
    end tell
end tell
EOF

# Wait for 30 seconds
sleep 30

# Step 7: Commit changes if any
cd "$TARGET_DIR"
if [[ -n $(git status --porcelain) ]]; then
    git add .
    git commit -m "Auto save" --no-verify
    git push origin HEAD --no-verify
fi

# Step 8: Run pnpm all
pnpm all

# Step 9: Launch Claude 1 in new iTerm window (left side)
CLAUDE_CMD_1="claude -p 'See build errors at the end of file build-test-result.txt. Update todo.md and commit and push fixes to relevant files. Think about what files to focus on. Test with pnpm all, plan and execute.'"

osascript <<EOF
tell application "iTerm"
    set newWindow to (create window with default profile)
    tell current session of newWindow
        write text "$CLAUDE_CMD_1"
    end tell
end tell
EOF

sleep 2

# Position Claude 1 window on left side of main screen
osascript <<EOF
tell application "iTerm"
    set bounds of front window to {0, 0, 720, 900}
end tell
EOF

# Get PID of Claude 1
CLAUDE_PID_1=$(pgrep -n -f "$CLAUDE_CMD_1")

# Wait and kill
sleep 180
if [ -n "$CLAUDE_PID_1" ]; then
    kill "$CLAUDE_PID_1" 2>/dev/null
fi
osascript -e 'tell application "iTerm" to close (first window)'

# Step 10: Launch Claude 2 in new iTerm window (right side)
CLAUDE_CMD_2="claude -p 'Commit and push the code update todo.md about current status and append on top Answer Is the Todo complete?'"

osascript <<EOF
tell application "iTerm"
    set newWindow to (create window with default profile)
    tell current session of newWindow
        write text "$CLAUDE_CMD_2"
    end tell
end tell
EOF

sleep 2

# Position Claude 2 window on right side of main screen
osascript <<EOF
tell application "iTerm"
    set bounds of front window to {720, 0, 1440, 900}
end tell
EOF

# Get PID of Claude 2
CLAUDE_PID_2=$(pgrep -n -f "$CLAUDE_CMD_2")

# Wait and kill
sleep 180
if [ -n "$CLAUDE_PID_2" ]; then
    kill "$CLAUDE_PID_2" 2>/dev/null
fi
osascript -e 'tell application "iTerm" to close (first window)'

# Step 11: Final commit check
cd "$TARGET_DIR"
if [[ -n $(git status --porcelain) ]]; then
    git add .
    git commit -m "Auto save" --no-verify
    git push origin HEAD --no-verify
fi

# Step 12: Optional — close Terminal if you're not in iTerm
# osascript -e 'tell application "Terminal" to quit'

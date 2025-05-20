#!/bin/bash

# Kill all existing Terminal processes
osascript -e 'tell application "Terminal" to quit'

# Kill any process using port 3000 or 3001
for port in 3000 3001; do
    pid=$(lsof -ti tcp:$port)
    if [ -n "$pid" ]; then
        echo "Killing process on port $port (PID: $pid)"
        kill -9 $pid
    fi
done

# Wait a moment for terminals to close
sleep 2

# Open a new Terminal and run external-test
osascript -e 'tell application "Terminal"
    do script "cd /Users/xemil/Source/nory-challange && pnpm external-test"
end tell'

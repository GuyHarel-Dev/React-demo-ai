#!/bin/bash

# 1. Disable React's default browser launch behavior
export BROWSER=none

# 2. Start the React server in the background (using &)
npm run dev &

# 3. Wait 3 seconds to let Vite/React initialize the local port
sleep 3

# 4. Open your clean, isolated Chrome Guest App window
#start chrome --guest --app="http://localhost:3000"
start chrome --guest "http://localhost:3000"

fg %1

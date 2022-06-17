# Kill web application
kill -9 $(lsof -t -i:3000 -sTCP:LISTEN)

# Kill peer to peer relayer
kill -9 $(lsof -t -i:9000 -sTCP:LISTEN)

# Kill wallet JSON RPC
kill -9 $(lsof -t -i:8585 -sTCP:LISTEN)

# Restart
npm run dev
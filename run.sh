#!/bin/bash

# AHgochi Docker Runner
# Wipes the previous AHgochi image + container and rebuilds from scratch,
# so the latest /data and /src code is always what gets served.

set -e

cd "$(dirname "$0")"

# ---------- Docker daemon ----------
echo "🐳 Checking Docker daemon..."

if ! docker info > /dev/null 2>&1; then
  echo "Opening Docker Desktop..."
  open -a Docker

  echo "Waiting for Docker daemon to start..."
  while ! docker info > /dev/null 2>&1; do
    sleep 1
  done
fi
echo "✅ Docker daemon is ready"

# ---------- pick compose command ----------
if docker compose version > /dev/null 2>&1; then
  COMPOSE="docker compose"
else
  COMPOSE="docker-compose"
fi

# ---------- wipe previous install ----------
echo "🧹 Removing previous AHgochi container, image and volumes..."
$COMPOSE down --rmi local --volumes --remove-orphans > /dev/null 2>&1 || true

# ---------- fresh build (no cache) ----------
echo "🔨 Building AHgochi from scratch (no cache)..."
$COMPOSE build --no-cache --pull

# ---------- run ----------
echo "🐳 Starting AHgochi..."
$COMPOSE up --force-recreate &
COMPOSE_PID=$!

# ---------- wait for port 3000 ----------
echo "⏳ Waiting for http://localhost:3000 ..."
while ! nc -z localhost 3000 2>/dev/null; do
  if ! kill -0 "$COMPOSE_PID" 2>/dev/null; then
    echo "❌ docker compose exited before the service was reachable."
    exit 1
  fi
  sleep 1
done

# ---------- open browser ----------
sleep 1
echo "🌐 Opening http://localhost:3000 ..."
open "http://localhost:3000"

echo "✅ AHgochi is running on http://localhost:3000 (Ctrl+C to stop)"

wait "$COMPOSE_PID"

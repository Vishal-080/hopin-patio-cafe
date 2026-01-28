#!/bin/bash

echo "🚀 Starting Cafe Management System Development Environment"

if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop first."
    echo "   On macOS: Open Docker Desktop from Applications folder"
    echo "   On Linux: sudo systemctl start docker"
    exit 1
fi

echo "✅ Docker is running"

echo "🔧 Starting development services..."

docker-compose up -d mongodb redis

echo "⏳ Waiting for databases to be ready..."
sleep 10

docker-compose up -d backend

echo "⏳ Waiting for backend to be ready..."
sleep 15

docker-compose up -d frontend

echo "✅ All services started!"
echo ""
echo "🌐 Services are available at:"
echo "   Frontend: http://localhost:5173"
echo "   Backend API: http://localhost:3001"
echo "   MongoDB: mongodb://localhost:27017"
echo "   Redis: redis://localhost:6379"
echo ""
echo "📋 Useful commands:"
echo "   View logs: docker-compose logs [service-name]"
echo "   Stop services: docker-compose down"
echo "   Rebuild: docker-compose up --build"
echo ""
echo "🔍 Health checks:"
echo "   Backend health: curl http://localhost:3001/health"
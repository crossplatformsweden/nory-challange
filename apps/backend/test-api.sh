#!/bin/bash
echo "============================================="
echo "Testing API Endpoints"
echo "============================================="

SERVER_URL="http://localhost:8080"

# Function to test an endpoint and print the result
test_endpoint() {
  local path=$1
  local method=${2:-GET}
  local data=$3
  local description=$4

  echo -e "\n\n🔍 Testing: $description"
  echo "📌 $method $SERVER_URL$path"
  
  if [ "$method" = "GET" ]; then
    curl -s -X $method $SERVER_URL$path | jq '.' || echo "Error: Failed to parse response as JSON"
  else
    if [ -n "$data" ]; then
      echo "📦 Request data: $data"
      curl -s -X $method -H "Content-Type: application/json" -d "$data" $SERVER_URL$path | jq '.' || echo "Error: Failed to parse response as JSON"
    else
      curl -s -X $method $SERVER_URL$path | jq '.' || echo "Error: Failed to parse response as JSON"
    fi
  fi
}

# Test basic API endpoints
echo "============================================="
echo "1. Testing Basic API Information"
echo "============================================="
test_endpoint "/openapi" "GET" "" "Fetch OpenAPI Specification"

echo "============================================="
echo "2. Testing Location API Endpoints"
echo "============================================="
test_endpoint "/api/v1/locations" "GET" "" "List all locations"
test_endpoint "/api/v1/locations/location-1" "GET" "" "Get location details"

echo "============================================="
echo "3. Testing Ingredients API Endpoints"
echo "============================================="
test_endpoint "/api/v1/ingredients" "GET" "" "List all ingredients"
test_endpoint "/api/v1/ingredients/ingredient-1" "GET" "" "Get ingredient details"

echo "============================================="
echo "4. Testing Recipes API Endpoints"
echo "============================================="
test_endpoint "/api/v1/recipes" "GET" "" "List all recipes"
test_endpoint "/api/v1/recipes/recipe-1" "GET" "" "Get recipe details"

echo "============================================="
echo "API Tests Completed"
echo "============================================="
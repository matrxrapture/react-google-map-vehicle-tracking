pip install Flask

curl -X POST -H "Content-Type: application/json" -d '{"latitude": 40.7128, "longitude": -74.0060, "bearing": 225, "driver_id": 123}' http://localhost:5000/api/post_location
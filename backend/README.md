# Assessment Backend

## Description
This project uses JSON Server to create a simple REST API from a JSON file.

## Installation
To set up the project, follow these steps:

1. Navigate to the project directory:
   ```bash
   cd backend
   ```

2. Install JSON Server globally:
   ```bash
   npm install -g json-server
   ```

## Usage
To run the project, execute the following command:
```bash
json-server --watch db.json --port 3000
```
Note: The `--watch` option can be omitted as JSON Server 1+ watches for file changes by default.

Once the server is running, you can access the API at:
- [http://localhost:3000/](http://localhost:3000/)

### Endpoints
- [http://localhost:3000/class_profile](http://localhost:3000/class_profile)
- [http://localhost:3000/students](http://localhost:3000/students)



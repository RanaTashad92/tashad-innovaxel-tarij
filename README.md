Innovaxel Take Home Assignment

This is a RESTful API built with Node.js, Express, and MongoDB, allowing users to shorten long URLs, retrieve original URLs, update them, delete them, and get statistics.
Setup Instructions
 1. Clone the Repository:
```bash
git clone https://github.com/RanaTashad92/tashad-innovaxel-tarij.git
cd tashad-innovaxel-tarij

2. Install Dependencies:
npm install

3.Add .env file for Environment variable of mongo db:
DATABASE_URL=mongodb://localhost:27017/urlshortener

4.Run Server:
npm run devStart

5. Routes Endpoints
| Method | Endpoint                        | Description         |
| ------ | ------------------------------- | ------------------- |
| GET    | /urls                           | Get all URLs        |
| POST   | /urls/shorten                   | Create short URL    |
| GET    | /urls/shorten/\:shortCode       | Get original URL    |
| PATCH  | /urls/shorten/\:shortCode       | Update original URL |
| DELETE | /urls/shorten/\:shortCode       | Delete short URL    |
| GET    | /urls/shorten/\:shortCode/stats | Get stats           |

6. Testing:
Tested with VS Code REST Client Extension (RestClientExtension.rest)

Author:
Tashad Tarij Rana
GitHub: RanaTashad92



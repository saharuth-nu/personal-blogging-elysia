# Elysia with Bun runtime

## Getting Started
To get started with this template, simply paste this command into your terminal:
```bash
bun create elysia ./elysia-example
```

## Development
To start the development server run:
```bash
bun run dev
```

## env
```bash
SERVER_PORT="SERVER_PORT"
DB_USERNAME="DB_USERNAME"
DB_PASSWORD="DB_PASSWORD"
DB_HOST="DB_HOST"
DB_PORT="DB_PORT"
DB_DATABASE="DB_DATABASE"
```

Open http://localhost:3000/ with your browser to see the result.

## Detail
Let’s start with a very common one when it comes to backend projects.

This is a RESTful API that would power a personal blog. This implies that you’d have to create a backend API with the following responsibilities:

- Return a list of articles. You can add filters such as publishing date, or tags.
- Return a single article, specified by the ID of the article.
- Create a new article to be published.
- Delete a single article, specified by the ID.
- Update a single article, again, you’d specify the article using its ID.

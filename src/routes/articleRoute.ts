import Elysia from "elysia";
import { t } from "elysia";
import ArticleController from "../controllers/articleController";

const articleController = new ArticleController();

export const articleRoute = (app: Elysia) => {

  app.get('/', async ({ query, set }) => {
    console.log("date: ", query.date)
    console.log("tags: ", query.tags)

    let result = await articleController.getArticlesByFilter(query.date, query.tags);
    if (result.error !== null){
      set.status = 500
      return {
        error: true,
        message: result.error,
        data: null,
      }
    }

    return {
      error: false,
      message: '',
      data: result.data,
    }
  });

  app.post('/', async ({ body, set }) => {
    console.log(body)
    let result = await articleController.createArticle(body);

    if (result.error !== null){
      set.status = 500
      return {
        error: true,
        message: result.error,
        data: null,
      }
    }

    return {
      error: false,
      message: "Create Article Success!!",
      data: result.data,
    }

  }, { body: t.Object({ title: t.String(), content: t.String(), tags: t.Array(t.String()) })} );

  app.delete('/:id', async ({ params: {id}, set }) => {
    console.log(id)
    let result = await articleController.deleteArticle(id);

    if (result.error !== null){
      set.status = 500
      return {
        error: true,
        message: result.error,
        data: null,
      }
    }

    return {
      error: false,
      message: "Delete Article Success!!",
      data: result.data,
    }
  })

  app.get('/:id', async ({ params: {id}, set }) => {
    console.log(id)
    let result = await articleController.getArticleById(id);

    if (result.error !== null){
      set.status = 500
      return {
        error: true,
        message: result.error,
        data: null,
      }
    }

    if (result.data === null){
      set.status = 404
      return {
        error: true,
        message: "Data Not Found!!",
        data: result.data,
      }
    }

    return {
      error: false,
      message: "Get Article Success!!",
      data: result.data,
    }
  })

  app.put('/:id', async ({ params: {id}, set, body }) => {
    console.log(id)
    console.log(body)
    let result = await articleController.updateArticle(id, body);

    if (result.error !== null){
      set.status = result.status
      return {
        error: true,
        message: result.error,
        data: null,
      }
    }

    return {
      error: false,
      message: "Update Article Success!!",
      data: result.data,
    }
  }, { body: t.Object({ title: t.String(), content: t.String(), tags: t.Array(t.String()) })} )

  return app;
}

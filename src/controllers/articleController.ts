import Article from "../models/Article";

class ArticleController {
  /**
  * CRUD operations for the articles collection
  */

  public async getArticlesByFilter(date_timestamp?: any, tags?: any) {
    try {
      const filter: any = {};
      if (date_timestamp) {
        filter.createdAt = { $gte: new Date(date_timestamp) };
      }
      if (tags && tags.length > 0) {
        filter.tags = { $all: tags.split(',').map((tag: string) => tag.trim()) };
      }
      console.log(filter)
      let data = await Article.find(filter)
      return {
        error: null,
        data: data
      };
    } catch (error) {
      console.error("Error fetching articles:", error);
      return {
        error: error instanceof Error ? error.message : JSON.stringify(error),
        data: []
      };
    }
  }

  public async getArticleById(id: string) {
    try {
      const filter: any = { id: id };
      console.log(filter)
      let data = await Article.findOne(filter)
      return {
        error: null,
        data: data
      };
    } catch (error) {
      console.error("Error fetching articles:", error);
      return {
        error: error instanceof Error ? error.message : JSON.stringify(error),
        data: []
      };
    }
  }

  public async createArticle(data: any) {
    try {
      const newArticle = new Article(data);
      await newArticle.save();
      return {
        error: null,
        data: []
      };
    } catch (error) {
      console.error("Error creating article:", error);
      return {
        error: error instanceof Error ? error.message : JSON.stringify(error),
        data: []
      };
    }
  }

  public async deleteArticle(id: string) {
    try {
      const deletedArticle = await Article.findOneAndDelete({ id: id });

      if (!deletedArticle) {
        return {
          error: "Article not found",
          data: []
        };
      }

      return {
        error: null,
        data: [deletedArticle] // ส่งข้อมูลบทความที่ถูกลบกลับไป
      };
    } catch (error) {
      console.error("Error deleting article:", error);
      return {
        error: error instanceof Error ? error.message : JSON.stringify(error),
        data: []
      };
    }
  }

  public async updateArticle(id: string, data: any) {
    try {
      let result = await Article.findOneAndUpdate(
        { id: id }, data
      )
      if (result === null){
        return {
          error: 'Article is not Found!!',
          data: null,
          status: 404
        };
      }

      return {
        error: null,
        data: null,
        status: 200
      };
    } catch (error) {
      console.error("Error updating article:", error);
      return {
        error: error instanceof Error ? error.message : JSON.stringify(error),
        data: [],
        status: 500
      };
    }
  }

}

export default ArticleController;

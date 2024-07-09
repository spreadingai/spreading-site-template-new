class CategoryController {
  static _instance: CategoryController;
  static getInstance() {
    return (
      CategoryController._instance ||
      (CategoryController._instance = new CategoryController())
    );
  }
}

export default CategoryController.getInstance();

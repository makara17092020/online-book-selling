import Category, { ICategory } from "@/models/category";

class CategoryService {
  // Get all categories
  static async getAll() {
    try {
      const categories = await Category.find();
      return {
        status: 200,
        success: true,
        message: "Categories fetched successfully",
        data: categories,
      };
    } catch (err: any) {
      return {
        status: 500,
        success: false,
        message: err.message || "Failed to fetch categories",
      };
    }
  }

  // Get category by ID
  static async getById(id: string) {
    try {
      const category = await Category.findById(id);
      if (!category) {
        return {
          status: 404,
          success: false,
          message: "Category not found",
        };
      }
      return {
        status: 200,
        success: true,
        message: "Category fetched successfully",
        data: category,
      };
    } catch (err: any) {
      return {
        status: 500,
        success: false,
        message: err.message || "Failed to fetch category",
      };
    }
  }

  // Create new category
  static async createCategory(name: string) {
    try {
      if (!name) {
        return {
          status: 400,
          success: false,
          message: "Name is required",
        };
      }

      const category = new Category({ name });
      await category.save();

      return {
        status: 201,
        success: true,
        message: "Category created successfully",
        data: category,
      };
    } catch (err: any) {
      return {
        status: 500,
        success: false,
        message: err.message || "Failed to create category",
      };
    }
  }

  // Update category
  static async updateCategory(id: string, name: string) {
    try {
      if (!name) {
        return {
          status: 400,
          success: false,
          message: "Name is required",
        };
      }

      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { name },
        { new: true }
      );

      if (!updatedCategory) {
        return {
          status: 404,
          success: false,
          message: "Category not found",
        };
      }

      return {
        status: 200,
        success: true,
        message: "Category updated successfully",
        data: updatedCategory,
      };
    } catch (err: any) {
      return {
        status: 500,
        success: false,
        message: err.message || "Failed to update category",
      };
    }
  }

  // Delete category
  static async deleteCategory(id: string) {
    try {
      const deletedCategory = await Category.findByIdAndDelete(id);

      if (!deletedCategory) {
        return {
          status: 404,
          success: false,
          message: "Category not found",
        };
      }

      return {
        status: 200,
        success: true,
        message: "Category deleted successfully",
      };
    } catch (err: any) {
      return {
        status: 500,
        success: false,
        message: err.message || "Failed to delete category",
      };
    }
  }
}

export default CategoryService;

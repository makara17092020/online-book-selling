import { CartItem, ICartItem } from "@/models/cartItem";

class CartItemService {
  // Get all cart items
  static async getAll() {
    try {
      const items = await CartItem.find().populate("cartId").populate("bookId");
      return {
        status: 200,
        success: true,
        message: "Cart items fetched successfully",
        data: items,
      };
    } catch (err: any) {
      return {
        status: 500,
        success: false,
        message: err.message || "Failed to fetch cart items",
      };
    }
  }

  // Get a single cart item by ID
  static async getById(id: string) {
    try {
      const item = await CartItem.findById(id).populate("cartId").populate("bookId");
      if (!item) {
        return {
          status: 404,
          success: false,
          message: "Cart item not found",
        };
      }
      return {
        status: 200,
        success: true,
        message: "Cart item fetched successfully",
        data: item,
      };
    } catch (err: any) {
      return {
        status: 500,
        success: false,
        message: err.message || "Failed to fetch cart item",
      };
    }
  }

  // Create new cart item
  static async create(data: Partial<ICartItem>) {
    try {
      const { cartId, bookId, quantity, sellPrice } = data;

      if (!cartId || !bookId || !quantity || !sellPrice) {
        return {
          status: 400,
          success: false,
          message: "Missing required fields (cartId, bookId, quantity, sellPrice)",
        };
      }

      const totalPrice = quantity * sellPrice;
      const newItem = new CartItem({ cartId, bookId, quantity, sellPrice, totalPrice });
      await newItem.save();

      return {
        status: 201,
        success: true,
        message: "Cart item created successfully",
        data: newItem,
      };
    } catch (err: any) {
      return {
        status: 500,
        success: false,
        message: err.message || "Failed to create cart item",
      };
    }
  }

  // Update cart item
  static async update(id: string, data: Partial<ICartItem>) {
    try {
      const { quantity, sellPrice } = data;
      const totalPrice = quantity && sellPrice ? quantity * sellPrice : undefined;

      const updatedItem = await CartItem.findByIdAndUpdate(
        id,
        { ...data, ...(totalPrice && { totalPrice }) },
        { new: true }
      );

      if (!updatedItem) {
        return {
          status: 404,
          success: false,
          message: "Cart item not found",
        };
      }

      return {
        status: 200,
        success: true,
        message: "Cart item updated successfully",
        data: updatedItem,
      };
    } catch (err: any) {
      return {
        status: 500,
        success: false,
        message: err.message || "Failed to update cart item",
      };
    }
  }

  // Delete cart item
  static async delete(id: string) {
    try {
      const deletedItem = await CartItem.findByIdAndDelete(id);

      if (!deletedItem) {
        return {
          status: 404,
          success: false,
          message: "Cart item not found",
        };
      }

      return {
        status: 200,
        success: true,
        message: "Cart item deleted successfully",
      };
    } catch (err: any) {
      return {
        status: 500,
        success: false,
        message: err.message || "Failed to delete cart item",
      };
    }
  }
}

export default CartItemService;

import { ProductRequestDTO } from "../dto";

export function quantityVerification(data: ProductRequestDTO) {
  if (data.quantity <= data.minQuantity) {
    throw new Error("Quantity cannot be negative");
  }
}
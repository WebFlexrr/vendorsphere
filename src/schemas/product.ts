import { z } from "zod"
 
const productSchema = z.object({
  name: z.string().min(2).max(50),
  category:z.string().min(2).max(50),
  vendor:z.string().min(2).max(50),
  price:z.string(),
  stock:z.string()
})
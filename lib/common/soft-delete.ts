import { toast } from "sonner";
import { onSoftActionProps } from "@/interface/props";

export async function handleSoftDelete<T>({item, onSoftDelete, onDeleteResult}: onSoftActionProps<T>) {
  if (item === undefined || !onSoftDelete) return;

  try {
    const result = await onSoftDelete(item);
    onDeleteResult?.(result);
  } catch {
    const fallback = {
      error: "เกิดข้อผิดพลาดในการลบข้อมูล",
      description: "โปรดลองอีกครั้งหรือติดต่อผู้ดูแลระบบ",
    };
    toast.error(fallback.error);
    onDeleteResult?.(fallback);
  }
}

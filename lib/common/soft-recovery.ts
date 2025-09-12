import { onSoftActionProps } from "@/interface/props";
import { toast } from "sonner";

export async function handleSoftRecovery<T>({item, onSoftRecovery, onDeleteResult}: onSoftActionProps<T>) {
  if (item === undefined || !onSoftRecovery) return;

  try {
    const result = await onSoftRecovery(item);
    onDeleteResult?.(result);
  } catch {
    const fallback = {
      error: "เกิดข้อผิดพลาดในการกู้คืนข้อมูล",
      description: "โปรดลองอีกครั้งหรือติดต่อผู้ดูแลระบบ",
    };
    toast.error(fallback.error);
    onDeleteResult?.(fallback);
  }
}
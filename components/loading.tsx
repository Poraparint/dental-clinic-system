import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PuffLoader } from "react-spinners";

export const Loading = () => {
  return (
    <Card className="justify-center items-center col-span-full shadow-none border-none w-full h-full">
      <CardHeader className="w-full">
        <div className="flex flex-col items-center gap-5">
          <PuffLoader size={120} color="#8072c2" />
          <CardTitle>กำลังโหลด...</CardTitle>
          <CardDescription>
            การโหลดอาจใช้เวลานานขึ้นอยู่กับจำนวนข้อมูล
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
};

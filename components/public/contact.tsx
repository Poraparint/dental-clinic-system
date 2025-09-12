import Image from "next/image";
import { Card } from "@/components/ui/card";

export const Contact = () => {
  return (
    <div className="container md:flex gap-5 max-md:space-y-6">
      <div className="md:w-2/4 flex md:justify-start justify-center">
        <Image
          src="/toothpaste.jpeg"
          height={400}
          width={400}
          alt="Dental-chair"
          className="rounded-xl"
        />
      </div>

      <div className="space-y-6 md:w-2/4">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <div className="w-12 h-1 bg-primary mb-6"></div>
          <p className="text-muted-foreground max-w-2xl">
            สนใจเปลี่ยนแปลงคลินิกของคุณให้ดีขึ้นหรือไม่?
            ติดต่อเราเพื่อเรียนรู้เพิ่มเติมเกี่ยวกับวิธีที่ระบบของเราจะช่วยคุณได้
          </p>
        </div>
        <Card>Poraparint@gmail.com</Card>
      </div>
    </div>
  );
};

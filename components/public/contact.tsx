import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Image from "next/image";

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
        <form>
          <div className="space-y-4">
            <div>
              <Label htmlFor="companyName">ชื่อคลินิก</Label>
              <Input
                id="companyName"
                name="companyName"
                placeholder="Your dental clinic name"
                required
              />
            </div>

            <div>
              <Label htmlFor="customerName">ชื่อ-นามสกุล</Label>
              <Input
                id="customerName"
                name="customerName"
                placeholder="Full name"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">เบอร์ติดต่อ</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Contact number"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">ที่อยู่อีเมล</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Your email"
                required
              />
            </div>

            <div>
              <Label htmlFor="message">ส่งคำสอบถาม</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell us about your practice and requirements"
                rows={4}
              />
            </div>

            <Button type="submit" className="w-full">
              Submit Inquiry
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

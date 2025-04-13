import Image from "next/image";
import Link from "next/link";
import { Facebook } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="p-5 border-t max-md:hidden">
      <div className="flex justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Image
              src="/favicon.ico"
              height={45}
              width={45}
              alt="Dental-clinic-system"
            />
            <div className="flex flex-col text-xl font-bold tracking-wide">
              <span>DentalClinic</span>
              <span className="text-muted-foreground">ManagementSystem</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Empowering dental professionals with modern practice management
            solutions since 2020.
          </p>
        </div>
        <div className="gap-10 flex">
          <div>
            <h4 className="font-medium mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground hover:text-foreground">
                Home
              </li>
              <li className="text-muted-foreground hover:text-foreground">
                Features
              </li>
              <li className="text-muted-foreground hover:text-foreground">
                About
              </li>
              <li className="text-muted-foreground hover:text-foreground">
                Contact
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground hover:text-foreground">
                Privacy Policy
              </li>
              <li className="text-muted-foreground hover:text-foreground">
                Terms of Service
              </li>
              <li className="text-muted-foreground hover:text-foreground">
                HIPAA Compliance
              </li>
              <li className="text-muted-foreground hover:text-foreground">
                Data Security
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Contact (Creator)</h4>
            <address className="text-sm text-muted-foreground not-italic space-y-2">
              <p>123 Dental Avenue</p>
              <p>Suite 456</p>
              <p>Bangkok, 12345</p>
              <p className="pt-2">Email: poraparint@gmail.com</p>
              <p>Phone: (66) 2-123-4567</p>
            </address>
          </div>
        </div>
      </div>

      <div className="border-t mt-8 pt-3 flex md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} DentalCare Pro. All rights reserved.
        </p>
          <Link
            target="blank"
            href="https://www.facebook.com/poraparin.phakdeephoomin/?locale=th_TH"
          >
            <Facebook />
          </Link>
          
      </div>
    </footer>
  );
};

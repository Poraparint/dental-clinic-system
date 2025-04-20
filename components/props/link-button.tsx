import { Button } from "@/components/ui/button";
import Link from "next/link";

interface LinkButtonProps { 
    icon: React.ReactNode;
    title: string;
    url: string;
 }

export const LinkButton = ({
    icon,
    title,
    url
}: LinkButtonProps) => {
    return (
        <Button asChild size="lg">
            <Link href={url}>
                {icon}
                {title}
            </Link>
        </Button>
    )
}
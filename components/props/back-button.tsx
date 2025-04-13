"use client"

import { Button } from "../ui/button";
import Link from "next/link";

interface BackButtonProps{
    href: string;
    label: string;
}

export const BackButton = ({href, label, }: BackButtonProps) => {
    return (
        <Button variant="link" asChild className="justify-self-start text-lapis-accent pl-0">
            <Link href={href}>
                {label}
            </Link>
        </Button>
    )
}
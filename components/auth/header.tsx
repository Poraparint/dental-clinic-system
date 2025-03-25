interface HeaderProps{
    label: string;
}

export const Header = ({
    label,
}: HeaderProps) => {
    return (
        <div>
            <p>
                {label}
            </p>
        </div>
    )
}
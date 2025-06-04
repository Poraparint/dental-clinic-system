interface HeaderProps{
    label: string;
    description?: string;
}

export const Header = ({
    label, description
}: HeaderProps) => {
    return (
      <div className="flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold tracking-tight">{label}</h1>
          <p className="text-muted-foreground text-base">{description}</p>
      </div>
    );
}
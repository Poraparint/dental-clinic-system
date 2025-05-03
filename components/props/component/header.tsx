interface HeaderProps{
    label: string;
    description?: string;
}

export const Header = ({
    label, description
}: HeaderProps) => {
    return (
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{label}</h1>
          <p className="text-muted-foreground text-lg">{description}</p>
      </div>
    );
}
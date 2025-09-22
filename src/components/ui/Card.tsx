import { PropsWithChildren } from "react";

type CardProps = PropsWithChildren<{
  premium?: boolean;
  className?: string;
}>;

export function Card({ children, premium = false, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-md bg-midnight border border-charcoal shadow-depth grain ${
        premium ? "[box-shadow:var(--shadow-depth),inset_0_0_0_1px_rgba(212,175,55,0.3)]" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children }: PropsWithChildren) {
  return <div className="px-6 pt-5 pb-2">{children}</div>;
}

export function CardContent({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
}

export function CardFooter({ children }: PropsWithChildren) {
  return <div className="px-6 pt-2 pb-5">{children}</div>;
}



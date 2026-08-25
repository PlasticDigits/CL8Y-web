import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";

type ExternalLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "rel" | "target"> & {
  href: string;
  children: ReactNode;
};

/**
 * First-party and third-party exits. Always new-tab + noopener noreferrer.
 * Pass a constant href (see `PRODUCT_URLS` / `links.ts`); never a query param.
 */
export const ExternalLink = forwardRef<HTMLAnchorElement, ExternalLinkProps>(
  function ExternalLink({ href, children, className, ...rest }, ref) {
    return (
      <a ref={ref} href={href} target="_blank" rel="noopener noreferrer" className={className} {...rest}>
        {children}
      </a>
    );
  },
);

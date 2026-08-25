/**
 * Social and audit links used by chrome and community.
 *
 * Official addresses, listings, and DEX venues live in
 * `src/data/tokenDirectory.ts` (GitLab #2). Do not add CEX trade rows here.
 *
 * @see src/data/tokenDirectory.ts
 * @see skills/cl8y-token-directory/SKILL.md
 */

export type LinkCategory = "social" | "audit";

export type LucideIconName = "MessageCircle" | "Twitter" | "ShieldCheck";

export type LucideIcon = {
  kind: "lucide";
  name: LucideIconName;
};

export type LinkIcon = LucideIcon;

export interface LinkItem {
  id: string;
  label: string;
  href: string;
  category: LinkCategory;
  icon: LinkIcon;
  isExternal?: boolean;
}

export const links: LinkItem[] = [
  {
    id: "telegram",
    label: "Telegram",
    href: "https://t.me/ceramictoken",
    category: "social",
    icon: { kind: "lucide", name: "MessageCircle" },
    isExternal: true,
  },
  {
    id: "twitter",
    label: "X (Twitter)",
    href: "https://x.com/ceramictoken",
    category: "social",
    icon: { kind: "lucide", name: "Twitter" },
    isExternal: true,
  },
  {
    id: "spywolf-audit",
    label: "Audit (SpyWolf)",
    href: "https://spywolf.co/audits/CL8Y_0x999311589cc1Ed0065AD9eD9702cB593FFc62ddF.pdf",
    category: "audit",
    icon: { kind: "lucide", name: "ShieldCheck" },
    isExternal: true,
  },
];

export const linksByCategory: Record<LinkCategory, LinkItem[]> = links.reduce(
  (acc, link) => {
    acc[link.category].push(link);
    return acc;
  },
  { social: [], audit: [] } as Record<LinkCategory, LinkItem[]>,
);

export type { LinkItem as Cl8yLinkItem };

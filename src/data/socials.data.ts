export interface SocialLink {
  id: number;
  label: string;
  href: string;
  icon: string;
}

export const socialData: SocialLink[] = [
  {
    id: 1,
    label: "GitHub",
    href: "https://github.com/Hamid6426",
    icon: "github",
  },
  {
    id: 2,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/Hamid6426",
    icon: "linkedin",
  },
  {
    id: 3,
    label: "Email",
    href: "mailto:mianhamid6426@gmail.com",
    icon: "mail",
  },
];

export interface CertificationItem {
  id: number;
  title: string;
  issuer: string;
  issuedAt: string;
  url?: string;
}

export const certificationsData: CertificationItem[] = [
  {
    id: 1,
    title: "Front-End Developer Certification",
    issuer: "IBM (Coursera)",
    issuedAt: "September 2026",
  },
  {
    id: 2,
    title: "Back-End Development Certification",
    issuer: "freeCodeCamp",
    issuedAt: "July 2024",
  },
  {
    id: 3,
    title: "Relational Database Certification",
    issuer: "freeCodeCamp",
    issuedAt: "June 2024",
  },
  {
    id: 4,
    title: "JavaScript Certification",
    issuer: "freeCodeCamp",
    issuedAt: "May 2024",
  },
];

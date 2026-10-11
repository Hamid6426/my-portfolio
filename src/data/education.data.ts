export interface EducationItem {
  id: number;
  degree: string;
  title: string;
  institution: string;
  graduation?: string;
}

export const educationData: EducationItem[] = [
  {
    id: 1,
    degree: "BS",
    title: "Mechanical Engineering",
    institution: "University of Engineering and Technology, Peshawar",
    graduation: "April 2025",
  },
  {
    id: 2,
    degree: "HSSC",
    title: "Pre-Engineering",
    institution: "The Peace School and College, Hakimabad, Nowshera",
    graduation: "June 2019",
  },
  {
    id: 3,
    degree: "SSC",
    title: "Science",
    institution: "Jamal English Education Academy, Pabbi, Nowshera",
    graduation: "April 2017",
  },
];

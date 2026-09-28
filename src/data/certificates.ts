import type { CertificateGroup } from "./types";

import BateyHackathon from "../../public/achievement/CERT_ZENITH.jpg";
import AWSCert1 from "../../public/achievement/Cert_1_AWS Skill Builder Course Completion Certificate_page-0001.jpg";
import AWSCert2 from "../../public/achievement/Cert_2_AWS Skill Builder Course Completion Certificate_page-0001.jpg";
import AWSCert3 from "../../public/achievement/Cert_3_AWS Skill Builder Course Completion Certificate_page-0001.jpg";
import AWSCert4 from "../../public/achievement/Cert_4_AWS Skill Builder Course Completion Certificate_page-0001.jpg";
import AWSCert5 from "../../public/achievement/Cert_5_AWS Skill Builder Course Completion Certificate_page-0001.jpg";
import SCSAWSCERT from "../../public/achievement/SCS AWS Certificate.jpeg";
import LICert1 from "../../public/achievement/linkedin-certificates/Learning Linkedin.jpeg";
import LICert2 from "../../public/achievement/linkedin-certificates/HTML.jpeg";
import LICert3 from "../../public/achievement/linkedin-certificates/React.jpeg";
import LICert4 from "../../public/achievement/linkedin-certificates/Illustrator.jpeg";
import LICert5 from "../../public/achievement/linkedin-certificates/Tinkercad.jpeg";
import EdusaveAcadAchievement from "../../public/achievement/Edusave Acad Achievement.png";
import EdusaveGPA from "../../public/achievement/Edusave GPA.png";
import MeritBursary from "../../public/achievement/MERIT BURSARY.png";
import YeaAward from "../../public/achievement/YEA Award.png";
import CvssGpaAward from "../../public/achievement/CVSS GPA Award.png";
import OnNLevel from "../../public/achievement/O and N Level Certificate.png";
import JavaScriptCert1 from "../../public/achievement/linkedin-certificates/JavaScript1.jpg";
import JavaScriptCert2 from "../../public/achievement/linkedin-certificates/JavaScript2.jpg";
import JavaScriptCert3 from "../../public/achievement/linkedin-certificates/JavaScript3.jpg";
import GithubCert1 from "../../public/achievement/linkedin-certificates/Github1.jpeg";
import GithubCert2 from "../../public/achievement/linkedin-certificates/Github2.jpeg";
import GithubCert3 from "../../public/achievement/linkedin-certificates/Github3.jpeg";
import GithubCert4 from "../../public/achievement/linkedin-certificates/Github4.jpeg";
import GithubCert5 from "../../public/achievement/linkedin-certificates/Github5.jpeg";
import Robocup from "../../public/achievement/Robocup.png";
import SoloLearnHTML from "../../public/achievement/SoloLearn HTML.jpg";
import SoloLearnCSS from "../../public/achievement/SoloLearn CSS.jpg";

export const certificateGroups: CertificateGroup[] = [
  {
    id: "aws",
    issuerGroup: "AWS / SCS",
    items: [
      {
        title: "Introduction to Generative AI: Art of the Possible",
        issuer: "Amazon Web Services (AWS)",
        description: "1 of 5 generative AI courses.",
        image: AWSCert1,
      },
      {
        title: "Planning a Generative AI Project",
        issuer: "Amazon Web Services (AWS)",
        description: "1 of 5 generative AI courses.",
        image: AWSCert2,
      },
      {
        title: "Responsible Artificial Intelligence Practices",
        issuer: "Amazon Web Services (AWS)",
        description: "1 of 5 generative AI courses.",
        image: AWSCert3,
      },
      {
        title: "Foundations of Prompt Engineering",
        issuer: "Amazon Web Services (AWS)",
        description: "1 of 5 generative AI courses.",
        image: AWSCert4,
      },
      {
        title: "No-code Learning and Generative AI on AWS",
        issuer: "Amazon Web Services (AWS)",
        description: "1 of 5 generative AI courses.",
        image: AWSCert5,
      },
      {
        title: "SCS-AWS GenAI (Foundational) Programme",
        issuer: "AWS, Singapore Computer Society",
        description: "Programme completion.",
        image: SCSAWSCERT,
      },
    ],
  },
  {
    id: "github",
    issuerGroup: "GitHub",
    items: [
      {
        title: "Career Essentials in GitHub Professional Certificate",
        issuer: "LinkedIn Learning",
        description: "4 of 4 GitHub courses completed.",
        image: GithubCert5,
      },
      {
        title: "Practical GitHub Project Management and Collaboration",
        issuer: "LinkedIn Learning",
        description: "1 of 4 GitHub courses.",
        image: GithubCert1,
      },
      {
        title: "Practical GitHub Copilot",
        issuer: "LinkedIn Learning",
        description: "1 of 4 GitHub courses.",
        image: GithubCert2,
      },
      {
        title: "Practical GitHub Code Search",
        issuer: "LinkedIn Learning",
        description: "1 of 4 GitHub courses.",
        image: GithubCert3,
      },
      {
        title: "Practical GitHub Actions",
        issuer: "LinkedIn Learning",
        description: "1 of 4 GitHub courses.",
        image: GithubCert4,
      },
    ],
  },
  {
    id: "linkedin",
    issuerGroup: "LinkedIn Learning",
    items: [
      {
        title: "Learning LinkedIn for Students",
        issuer: "LinkedIn Learning",
        description: "Course completion.",
        image: LICert1,
      },
      {
        title: "HTML Essential Training",
        issuer: "LinkedIn Learning",
        description: "Course completion.",
        image: LICert2,
      },
      {
        title: "React.js Essential Training",
        issuer: "LinkedIn Learning",
        description: "Course completion.",
        image: LICert3,
      },
      {
        title: "Illustrator 2021 Training",
        issuer: "LinkedIn Learning",
        description: "Course completion.",
        image: LICert4,
      },
      {
        title: "Learning Tinkercad",
        issuer: "LinkedIn Learning",
        description: "Course completion.",
        image: LICert5,
      },
    ],
  },
  {
    id: "mozilla",
    issuerGroup: "Mozilla",
    items: [
      {
        title: "JavaScript Foundations Professional Certificate",
        issuer: "LinkedIn Learning",
        description: "2 of 2 Mozilla courses completed.",
        image: JavaScriptCert3,
      },
      {
        title: "JavaScript Essential Training",
        issuer: "LinkedIn Learning",
        description: "1 of 2 Mozilla courses.",
        image: JavaScriptCert1,
      },
      {
        title: "Learning the JavaScript Language",
        issuer: "LinkedIn Learning",
        description: "1 of 2 Mozilla courses.",
        image: JavaScriptCert2,
      },
    ],
  },
  {
    id: "sololearn",
    issuerGroup: "SoloLearn",
    items: [
      {
        title: "Introduction to HTML",
        issuer: "SoloLearn",
        description: "Theory and practical assessment.",
        image: SoloLearnHTML,
      },
      {
        title: "Introduction to CSS",
        issuer: "SoloLearn",
        description: "Theory and practical assessment.",
        image: SoloLearnCSS,
      },
    ],
  },
  {
    id: "batey",
    issuerGroup: "SP Batey Hackathon",
    items: [
      {
        title: "Batey Hackathon Grand Finalist",
        issuer: "Singapore Polytechnic",
        description: "Frésko reached the grand finals, September 2024.",
        image: BateyHackathon,
      },
    ],
  },
  {
    id: "robocup",
    issuerGroup: "RoboCup 2025",
    items: [
      {
        title: "Certificate of Recognition",
        issuer: "RoboCup Singapore",
        description: "For volunteering at RoboCup 2025.",
        image: Robocup,
      },
    ],
  },
  {
    id: "school",
    issuerGroup: "Compassvale Secondary",
    items: [
      {
        title: "Edusave Certificate of Academic Achievement 2022",
        issuer: "Ministry of Education, People's Association",
        description: "Good academic performance and conduct.",
        image: EdusaveAcadAchievement,
      },
      {
        title: "Edusave Good Progress Award 2022",
        issuer: "Ministry of Education, People's Association",
        description: "Improvement in academic performance and conduct.",
        image: EdusaveGPA,
      },
      {
        title: "Edusave Merit Bursary 2022",
        issuer: "Ministry of Education, People's Association",
        description: "Good academic progress and conduct.",
        image: MeritBursary,
      },
      {
        title: "YEA Award 2022",
        issuer: "Ministry of Education, People's Association",
        description:
          "Completed the Young Engineer Award requirements. Officially recognised Young Engineer.",
        image: YeaAward,
      },
      {
        title: "CVSS GPA Award 2022",
        issuer: "Ministry of Education, People's Association",
        description:
          "Academic improvement in the 2022 preliminary examinations.",
        image: CvssGpaAward,
      },
      {
        title: "O and N Level Certificate 2022",
        issuer: "Ministry of Education, SEAB",
        description: "GCE O-Level 2022 and N-Level 2021.",
        image: OnNLevel,
      },
    ],
  },
];

export const allCertificates = certificateGroups.flatMap((g) => g.items);

export const publicationsData = [
  {
    id: "pub-01",
    status: "published",
    statusLabel: "PUBLISHED - PEER REVIEWED",
    date: "MAY 29, 2026",
    title: "ARGUS: The AI Eye for CERN - Solving Extreme Computational Physics",
    authors: [
      { name: "Nihal Gazi", isMe: true },
      { name: "Aditya K. Biswas" },
      { name: "Aihik Basu" },
      { name: "Anirban Chattopadhyay" },
      { name: "Sayan Pratihar" }
    ],
    publisher: "EPJ Web of Conferences (Volume 370, 2026)",
    conference: "International Conference on Advanced Physics (IEMPHYS-26)",
    scope: "High-performance physics computation & sparse vision transformer models (FLES)",
    actions: [
      {
        label: "View on EPJ ↗",
        url: "https://doi.org/10.1051/epjconf/202637001032"
      },
      {
        label: "Download PDF",
        url: "https://www.epj-conferences.org/articles/epjconf/pdf/2026/26/epjconf_iemphys-26_01032.pdf",
        isSecondary: true
      }
    ]
  },
  {
    id: "pub-02",
    status: "accepted",
    statusLabel: "ACCEPTED / IN PRESS",
    date: "FORTHCOMING",
    title: "Native Binarization: Preventing Collapse in 1-Bit Diffusion",
    authors: [
      { name: "Nihal Gazi", isMe: true }
    ],
    publisher: "Accepted for Top 10 Best Poster Presentation",
    conference: "Spectrum 2026 International Conference",
    scope: "Binarized weights & stabilization algorithms for edge diffusion models"
  }
];

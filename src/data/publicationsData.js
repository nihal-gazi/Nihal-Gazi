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
    status: "preprint",
    statusLabel: "PREPRINT / ARXIV",
    date: "SEP 2026",
    title: "A Three-Layer Caching Architecture for Low-Latency LLM Web Search on Commodity CPU Hardware",
    authors: [
      { name: "Ayushman Bhattacharya" },
      { name: "Nihal Gazi", isMe: true }
    ],
    publisher: "arXiv (arXiv:2609.05463 [cs.DC])",
    conference: "PollinationsAI Research",
    scope: "Distributed low-latency LLM web search caching architectures & commodity CPU optimization",
    actions: [
      {
        label: "View on arXiv ↗",
        url: "https://arxiv.org/abs/2609.05463"
      },
      {
        label: "Download PDF",
        url: "https://arxiv.org/pdf/2609.05463",
        isSecondary: true
      }
    ]
  }
];

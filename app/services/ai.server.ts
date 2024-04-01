// node --version # Should be >= 18
// npm install @google/generative-ai

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.GEMINI_API as string;

async function run(input: string) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const parts = [
    {
      text: 'input: Tujuan: Menghasilkan soal dan jawaban quiz dalam bentuk JSON.\nFormat JSON:\n{\n  "soal": "Pertanyaan quiz",\n  "jawaban": [\n    "Jawaban A",\n    "Jawaban B",\n    "Jawaban C",\n    "Jawaban D"\n  ],\n  "jawaban_benar": "Jawaban C"\n}\nInstruksi:\n- Buatlah soal dan jawaban quiz dalam format JSON seperti contoh di atas.\n\n- Jumlah soal dan jawaban bisa bervariasi sesuai kebutuhan.\n\n- Soal dan jawaban quiz bisa dari berbagai macam topik, seperti sejarah, matematika, sains, dan lain sebagainya.\n\n- Gunakan bahasa yang mudah dipahami dan sesuai dengan target audience quiz.\n\n- Pastikan jawaban quiz yang diberikan benar dan akurat\n\n.',
    },
    {
      text: 'output: [\n  {\n    "soal": "Kapan proklamasi kemerdekaan Indonesia dibacakan?",\n    "jawaban": [\n      "17 Agustus 1945",\n      "17 September 1945",\n      "17 Oktober 1945",\n      "17 November 1945"\n    ],\n    "jawaban_benar": "17 Agustus 1945"\n  },\n  {\n    "soal": "Siapa presiden pertama Indonesia?",\n    "jawaban": [\n      "Soekarno",\n      "Soeharto",\n      "B.J. Habibie",\n      "Abdurrahman Wahid"\n    ],\n    "jawaban_benar": "Soekarno"\n  },\n  {\n    "soal": "Apa nama organisasi pemuda yang mempelopori Sumpah Pemuda?",\n    "jawaban": [\n      "Budi Utomo",\n      "Sarekat Islam",\n      "Partai Komunis Indonesia",\n      "Kongres Pemuda"\n    ],\n    "jawaban_benar": "Kongres Pemuda"\n  }\n]',
    },
    { text: `input: Buatlah quiz ${input}` },
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  const response = result.response;
  console.log(response.text());
}

generateQuiz("matematika kelas 2 sd 10 soal");

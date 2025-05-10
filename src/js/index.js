/*? no js js needed from me */
async function main() {
    const zodiac = document.getElementById("zodiac").value;
    const prompt = `Buatkan ramalan harian untuk zodiak ${zodiac} dalam bahasa Indonesia. Sertakan aspek keberuntungan, cinta, dan karier. Langsung mulai dengan isi ramalan. tanpa kalimat pembuka.`;
    const api = "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";
    const url = "https://api.groq.com/openai/v1/chat/completions"

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
          Authorization: `Bearer ${api}`,
            "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192", // ganti model
        messages: [
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error response.status:${errorData.error.message}`);
    }

    const data = await response.json();
    document.getElementById("result").textContent = data.choices[0].message.content;
    document.getElementById("judul").textContent = `Ramalan Zodiac ${zodiac}`;
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    document.getElementById("result").textContent = "Terjadi kesalahan saat mengambil ramalan.";
  }
}

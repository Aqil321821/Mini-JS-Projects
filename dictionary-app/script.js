const resultDiv = document.querySelector(".result");
const wordEle = document.querySelector("#word");
const phonetics = document.querySelector(".phonetics");
const audio = document.querySelector("audio");
const searchField = document.querySelector(".search-field");
const wordMeaning = document.querySelector(".word-definition");
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const handle = async (e) => {
  if (e.key === "Enter") {
    const word = e.target.value.trim();

    if (!word) return;

    console.log(word);

    try {
      // Make a request to the API
      const result = await fetch(url + encodeURIComponent(word));

      resultDiv.style.display = "block";

      const data = await result.json();
      console.log(data);

      if (result.ok) {
        document
          .querySelectorAll(".wordmeaning")[0]
          .style.removeProperty("display");

        document
          .querySelectorAll(".wordmeaning")[1]
          .style.removeProperty("display");

        phonetics.style.removeProperty("display");
        audio.style.removeProperty("display");

        wordEle.innerText = data[0].word;

        phonetics.innerText =
          data[0].phonetics?.[0]?.text || "No phonetics available";

        audio.src = data[0].phonetics?.find((p) => p.audio)?.audio || "";

        wordMeaning.innerText = data[0].meanings[0].definitions[0].definition;
        const synonymsArray =
          data[0].meanings?.[0]?.definitions?.[0]?.synonyms || [];

        let synonymsData = "";

        if (synonymsArray.length) {
          for (let i = 0; i < synonymsArray.length; i++) {
            synonymsData += `<p class="pills">${synonymsArray[i]}</p>`;
          }
        } else {
          synonymsData = `<p class="pills">No Synonyms Available</p>`;
        }

        const synonyms = document.querySelector(".synonyms");
        synonyms.innerHTML = synonymsData;
        synonyms.style.removeProperty("display");
      } else {
        audio.style.display = "none";
        wordEle.innerText = data.title || "Error";
        document.querySelectorAll(".wordmeaning")[0].style.display = "none";
        document.querySelectorAll(".wordmeaning")[1].style.display = "none";
        phonetics.style.display = "none";
        wordMeaning.innerText = data.message || "Word not found";
        document.querySelector(".synonyms").style.display = "none";
      }
    } catch (error) {
      console.error("Error fetching word:", error);
      resultDiv.style.display = "block";
      wordEle.innerText = "Something went wrong";
      wordMeaning.innerText =
        "Unable to connect to the dictionary. Please try again.";
      phonetics.style.display = "none";
      audio.style.display = "none";
      document.querySelector(".synonyms").style.display = "none";
    }
  }
};

// events
searchField.addEventListener("keypress", handle);

//
const removeActive = () => {
  const allLessonBtn = document.querySelectorAll(".lesson-btn");
  allLessonBtn.forEach((btn) => btn.classList.remove("active"));
};
const createElement = (synonyms) => {
  const htmlElement = synonyms.map(
    (synonym) => `<span class="btn">${synonym}</span>`,
  );
  return htmlElement.join(" ");
};
const manageSpinner = (status, spinnerId, containerId) => {
  if (status == true) {
    document.getElementById(spinnerId).classList.remove("hidden");
    document.getElementById(containerId).classList.add("hidden");
  } else {
    document.getElementById(spinnerId).classList.add("hidden");
    document.getElementById(containerId).classList.remove("hidden");
  }
};
const loadLesson = async () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  const res = await fetch(url);
  const data = await res.json();
  displayLesson(data.data);
};
const displayLesson = (lessons) => {
  const lessonBtnContainer = document.getElementById("lesson-btn-container");
  lessonBtnContainer.innerHTML = "";
  lessons.forEach((lesson) => {
    const lessonBtn = document.createElement("div");
    lessonBtn.innerHTML = `
        <button onclick="loadWords(${lesson.level_no})" id="lesson-btn-${lesson.level_no}"  class="lesson-btn btn btn-outline btn-primary">Lesson-${lesson.level_no}</button>
    `;
    lessonBtnContainer.append(lessonBtn);
  });
};

const loadWords = async (id) => {
  manageSpinner(true, "loading-spinner", "word-container");
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  const clickBtn = document.getElementById(`lesson-btn-${id}`);
  removeActive();
  clickBtn.classList.add("active");
  displayWords(data.data);
};
const displayWords = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (words.length == 0) {
    wordContainer.innerHTML = `
      <div class="py-6 text-center space-y-2 col-span-full">
            <p>আপনি এখনো কোন Lesson Select করেনি</p>
            <h3 class="text-2xl font-bold">একটি Lesson Select করুন।</h3>
        </div>
      `;
    manageSpinner(false, "loading-spinner", "word-container");
    return;
  }
  words.forEach((word) => {
    const cardDiv = document.createElement("div");
    // kisu speak korar jonno oita jodi str hoi tahole ''single qutation ar majkhane likte hobe

    cardDiv.innerHTML = `
    
                <div class="bg-white gap-4 p-4 space-y-5 rounded-md h-full">
                    <h2 class="text-3xl font-bold">${word.word ? `${word.word}` : `শব্দ পাওয়া যাইনি`}</h2>
                    <p>Meaning /Pronounciation</p>
                    <h2 class="bangla-font text-2xl font-bold">${word.meaning ? `${word.meaning}` : `অর্থ পাওয়া যাইনি`} / ${word.pronunciation}</h2>
                    <div class="flex items-center justify-between">
                       <button onclick="loadWordDetails(${word.id})" class=" btn p-3 rounded-sm hover:bg-[#1A91FF30]"> 
                         <i class="fa-solid fa-circle-info"></i>
                       </button>
                       <button onclick="pronounceWord('${word.word}')" class=" btn p-3 rounded-sm hover:bg-[#1A91FF30]">
                          <i class="fa-solid fa-volume"></i>
                        </button>
                       
                    </div>
                </div>
            
    `;
    wordContainer.append(cardDiv);
    manageSpinner(false, "loading-spinner", "word-container");
  });
};

const loadWordDetails = async (id) => {
  manageSpinner(true, "loading-spinner-modal", "words-details");
  document.getElementById("my_modal").showModal();
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};
const displayWordDetails = (word) => {
  const wordsDetails = document.getElementById("words-details");
  wordsDetails.innerHTML = `
            <div class="space-y-3">
                <h3 class="text-2xl font-bold">${word.word}</h3>
                <h4 class="font-bold">Meaning</h4>
                <p class="">${word.meaning}</p>
                <h4 class="font-bold">Example</h4>
                <p>${word.sentence}</p>
                <h4 class="font-bold">সমার্থক শব্দ গুলো</h4>
                <div>${createElement(word.synonyms)}</div>
                <div class="modal-action">
                    <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class="btn">Close</button>
                    </form>
                </div>
            </div>
  `;
  manageSpinner(false, "loading-spinner-modal", "words-details");
};
loadLesson();

document.getElementById("search-btn").addEventListener("click", () => {
  const input = document.getElementById("input-text");
  const searchValue = input.value.trim().toLowerCase();
  if (searchValue == "") {
    return alert("please type a word");
  }

  const url = "https://openapi.programming-hero.com/api/words/all";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const alldata = data.data;
      const filterData = alldata.filter((word) =>
        word.word.toLowerCase().includes(searchValue),
      );
      displayWords(filterData);
    });
});

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

//
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
        <button onclick="loadWords(${lesson.level_no})" class="btn btn-outline btn-primary">Lesson-${lesson.level_no}</button>
    `;
    lessonBtnContainer.append(lessonBtn);
  });
};

const loadWords = async (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayWords(data.data);
};
const displayWords = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  words.forEach((word) => {
    const cardDiv = document.createElement("div");
    if (word.length == 0) {
      cardDiv.innerHTML = `
      <div class="py-6 text-center space-y-2">
            <p>আপনি এখনো কোন Lesson Select করেনি</p>
            <h3 class="text-2xl font-bold">একটি Lesson Select করুন।</h3>
        </div>
      `;
    }
    cardDiv.innerHTML = `
    
                <div class="bg-white gap-4 p-4 space-y-5 rounded-md">
                    <h2 class="text-3xl font-bold">${word.word ? `${word.word}` : `শব্দ পাওয়া যাইনি`}</h2>
                    <p>Meaning /Pronounciation</p>
                    <h2 class="bangla-font text-2xl font-bold">${word.meaning ? `${word.meaning}` : `অর্থ পাওয়া যাইনি`} / ${word.pronunciation}</h2>
                    <div class="flex items-center justify-between">
                       <span class="p-3 rounded-sm bg-[#1A91FF30]"> 
                       <i class="fa-solid fa-circle-info"></i>
                       </span>
                       <span class="p-3 rounded-sm bg-[#1A91FF30]">
                        <i class="fa-solid fa-volume"></i></span>
                       
                    </div>
                </div>
            
    `;
    wordContainer.append(cardDiv);
  });
};
loadLesson();

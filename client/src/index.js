const BASE_URL = "http://localhost:5000/api"; // Use your local API

// Fetch Levels & Display Buttons
async function fetchLevelLesson() {
    try {
        const response = await fetch(`${BASE_URL}/levels`);
        const data = await response.json();
        console.log("Fetched Levels Data:", data);

        if (Array.isArray(data)) {
            displayData(data);
        } else {
            displayData([]);
        }
    } catch (error) {
        console.error("Error fetching levels:", error);
    }
}

// Display Level Buttons
function displayData(levels) {
    let displayDiv = document.getElementById("displayArea");
    displayDiv.innerHTML = "";

    levels.forEach((level) => {
        let button = document.createElement("button");
        button.textContent = `Level ${level.level_no}`;
        button.className = "bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 w-full";
        button.addEventListener("click", () => fetchWordsByLevel(level._id));

        displayDiv.appendChild(button);
    });
}

async function fetchWordsByLevel(levelId) {
    const wordsURL = `${BASE_URL}/words/level/${levelId}`; // Updated API URL

    try {
        const response = await fetch(wordsURL);
        const data = await response.json();
        console.log(`Fetched Words for Level ${levelId}:`, data);

        if (Array.isArray(data)) {
            displayWords(data);
        } else {
            displayWords([]);
        }
    } catch (error) {
        console.error("Error fetching words:", error);
        displayWords([]);
    }
}


// Display Words List
function displayWords(wordsArray) {
    const wordsDiv = document.getElementById("wordsArea");
    wordsDiv.innerHTML = wordsArray.length
        ? wordsArray.map(word => `
            <div class="p-5 rounded-xl shadow-lg bg-gradient-to-br from-gray-200 to-gray-50 border border-gray-300 backdrop-blur-xl text-center animate-fadeIn transform transition-all duration-300 hover:scale-105">
                <p class="font-extrabold text-blue-600 text-lg">${word.word}</p>
                <p class="text-gray-700 font-medium">Meaning: ${word.meaning}</p>
                <p class="text-gray-500 italic text-sm">Pronunciation: ${word.pronunciation}</p>
                <button onclick="speak('${word.pronunciation}')" class="bg-blue-500 text-white px-3 py-1 rounded-md mt-2">🔊</button>
                <button onclick="fetchWordDetails('${word._id}')" class="bg-green-500 text-white px-3 py-1 rounded-md mt-2">📖</button>
            </div>
        `).join("")
        : "<p class='text-red-500 text-lg font-semibold text-center'>No words available for this level.</p>";
}

// Fetch Word Details
async function fetchWordDetails(wordId) {
    const wordURL = `${BASE_URL}/words/${wordId}`;
    try {
        const response = await fetch(wordURL);
        const data = await response.json();
        if (data) {
            showModal(data);
        }
    } catch (error) {
        console.error("Error fetching word details:", error);
    }
}

// Show Modal with Word Details
function showModal(word) {
    const modal = document.getElementById("modal");
    modal.innerHTML = `
        <div class="modal-content p-5 bg-white rounded-lg shadow-lg relative">
            <button class="absolute top-2 right-2 text-xl" onclick="closeModal()">🗙</button>
            <h2 class="text-xl font-bold text-blue-600">${word.word}</h2>
            <p><strong>Sentence:</strong> ${word.sentence}</p>
            <p><strong>Parts of Speech:</strong> ${word.partsOfSpeech}</p>
            <p><strong>Pronunciation:</strong> ${word.pronunciation}</p>
            <p><strong>Level:</strong> ${word.level}</p>
            <p><strong>Synonyms:</strong> ${word.synonyms.join(", ")}</p>
            <p><strong>Points:</strong> ${word.points}</p>
        </div>
    `;
    modal.classList.remove("hidden");
}

// Close Modal
function closeModal() {
    document.getElementById("modal").classList.add("hidden");
}

// Speak Pronunciation
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-EN"; 
    speechSynthesis.speak(speech);
}

// Initialize App
fetchLevelLesson();

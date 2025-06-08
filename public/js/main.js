document.addEventListener("DOMContentLoaded", () => {
  const nextBtn = document.getElementById("newQuoteBtn");
  const author = document.getElementById("author-name");
  const quoteBox = document.getElementById("Quotes-box");
  const quoteContent = document.getElementById("quoteContent");
  const saveBtn = document.getElementById("SaveQuoteBtn");
  const savedQuoteList = document.getElementById("savedQuoteList");
  nextBtn.addEventListener("click", async () => {
    const res = await fetch("/api/quote");
    const data = await res.json();
    console.log("button clicked");
    const quote = data[0];
    quoteContent.textContent = quote.q;
    author.textContent = `- ${quote.a}`;
    saveBtn.classList.remove("hidden");
  });
  saveBtn.addEventListener("click", () => {
    console.log("The Btn is clicked");
    const quoteText = quoteContent.textContent;
    const authorname = author.textContent;
    if (!quoteText || !authorname) return;

    const savedQuotes = JSON.parse(localStorage.getItem("quotes")) || []; //get the savedQuotes from the localstorage , if not avialable in that then an empty array

    const AlreadyExists = savedQuotes.some(
      (q) => q.text === quoteText && q.author === authorname
    );

    if (!AlreadyExists) {
      savedQuotes.push({ text: quoteText, author: authorname, id: Date.now() });
      localStorage.setItem("quotes", JSON.stringify(savedQuotes));
    }

    renderSavedQuotes();
  });
  function renderSavedQuotes() {
    const savedQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
    savedQuoteList.innerHTML = "";

    savedQuotes.forEach((q) => {
      const li = document.createElement("li");
      li.textContent = `${q.text} written by ${q.author}`;
      li.innerHTML = `
      <span> ${q.text} written by ${q.author} </span>
      <span>
      <button>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2" width="20" height="20">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
     </svg>

    </button>
    </span>
      `;

      li.id = `${q.id}`;
      li.classList.add("savedquotesare");
      const DeleteBtn = li.querySelector("button");
      DeleteBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // avoid event bubbling
        const updatedQuotes = savedQuotes.filter((quote) => quote.id !== q.id);
        localStorage.setItem("quotes", JSON.stringify(updatedQuotes));
        renderSavedQuotes(); // re-render after deletion
      });
      savedQuoteList.appendChild(li);
    });
  }
  renderSavedQuotes();
});

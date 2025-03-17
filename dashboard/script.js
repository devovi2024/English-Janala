document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".sidebar-link");
    const contentDiv = document.getElementById("content");

    links.forEach(link => {
        link.addEventListener("click", async function (event) {
            event.preventDefault();
            const pageUrl = this.getAttribute("data-page");

            try {
                const response = await fetch(pageUrl);
                const htmlContent = await response.text();
                contentDiv.innerHTML = htmlContent;

            } catch (error) {
                console.error("Error loading the page:", error);
                contentDiv.innerHTML = "<p class='text-red-500'>Failed to load content.</p>";
            }
        });
    });
});

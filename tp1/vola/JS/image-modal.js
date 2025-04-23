document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    const closeBtn = document.querySelector(".modal__close");

    document.querySelectorAll(".gallery__img").forEach(img => {
        img.addEventListener("click", () => {
            modal.style.display = "block";
            modalImg.src = img.src;
            modalImg.alt = img.alt;
        });
    });

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
 F
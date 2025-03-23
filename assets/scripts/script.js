document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".text-column");
    const navLinks = document.querySelectorAll(".sidebar ul li a");

    function updateActiveLink() {
        let fromTop = window.scrollY + 80; // Add slight offset

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (fromTop >= sectionTop && fromTop < sectionTop + sectionHeight) {
                let targetId = section.getAttribute("id");
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${targetId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", updateActiveLink);
});


document.addEventListener("DOMContentLoaded", function () {
    const menu = document.querySelector(".top-menu");
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            menu.classList.add("hidden-menu");
        } else {
            menu.classList.remove("hidden-menu");
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector(".sidebar");
    const contentWrapper = document.querySelector(".content-wrapper");
    const sidebarOffset = sidebar.offsetTop; // Get the sidebar's initial position

    window.addEventListener("scroll", () => {
        const contentTop = contentWrapper.getBoundingClientRect().top; // Track content's top relative to viewport

        if (contentTop <= 10) { // Sidebar should stay fixed when content reaches the top
            sidebar.classList.add("fixed");
            sidebar.style.top = "10px"; // Keep it fixed near the top
        } else {
            sidebar.classList.remove("fixed");
            sidebar.style.top = "auto"; // Reset position when scrolling back up
        }
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".clickable-image");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close-btn");

    images.forEach(image => {
        image.addEventListener("click", function () {
            lightbox.style.display = "flex";
            lightboxImg.src = this.getAttribute("data-src");
        });
    });

    // Close the lightbox when clicking the close button
    closeBtn.addEventListener("click", function () {
        lightbox.style.display = "none";
    });

    // Close the lightbox when clicking outside the image
    lightbox.addEventListener("click", function (event) {
        if (event.target !== lightboxImg) {
            lightbox.style.display = "none";
        }
    });
});

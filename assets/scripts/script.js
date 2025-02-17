document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".text-column");
    const navLinks = document.querySelectorAll(".sidebar ul li a");

    function updateActiveLink() {
        let fromTop = window.scrollY + 10; // Add slight offset

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

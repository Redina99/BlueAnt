document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const selects = form.querySelectorAll("select");

    // Set default background color to white
    selects.forEach(select => {
        select.style.backgroundColor = "#ffffff"; // Default white background

        // Change to light yellow after a value is selected
        select.addEventListener("change", () => {
            if (select.value) {
                select.style.backgroundColor = "#fffacd"; // Light yellow
            } else {
                select.style.backgroundColor = "#ffffff"; // Reset to white if no value
            }
        });
    });

    // Handle form submission
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Collect selected values
        const status = document.getElementById("status").value;
        const type = document.getElementById("type").value;
        const department = document.getElementById("department").value;

        // Build filters
        const filters = {};
        if (status) filters.status = status;
        if (type) filters.type = type;
        if (department) filters.department = department;

        // Log or process the filters (example: alert for now)
        console.log("Applied Filters:", filters);
        alert(`Filters applied: ${JSON.stringify(filters, null, 2)}`);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const projectResults = document.getElementById("project-results");

    // Updated project data
    const projects = [
        { name: "Project Alpha", status: "Active", type: "Development", department: "CEO" },
        { name: "Project Beta", status: "Active", type: "Research", department: "Finanzen" },
        { name: "Project Gamma", status: "In Progress", type: "Implementation", department: "IT" },
        { name: "Project Delta", status: "Completed", type: "Development", department: "Backendsysteme" },
        { name: "Project Epsilon", status: "Pending", type: "Support", department: "Frontendsysteme" },
        { name: "Project Zeta", status: "Active", type: "Quality", department: "Qualitätsmanagement" }
    ];

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Collect selected filters
        const statusFilters = Array.from(document.querySelectorAll("#status .dropdown-menu input[type='checkbox']:checked"))
            .map(input => input.value);
        const typeFilters = Array.from(document.querySelectorAll("#type .dropdown-menu input[type='checkbox']:checked"))
            .map(input => input.value);
        const departmentFilters = Array.from(document.querySelectorAll("#department .dropdown-menu input[type='checkbox']:checked"))
            .map(input => input.value);

        // Filter the projects
        const filteredProjects = projects.filter(project => {
            const matchesStatus = !statusFilters.length || statusFilters.includes(project.status);
            const matchesType = !typeFilters.length || typeFilters.includes(project.type);
            const matchesDepartment = !departmentFilters.length || departmentFilters.includes(project.department);

            return matchesStatus && matchesType && matchesDepartment;
        });

        // Display results
        if (filteredProjects.length > 0) {
            projectResults.innerHTML = filteredProjects.map(project => `
                <div class="project-card">
                    <h4>${project.name}</h4>
                    <p><strong>Status:</strong> ${project.status}</p>
                    <p><strong>Projektart:</strong> ${project.type}</p>
                    <p><strong>Unternehmensbereich:</strong> ${project.department}</p>
                </div>
            `).join("");
        } else {
            projectResults.innerHTML = "<p>Keine Projekte gefunden.</p>";
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach(dropdown => {
        const toggleButton = dropdown.querySelector(".dropdown-toggle");
        const menu = dropdown.querySelector(".dropdown-menu");

        // Toggle dropdown menu on button click
        toggleButton.addEventListener("click", () => {
            dropdown.classList.toggle("open");
        });

        // Close the dropdown if clicked outside
        document.addEventListener("click", (e) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove("open");
            }
        });
    });

    // Handle "Apply" button
    const applyButtons = document.querySelectorAll(".apply-button");
    applyButtons.forEach(button => {
        button.addEventListener("click", () => {
            const menu = button.closest(".dropdown-menu");
            const checkboxes = menu.querySelectorAll("input[type='checkbox']");
            const selected = Array.from(checkboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value);
            alert(`Selected Filters: ${selected.join(", ")}`);
        });
    });
});

//searchBar focus/ highlight
document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.querySelector(".search-bar");

    searchBar.addEventListener("focus", () => {
        searchBar.style.border = "2px solid #1e90ff"; // Highlight border color
        searchBar.style.boxShadow = "0 0 8px rgba(30, 144, 255, 0.5)"; // Glowing effect
        searchBar.style.backgroundColor = "#f0f8ff"; // Optional background color
    });

    searchBar.addEventListener("blur", () => {
        searchBar.style.border = "1px solid #ccc"; // Reset to default style
        searchBar.style.boxShadow = "none"; // Remove glowing effect
        searchBar.style.backgroundColor = "#fff"; // Reset background color
    });
});

//table
document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector("#project-table tbody");

    // Fetch data from the API
    async function fetchProjectData() {
        try {
            const response = await fetch("https://your-blueant-api-endpoint"); // Replace with your API endpoint
            const projects = await response.json();

            // Clear existing table rows
            tableBody.innerHTML = "";

            // Populate the table with data
            projects.forEach(project => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${project.name}</td>
                    <td>${project.startDate}</td>
                    <td>${project.endDate}</td>
                    <td>${project.status}</td>
                    <td>${project.manager}</td>
                    <td>${project.subject}</td>
                `;
                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error("Error fetching project data:", error);
        }
    }

    // Initial data fetch
    fetchProjectData();

    // Optionally: Refresh data periodically
    setInterval(fetchProjectData, 60000); // Refresh every 60 seconds
});


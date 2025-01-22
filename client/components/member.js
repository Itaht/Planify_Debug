export function Member(members) {
    const memberPopup = document.getElementById("member-popup");
    const doneMemberButton = document.getElementById("done-member-button");
    const addMemberButton = document.getElementById("add-member-button");
    const memberOptionsContainer = document.querySelector(".member-options");

    let selectedMemberButton = null;

    // Populate Members
    function populateMembers(memberList) {
        console.log("Populating members:", memberList);

        if (!memberOptionsContainer) {
            console.error("Member options container not found.");
            return;
        }

        memberOptionsContainer.innerHTML = ""; // Clear existing options

        memberList.forEach((member, index) => {
            if (!member || !member.profilePicture || !member.name) {
                console.error(`Invalid member at index ${index}:`, member);
                return; // Skip invalid member
            }

            console.log(`Adding member ${index + 1}:`, member);

            const memberOption = document.createElement("div");
            memberOption.className = "member-option";
            memberOption.setAttribute("data-member-id", member.id);

            const profilePicture = document.createElement("img");
            profilePicture.src = member.profilePicture;
            profilePicture.alt = member.name;
            profilePicture.className = "member-profile-picture";

            const username = document.createElement("span");
            username.textContent = member.name;
            username.className = "member-username";

            memberOption.appendChild(profilePicture);
            memberOption.appendChild(username);
            memberOptionsContainer.appendChild(memberOption);
        });

        console.log("Members successfully added to member-options.");
    }

    // Show Member Popup
    function showMemberPopup() {
        if (memberPopup) {
            console.log("Showing member popup.");
            memberPopup.classList.remove("hidden");
        } else {
            console.error("Member popup element not found.");
        }
    }

    // Hide Member Popup
    function hideMemberPopup() {
        if (memberPopup) {
            console.log("Hiding member popup.");
            memberPopup.classList.add("hidden");
        }
    }

    // Done Button Logic
    doneMemberButton.addEventListener("click", () => {
        if (selectedMemberButton) {
            const selectedMemberName = selectedMemberButton.querySelector(".member-username").textContent;
            addMemberButton.textContent = selectedMemberName;
            addMemberButton.style.backgroundColor = "#53D1F0";
            addMemberButton.style.color = "#fff";
            hideMemberPopup();
        } else {
            alert("Please select a member before clicking 'Done'.");
        }
    });

    // Close Popup on Outside Click
    document.addEventListener("click", (event) => {
        if (
            memberPopup &&
            !memberPopup.contains(event.target) &&
            event.target.id !== "add-member-button"
        ) {
            hideMemberPopup();
        }
    });

    // Populate members during initialization
    populateMembers(members);

    return {
        showMemberPopup,
    };
}

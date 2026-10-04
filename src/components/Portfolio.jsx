import { useState, useEffect, useRef } from "react";

const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
@import url('https://unpkg.com/@phosphor-icons/web@2.1.1/src/bold/style.css');
.portfolio-root { font-family: 'Inter', system-ui, sans-serif; font-size: 17px; }

.theme-light {
  --bg:#fcfcfd; --surface:#ffffff; --border:#e8e8ec;
  --heading:#111116; --body:#44444e; --muted:#7a7a86;
  --main:#4f46e5; --live:#059669;
}
.theme-dark {
  --bg:#0e0f14; --surface:#16171e; --border:#272835;
  --heading:#f4f4f6; --body:#b9bac4; --muted:#88899a;
  --main:#8b8cf8; --live:#34d399;
}

.prose-measure { max-width: 64ch; }
.h-display { font-size: 52px; font-weight: 800; line-height: 1.12; letter-spacing: -0.015em; }
.h-section { font-size: 28px; font-weight: 700; line-height: 1.2; letter-spacing: -0.01em; }
.h-item { font-size: 17px; font-weight: 600; line-height: 1.4; }
.eyebrow { font-size: 12px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: var(--main); }
.label { font-size: 12px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: var(--muted); }

.card { border-radius: 10px; border: 1px solid var(--border); background: var(--surface); transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease; }
.card-hover:hover { transform: translateY(-3px); box-shadow: 0 10px 28px -12px rgba(17,17,22,.15); border-color: color-mix(in srgb, var(--main) 35%, var(--border)); cursor: pointer; }

.btn { display: inline-block; font-size: 15px; font-weight: 600; padding: 12px 26px; border-radius: 8px; background: var(--heading); color: var(--bg); border: 1px solid var(--heading); transition: transform .2s ease, box-shadow .2s ease; }
.btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px -8px rgba(17,17,22,.35); }
.btn-accent { display: inline-block; font-size: 15px; font-weight: 600; padding: 12px 26px; border-radius: 8px; background: var(--main); color: #fff; border: 1px solid var(--main); transition: transform .2s ease, box-shadow .2s ease; }
.btn-accent:hover { transform: translateY(-2px); box-shadow: 0 8px 22px -8px color-mix(in srgb, var(--main) 60%, transparent); }
.btn-sm { font-size: 13px; padding: 8px 16px; border-radius: 7px; }

a.text-link { color: var(--main); font-weight: 600; text-decoration: underline; text-underline-offset: 3px; transition: opacity .2s ease; }
a.text-link:hover { opacity: .65; }

.glass { background: color-mix(in srgb, var(--bg) 88%, transparent); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); }
.hairline { border-top: 1px solid var(--border); }

.codeblock { background:#0d1220; color:#dbe4f5; border:1px solid #232c45; border-radius:10px; font-family:'JetBrains Mono', monospace; font-size:12.5px; line-height:1.65; overflow-x:auto; padding:16px 18px; }
.codeblock pre { margin:0; white-space:pre; }
.theme-dark .codeblock { background:#0a0e1a; }
.codehead { display:flex; align-items:center; gap:8px; font-family:'JetBrains Mono', monospace; font-size:11px; color:#7c8db5; background:#111a30; border:1px solid #232c45; border-bottom:none; border-radius:10px 10px 0 0; padding:8px 14px; }
.codehead + .codeblock { border-radius:0 0 10px 10px; }
.codenote { font-family:'JetBrains Mono', monospace; font-size:11px; color:var(--muted); margin-top:8px; }

i.ph-bold { line-height: 1; }
.icon-anim { display: inline-flex; transition: transform .25s cubic-bezier(.34,1.56,.64,1); }
.icon-anim:hover { transform: rotate(-10deg) scale(1.18); }

.mh-logo {
  width: 38px; height: 38px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: #fff; font-weight: 800; font-size: 14px; letter-spacing: .02em;
  transition: transform .3s cubic-bezier(.34,1.56,.64,1), border-radius .3s ease;
}
.mh-logo:hover { transform: rotate(-8deg) scale(1.1); border-radius: 50%; }
@keyframes logoGlow { 0%,100% { box-shadow: 0 4px 14px -4px rgba(99,79,237,.55); } 50% { box-shadow: 0 4px 22px -2px rgba(124,58,237,.65); } }
.mh-logo { animation: logoGlow 3s ease-in-out infinite; }
.mh-logo:hover { animation-play-state: paused; }

@keyframes washMove { 0% { background-position: 0% 50%; } 100% { background-position: 300% 50%; } }
.aurora-wash {
  position: absolute; inset: 0;
  background: linear-gradient(90deg, #7c3aed, #0284c7, #059669, #ea580c, #db2777, #7c3aed);
  background-size: 300% 100%;
  animation: washMove 24s linear infinite;
  opacity: .1;
  mask-image: radial-gradient(ellipse 90% 100% at 50% 0%, black, transparent 78%);
}
.theme-dark .aurora-wash { opacity: .17; }
.aurora-orb { position: absolute; border-radius: 9999px; filter: blur(90px); opacity: .2; }
.theme-dark .aurora-orb { opacity: .28; }
@keyframes driftA { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(60px,40px) scale(1.15); } }
@keyframes driftB { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-50px,60px) scale(1.1); } }
@keyframes driftC { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(40px,-30px) scale(1.2); } }
.aurora-fade { mask-image: linear-gradient(to bottom, black 35%, transparent 100%); }

.reveal { opacity: 0; transform: translateY(12px); transition: opacity .35s ease, transform .35s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }
@keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
.in { opacity: 0; animation: fadeUp .4s ease forwards; }
.page-in { animation: fadeUp .35s ease; }
@keyframes caret { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
.caret { animation: caret 1s step-end infinite; }
@keyframes ringPulse { 0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--live) 40%, transparent); } 100% { box-shadow: 0 0 0 9px transparent; } }
.live-dot { animation: ringPulse 2s ease-out infinite; }
@keyframes riseIn { from { opacity: 0; transform: translateY(16px) scale(.9); } to { opacity: 1; transform: translateY(0) scale(1); } }
.rise-in { animation: riseIn .35s ease forwards; }
::selection { background: var(--main); color: #fff; }
html { scroll-behavior: smooth; }
`;

const COLORS = ["#7c3aed","#2563eb","#0d9488","#ea580c","#db2777","#4f46e5","#059669","#dc2626","#0284c7","#c026d3","#d97706","#16a34a","#9333ea","#0891b2","#e11d48"];

const PH = {
  themeSun: "sun", themeMoon: "moon", backTop: "arrow-up", back: "arrow-left",
  navGithub: "github-logo", navLinkedin: "linkedin-logo", navMail: "paper-plane-tilt",
  curRole: "briefcase", curAlso: "sparkle", curCity: "map-pin", curAlways: "plant",
  secAbout: "hand-wave", secSkills: "code", secOutbound: "broadcast", secExp: "path", secProjects: "rocket-launch", secContact: "envelope-simple",
  skLang: "brackets-curly", skWeb: "globe-hemisphere-west", skCloud: "cloud", skSales: "funnel",
  mDials: "phone-call", mWeek: "trend-up", mSource: "magnifying-glass",
  hDay: "calendar-clock", hSeq: "list-numbers",
  degree: "graduation-cap",
  pPoke: "lightning", pJpmc: "bank", pTable: "table", pGame: "game-controller",
  pCode: "file-code", done: "check", wrench: "wrench",
};

/* liquor bottle as inline SVG - renders with no font dependency */
function BottleIcon({ color, size = 18, className = "", style }) {
  return (
    <svg viewBox="0 0 256 256" width={size} height={size} fill="currentColor" className={className} style={{ color, ...style }} aria-hidden="true">
      <path d="M167.8 60.7 160 55.4V24a8 8 0 0 0-8-8h-48a8 8 0 0 0-8 8v31.4l-7.8 5.3A48 48 0 0 0 64 100.1V216a16 16 0 0 0 16 16h96a16 16 0 0 0 16-16V100.1a48 48 0 0 0-24.2-39.4ZM112 32h32v16h-32Zm64 184a1 1 0 0 1-.1.1H80.1L80 216v-32h96Zm0-48H80v-67.9a32 32 0 0 1 16.1-27.7l10.4-7a8 8 0 0 0 3.5-6.6V64h36v4.8a8 8 0 0 0 3.5 6.6l10.4 7A32 32 0 0 1 176 100.1Z" />
    </svg>
  );
}

function Ph({ name, color, size = 18, className = "", style }) {
  if (name === "bottle") {
    return <BottleIcon color={color} size={size} className={className} style={style} />;
  }
  return <i className={`ph-bold ph-${name} ${className}`} style={{ color, fontSize: size, ...style }} aria-hidden="true" />;
}

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Outbound", href: "#stack" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const ROLES = [
  "SDR at Reveneer, serving AppViewX",
  "Computer Science graduate, UMass Lowell",
  "Aspiring full-stack developer",
  "Always learning and growing",
];

const SKILLS = [
  { icon: PH.skLang, color: COLORS[0], group: "Languages", items: ["C", "C++", "Python", "Java", "JavaScript", "C#"] },
  { icon: PH.skWeb, color: COLORS[1], group: "Web", items: ["React", "HTML5", "CSS3", "Tailwind", "Node.js", "Responsive design"] },
  { icon: PH.skCloud, color: COLORS[6], group: "Tools & Cloud", items: ["AWS", "Git", "GitHub", "Unity", "SFML", "Agile"] },
  { icon: PH.skSales, color: COLORS[4], group: "Sales stack", items: ["Salesloft", "Salesforce", "HubSpot", "Outbounding", "Sourcing"] },
];

const DAY_SCHEDULE = [
  { time: "8:30", text: "List building in Salesforce. 25 to 30 fresh contacts that fit our ideal customer profile, researched and logged before the first dial." },
  { time: "9:15", text: "First call block in Salesloft. 30 to 40 dials before lunch. Voicemail only when I actually have something worth saying." },
  { time: "12:45", text: "Reply triage. Anyone who answered or replied gets a same-day follow-up, tracked in HubSpot so nothing slips." },
  { time: "2:00", text: "Second block: the rest of the 60 to 100 dials, plus LinkedIn touches for anyone warming up." },
  { time: "4:30", text: "CRM hygiene. Notes, statuses, and tomorrow's tasks. If it isn't logged in Salesforce, it didn't happen." },
];

const SEQUENCE = [
  { day: "Day 1", type: "Email", text: "One specific observation about their team or company. No pitch, no attachments." },
  { day: "Day 2", type: "Call", text: "Dial them directly, leave a short voicemail referencing the email." },
  { day: "Day 4", type: "LinkedIn", text: "Connect request with a short note. Still no pitch." },
  { day: "Day 6", type: "Email", text: "New angle: a peer company doing something interesting, or a result worth mentioning." },
  { day: "Day 10", type: "Breakup email", text: "One line, easy out. This one gets the most replies, every time." },
];

const EXPERIENCE = [
  { role: "Sales Development Representative", org: "Reveneer · AppViewX team", period: "Current", current: true, color: COLORS[6],
    points: ["Hired by Reveneer, which builds and runs dedicated outbound sales teams for tech companies. Currently embedded on the AppViewX account.", "Outbound prospecting for AppViewX, the leading machine identity and certificate lifecycle automation platform (CLM, PKI, PQC readiness).", "Engaging security and infrastructure teams on certificate outages, machine identity risk, and compliance exposure."] },
  { role: "Sales Development Representative", org: "Reveneer · Rainbird Technologies team", period: "Aug 2026 - Oct 2026", color: COLORS[0],
    points: ["First account at Reveneer: served Rainbird Technologies, whose deterministic AI platform automates expert decision-making for regulated industries.", "Educated prospects on the shift from probabilistic LLMs to explainable, policy-faithful AI backed by a regulator-ready evidence tree.", "Completed comprehensive inside-sales training at Reveneer: opening, objection handling, discovery, offer, and closing."] },
  { role: "AI Model Evaluator", org: "Outlier", period: "Feb 2026 - Jul 2026", color: COLORS[0],
    points: ["Evaluated CS and math-related AI tasks for accuracy, rateability, and alignment with project guidelines.", "Compared model responses on correctness, clarity, and reasoning, then wrote feedback that improved output quality.", "Earned Oracle status, reserved for consistently high-performing raters."] },
  { role: "AI Trainer", org: "Handshake", period: "Nov 2025 - Apr 2026", color: COLORS[1],
    points: ["Evaluated and improved LLM reasoning and accuracy for AI research projects.", "Wrote domain-specific prompts and structured feedback under strict quality guidelines."] },
  { role: "Office Assistant", org: "UMass Lowell, Residence Life", period: "Feb 2024 - May 2026", color: COLORS[10],
    points: ["Primary contact for a residence hall: phones, front desk, students and families.", "Handled building access, lockouts, data entry, and daily clerical work for Residence Life staff."] },
  { role: "Web Maintenance Intern", org: "New Objective Inc.", period: "Feb 2024 - May 2024", color: COLORS[4],
    points: ["Improved front-end performance and cross-browser responsiveness on business web applications.", "Reviewed semantic HTML and CSS architecture in an Agile team."] },
];

const SNIPPET_MULT = `// from meenahanna/hw4-part2 · script.js
// custom validator: max can never be below min
$.validator.addMethod("greaterThanOrEqualTo",
  function (value, element, param) {
    return parseFloat(value) >= parseFloat($(param).val());
  },
  "The maximum value must be greater than or equal to the minimum value."
);

$("#form-container").validate({
  rules: {
    min_col_value: { required: true, number: true, min: -50, max: 50 },
    max_col_value: { required: true, number: true, min: -50, max: 50,
                     greaterThanOrEqualTo: "#min_col_value" },
    min_row_value: { required: true, number: true, min: -50, max: 50 },
    max_row_value: { required: true, number: true, min: -50, max: 50,
                     greaterThanOrEqualTo: "#min_row_value" }
  },
  submitHandler: function () { generateTable(); }
});`;

const SNIPPET_MULT_2 = `// sliders stay synchronized with the number inputs,
// and every generated table opens as its own tab
$("#tabs").tabs();
$("#add-tab-button").click(function (e) {
  e.preventDefault();
  generateTable(); // builds the grid from the validated ranges
});`;

const SNIPPET_POKEMON = `// from ejagojo/pokemon-license-CloudComp · src/components/GenerateUID.jsx
// triggers the AWS Lambda function through API Gateway
const handleGenerateUID = async () => {
  try {
    const formData = {
      name: "John Doe",
      email: "johndoe@example.com",
      favoritePokemon: "Pikachu",
      trainerType: "Elite Trainer",
      region: "Pokemon Region",
      birthday: "07/08/2002",
      height: "5'15"
    };

    // API call to Lambda
    const response = await fetch("<API_GATEWAY_URL>/generate-uid", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    if (response.ok) {
      setUID(data.uid); // update the state with the generated UID
    } else {
      console.error("Error generating UID:", data.error);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};`;

const SNIPPET_OTR = `// simplified illustration of my cancel-window logic (React + Firestore)
// orders can only be cancelled within 5 minutes of being placed
function canCancel(order) {
  const placed = order.createdAt.toDate().getTime();
  return Date.now() - placed <= 5 * 60 * 1000;
}

async function cancelOrder(orderId) {
  const ref = doc(db, "orders", orderId);
  await updateDoc(ref, { status: "cancelled", cancelledAt: serverTimestamp() });
}`;

const SNIPPET_JPMC = `// simplified illustration of the JPMC Forage task shape (Java)
public interface DataProvider {
    ObjectMapper OM = new ObjectMapper();
    static String convertQuoteToJson(Quote quote) throws JsonProcessingException {
        return OM.writeValueAsString(quote);
    }
}`;

const SNIPPET_GAME = `// simplified illustration of the SFML game loop (C++)
while (window.isOpen()) {
    sf::Event event;
    while (window.pollEvent(event)) {
        if (event.type == sf::Event::Closed) window.close();
    }
    update(dt);   // player movement, collisions, game state
    window.clear(sf::Color::Black);
    draw(window); // sprites, HUD
    window.display();
}`;

const PROJECTS = [
  {
    slug: "on-the-rocks", icon: "bottle", color: COLORS[13],
    title: "On The Rocks", tags: "React / Firebase / Group project",
    link: "https://github.com/ejagojo/ontherocks",
    card: "A five-person team project: a cocktail web app. I owned the user profile, payment validation, and order management side. Third-highest contributor with 17 commits.",
    overview: [
      "On The Rocks is a cocktail web application built by a team of five for our coursework at UMass Lowell. The app lets users browse cocktails, create an account, save favorites, and place and manage orders.",
      "The codebase was shared on GitHub with feature branches and pull requests, which meant writing code other people had to read, review, and build on. I finished as the third-highest contributor out of five, with 17 commits between March and April 2025.",
    ],
    myRole: [
      "Built the user profile page with inline editing, so users can update their name and details without leaving the page.",
      "Implemented payment card validation for saved payment methods, including replacing an earlier Luhn-check approach with proper card validation.",
      "Built the order cancellation flow with a strict 5-minute window after purchase, using Firestore server timestamps so the cutoff could not be faked from the client.",
      "Made user information persist across page refreshes by syncing profile state with Firestore.",
    ],
    snippets: [{ file: "cancelOrder · simplified illustration (repo branch history)", code: SNIPPET_OTR,
      note: "Simplified to show the logic clearly. The full implementation lives in the repo's commit history." }],
    learned: "Working on a shared codebase taught me to write code for other people: clear commit messages, small pull requests, and not stepping on teammates' files. Handling payments and cancellation windows also taught me to think about edge cases and trust, since anything user-facing around money has to be airtight.",
  },
  {
    slug: "pokemon-license", icon: PH.pPoke, color: COLORS[10],
    title: "Pokemon Trainer License Generator", tags: "React / AWS / PokeAPI / Canvas",
    link: "https://github.com/ejagojo/pokemon-license-CloudComp",
    card: "Cloud Computing course project: a React app that generates a personalized Trainer License, wired to AWS Lambda, S3, and DynamoDB.",
    overview: [
      "A web app that generates a personalized Pokemon Trainer License. Users fill in their trainer details, pick a Pokemon from the live PokeAPI, and the app renders the custom license on an HTML Canvas, ready to download.",
      "Built for my Cloud Computing course, this was my first project wiring a full cloud stack together: AWS Lambda for backend logic, S3 for image storage, and DynamoDB for optional user data, with the React frontend calling it all through API Gateway.",
    ],
    myRole: [
      "Built React components for the trainer flow, including the welcome page experience.",
      "Integrated the PokeAPI to pull each Pokemon's sprite, height, and weight into the license.",
      "Rendered the license card on HTML Canvas with a one-click download.",
      "Wired the frontend to AWS Lambda through API Gateway to generate unique trainer IDs, with S3 storing generated images.",
    ],
    snippets: [{ file: "GenerateUID.jsx · verbatim from the repo", code: SNIPPET_POKEMON,
      note: "Verbatim from src/components/GenerateUID.jsx in the repo." }],
    learned: "This project taught me how the cloud pieces actually fit: the frontend doesn't care where compute lives, it just needs a clean API contract. Debugging CORS and IAM permissions between API Gateway and Lambda was the real learning curve.",
  },
  {
    slug: "multiplication-table", icon: PH.pTable, color: COLORS[6],
    title: "Interactive Dynamic Multiplication Table", tags: "JavaScript / jQuery / HTML & CSS",
    link: "https://github.com/meenahanna/hw4-part2",
    card: "Sliders and tabs drive a multiplication table in real time. Custom validation, inline errors, and multi-tab management, built for my GUI class at UMass Lowell.",
    overview: [
      "This project came from my GUI class at UMass Lowell (the repo header even credits Mena Hanna, UMass Lowell Computer Science). The user enters row and column ranges from -50 to 50, and the app renders a dynamic multiplication table.",
      "What made it interesting is that it grew past the assignment: sliders synchronized with number inputs, every generated table opening as its own tab, and full inline validation with custom error messages.",
    ],
    myRole: [
      "Sole author. Designed the interface, wrote the validation logic, and built the tab management system.",
      "Wrote a custom jQuery Validation method so the maximum value can never be lower than the minimum, with a clear error message.",
      "Connected range sliders to number inputs so both stay in sync while dragging.",
      "Implemented dynamic tab creation so multiple tables can be compared side by side.",
    ],
    snippets: [
      { file: "script.js · meenahanna/hw4-part2", code: SNIPPET_MULT, note: "Verbatim from the repo." },
      { file: "script.js · tabs + sliders", code: SNIPPET_MULT_2, note: "Verbatim from the repo." },
    ],
    learned: "This project taught me that validation UX is a design problem, not just a logic problem. Getting the error messages to appear inline, in the right place, at the right time took longer than the table generation itself.",
  },
  {
    slug: "jpmc-forage", icon: PH.pJpmc, color: COLORS[1],
    title: "JPMC Advanced Software Engineering (Forage)", tags: "Java / Software Engineering / Forage",
    link: "https://github.com/meenahanna/forage-midas",
    card: "JPMorgan Chase virtual experience program, completed in Java. Worked through real engineering scenarios the way their teams run them.",
    overview: [
      "The JPMorgan Chase Advanced Software Engineering virtual experience on Forage simulates real work on their engineering teams. The tasks are written the way JPMC engineers actually receive them, with an existing codebase, a spec, and a deadline.",
      "Work was done in Java, extending an existing interface and data pipeline rather than starting from scratch, which is the realistic scenario: most engineering work is modifying and testing existing code, not greenfield development.",
    ],
    myRole: [
      "Completed the program's engineering tasks in Java, working against a provided interface and specification.",
      "Set up the project toolchain, integrated with the provided data feed, and made the output testable and verifiable.",
      "Documented the work in the forage-midas repository.",
    ],
    snippets: [{ file: "Data pipeline · simplified illustration (course code is proprietary)", code: SNIPPET_JPMC,
      note: "Forage course materials are proprietary, so this is a simplified illustration of the task shape rather than the actual submission." }],
    learned: "The biggest takeaway was working against someone else's interface. You do not get to redesign the architecture, you get to make it work, make it clean, and make it pass the tests. That is what real jobs look like.",
  },
  {
    slug: "game-experiments", icon: PH.pGame, color: COLORS[4],
    title: "Game experiments, SFML and Unity", tags: "C++ / SFML / Unity / C#",
    link: "https://github.com/meenahanna",
    card: "Small projects in C++ with SFML and Unity with C#. Shipping something playable teaches more than another tutorial.",
    overview: [
      "A collection of small game experiments: some in C++ with the SFML graphics library, some in Unity with C#. None of them are masterpieces, and that is the point.",
      "Games are the best playground I have found for learning real programming concepts: the game loop is a state machine, collision detection is geometry and data structures, and input handling is event-driven programming, all visible on screen the moment something breaks.",
    ],
    myRole: [
      "Built SFML projects in C++: window and event handling, the update/render loop, sprite drawing, and basic collision logic.",
      "Built Unity scenes with C# scripts: player controllers, physics interactions, and game state.",
      "Shipped playable builds to friends and iterated based on what they broke.",
    ],
    snippets: [{ file: "SFML game loop · simplified illustration", code: SNIPPET_GAME,
      note: "Simplified illustration of the loop pattern used across the SFML experiments." }],
    learned: "Games taught me to love the feedback loop: write code, run it, see it move, fix it, see it again. That tight cycle is why my debugging got faster, and it is the same skill I use in web development now.",
  },
];

const CURRENTLY = [
  { icon: PH.curRole, color: COLORS[0], k: "Role", v: "SDR at Reveneer, serving AppViewX", live: true },
  { icon: PH.curAlso, color: COLORS[12], k: "Also", v: "AI Model Evaluator at Outlier · Oracle status" },
  { icon: PH.curCity, color: COLORS[8], k: "Based in", v: "Milford, Massachusetts" },
  { icon: PH.curAlways, color: COLORS[6], k: "Always", v: "Learning and growing" },
];

const SECTION_ICONS = { about: PH.secAbout, skills: PH.secSkills, stack: PH.secOutbound, experience: PH.secExp, projects: PH.secProjects, contact: PH.secContact };
const SECTION_COLORS = { about: COLORS[2], skills: COLORS[1], stack: COLORS[6], experience: COLORS[0], projects: COLORS[10], contact: COLORS[13] };

function useTypingEffect(words, typeSpeed = 55, deleteSpeed = 26, pause = 2400) {
  const [text, setText] = useState("");
  const state = useRef({ wordIndex: 0, charIndex: 0, deleting: false });
  useEffect(() => {
    let timeout;
    const tick = () => {
      const s = state.current;
      const current = words[s.wordIndex];
      if (!s.deleting) {
        s.charIndex++;
        setText(current.slice(0, s.charIndex));
        if (s.charIndex === current.length) { s.deleting = true; timeout = setTimeout(tick, pause); return; }
        timeout = setTimeout(tick, typeSpeed);
      } else {
        s.charIndex--;
        setText(current.slice(0, s.charIndex));
        if (s.charIndex === 0) { s.deleting = false; s.wordIndex = (s.wordIndex + 1) % words.length; timeout = setTimeout(tick, typeSpeed); return; }
        timeout = setTimeout(tick, deleteSpeed);
      }
    };
    timeout = setTimeout(tick, 300);
    return () => clearTimeout(timeout);
  }, [words, typeSpeed, deleteSpeed, pause]);
  return text;
}

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setTimeout(() => el.classList.add("visible"), delay); obs.unobserve(el); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function SectionHeading({ n, title, id }) {
  return (
    <div className="mb-12">
      <p className="eyebrow mb-3">{n}</p>
      <h2 className="h-section flex items-center gap-3.5" style={{ color: "var(--heading)" }}>
        <span className="icon-anim"><Ph name={SECTION_ICONS[id]} color={SECTION_COLORS[id]} size={26} /></span>
        {title}
      </h2>
    </div>
  );
}

function CodeBlock({ file, code, note }) {
  return (
    <div className="mt-5">
      <div className="codehead">
        <Ph name={PH.pCode} color={COLORS[1]} size={13} />
        <span>{file}</span>
      </div>
      <div className="codeblock"><pre><code>{code}</code></pre></div>
      {note && <p className="codenote">{note}</p>}
    </div>
  );
}

function ProjectPage({ project, goHome }) {
  return (
    <div className="page-in max-w-4xl mx-auto px-6 pt-32 pb-24">
      <button onClick={goHome} className="inline-flex items-center gap-2 text-[14px] font-semibold mb-10 transition-opacity hover:opacity-60" style={{ color: "var(--main)" }}>
        <Ph name={PH.back} color="var(--main)" size={16} /> Back to all projects
      </button>

      <div className="flex items-start gap-5">
        <span className="icon-anim mt-1"><Ph name={project.icon} color={project.color} size={40} /></span>
        <div>
          <h1 className="h-display !text-4xl md:!text-5xl" style={{ color: "var(--heading)" }}>{project.title}</h1>
          <p className="text-[14px] font-semibold mt-2" style={{ color: "var(--muted)" }}>{project.tags}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mt-8">
        <a href={project.link} target="_blank" rel="noreferrer" className="btn-accent btn-sm inline-flex items-center gap-2">
          <Ph name={PH.navGithub} color="#fff" size={15} /> View the repo
        </a>
        <a href="mailto:hannamina2004@gmail.com" className="btn btn-sm">Ask me about it</a>
      </div>

      <section className="mt-14">
        <h2 className="h-section !text-xl mb-5" style={{ color: "var(--heading)" }}>Overview</h2>
        <div className="space-y-4 leading-[1.7] prose-measure">
          {project.overview.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="h-section !text-xl mb-5 flex items-center gap-3" style={{ color: "var(--heading)" }}>
          <Ph name={PH.wrench} color={project.color} size={20} /> What I built
        </h2>
        <ul className="space-y-3 text-[16px] leading-relaxed prose-measure">
          {project.myRole.map((p, i) => (
            <li key={i} className="flex gap-3">
              <Ph name={PH.done} color={project.color} size={17} className="shrink-0 mt-1" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="h-section !text-xl mb-2 flex items-center gap-3" style={{ color: "var(--heading)" }}>
          <Ph name={PH.pCode} color={COLORS[1]} size={20} /> The code
        </h2>
        {project.snippets.map((s, i) => <CodeBlock key={i} file={s.file} code={s.code} note={s.note} />)}
      </section>

      <section className="mt-14">
        <h2 className="h-section !text-xl mb-5" style={{ color: "var(--heading)" }}>What it taught me</h2>
        <p className="leading-[1.7] prose-measure">{project.learned}</p>
      </section>

      <div className="mt-16 pt-8 hairline">
        <button onClick={goHome} className="btn-accent inline-flex items-center gap-2">
          <Ph name={PH.back} color="#fff" size={15} /> Back to all projects
        </button>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const typed = useTypingEffect(ROLES);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [theme, setTheme] = useState("light");
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    try { const saved = localStorage.getItem("mh-theme"); if (saved === "dark" || saved === "light") setTheme(saved); } catch {}
  }, []);
  useEffect(() => { try { localStorage.setItem("mh-theme", theme); } catch {} }, [theme]);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
      setShowTop(h.scrollTop > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goto = (hash) => {
    if (window.location.hash === hash) return;
    window.location.hash = hash;
  };
  useEffect(() => {
    if (route.startsWith("#/project/")) { window.scrollTo({ top: 0 }); return; }
    const el = document.querySelector(route || "#top");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, [route]);

  const projectMatch = route.match(/^#\/project\/(.+)$/);
  const activeProject = projectMatch ? PROJECTS.find((p) => p.slug === projectMatch[1]) : null;

  const mailtoHref = `mailto:hannamina2004@gmail.com?subject=${encodeURIComponent(
    `Message from ${form.name || "someone"} (portfolio)`
  )}&body=${encodeURIComponent(
    `${form.message || ""}\n\n${form.name || ""}\n${form.email || ""}`
  )}`;

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const inputStyle = { border: "1px solid var(--border)", background: "var(--surface)", color: "var(--heading)" };

  const goHomeToProjects = () => goto("#projects");

  return (
    <div className={`portfolio-root theme-${theme} relative min-h-screen antialiased transition-colors duration-300`} style={{ background: "var(--bg)", color: "var(--body)" }}>
      <style>{STYLE}</style>

      {activeProject ? (
        <>
          <div className="fixed top-0 left-0 h-[2px] z-[60]" style={{ background: activeProject.color, width: "100%" }} />
          <nav className="glass fixed top-0 inset-x-0 z-50">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
              <button onClick={goHomeToProjects} aria-label="Back to home" className="icon-anim"><span className="mh-logo">MH</span></button>
              <div className="flex items-center gap-5">
                <a href={activeProject.link} target="_blank" rel="noreferrer" className="text-[13.5px] font-semibold flex items-center gap-2 transition-opacity hover:opacity-60" style={{ color: "var(--muted)" }}>
                  <Ph name={PH.navGithub} color="currentColor" size={16} /> Repo
                </a>
                <button onClick={toggleTheme} aria-label="Toggle theme" className="icon-anim" style={{ color: "var(--muted)" }}>
                  <Ph name={theme === "dark" ? PH.themeSun : PH.themeMoon} color="currentColor" size={20} />
                </button>
              </div>
            </div>
          </nav>
          <ProjectPage project={activeProject} goHome={goHomeToProjects} />
        </>
      ) : (
        <>
        <div className="absolute top-0 inset-x-0 h-[480px] overflow-hidden pointer-events-none aurora-fade" aria-hidden="true">
          <div className="aurora-wash"></div>
          <div className="aurora-orb w-96 h-96 -top-24 -left-20" style={{ background: "#7c3aed", animation: "driftA 14s ease-in-out infinite" }}></div>
          <div className="aurora-orb w-80 h-80 -top-10 right-10" style={{ background: "#0284c7", animation: "driftB 18s ease-in-out infinite" }}></div>
          <div className="aurora-orb w-72 h-72 top-40 left-1/3" style={{ background: "#db2777", animation: "driftC 16s ease-in-out infinite" }}></div>
        </div>

        <div className="fixed top-0 left-0 h-[2px] z-[60] transition-[width] duration-150" style={{ background: "var(--main)", width: `${progress}%` }} />

        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"
          className={`fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
          style={{ background: "var(--main)", color: "#fff", boxShadow: "0 8px 22px -8px rgba(79,70,229,.6)" }}>
          <Ph name={PH.backTop} color="#fff" size={18} />
        </button>

        <nav className="glass fixed top-0 inset-x-0 z-50">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <button onClick={() => goto("#top")} aria-label="Mena Hanna, home" className="icon-anim"><span className="mh-logo">MH</span></button>
            <div className="hidden md:flex items-center gap-7">
              {NAV_LINKS.map((l) => (
                <button key={l.href} onClick={() => goto(l.href)} className="text-[13.5px] font-medium transition-opacity hover:opacity-60" style={{ color: "var(--muted)" }}>{l.label}</button>
              ))}
              <button onClick={toggleTheme} aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} className="icon-anim" style={{ color: "var(--muted)" }}>
                <Ph name={theme === "dark" ? PH.themeSun : PH.themeMoon} color="currentColor" size={20} />
              </button>
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-[13px] font-semibold px-2" style={{ color: "var(--heading)" }}>{menuOpen ? "Close" : "Menu"}</button>
          </div>
          {menuOpen && (
            <div className="md:hidden px-6 py-5 flex flex-col gap-4" style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}>
              {NAV_LINKS.map((l) => (
                <button key={l.href} onClick={() => { setMenuOpen(false); goto(l.href); }} className="text-[15px] font-medium text-left" style={{ color: "var(--body)" }}>{l.label}</button>
              ))}
              <button onClick={toggleTheme} className="text-[15px] font-medium text-left" style={{ color: "var(--body)" }}>
                {theme === "dark" ? "Light mode" : "Dark mode"}
              </button>
            </div>
          )}
        </nav>

        <header id="top" className="relative max-w-6xl mx-auto px-6 pt-36 pb-20">
          <div className="grid lg:grid-cols-3 gap-14 items-start">
            <div className="lg:col-span-2">
              <p className="eyebrow mb-6 in" style={{ animationDelay: "0.05s" }}>Hi, my name is</p>
              <h1 className="h-display in" style={{ color: "var(--heading)", animationDelay: "0.1s" }}>Mena Hanna.</h1>
              <p className="mt-5 text-[18px] font-semibold min-h-[1.7rem] in" style={{ color: "var(--main)", animationDelay: "0.15s" }}>
                {typed}<span className="caret">|</span>
              </p>
              <p className="mt-6 prose-measure leading-[1.7] in" style={{ animationDelay: "0.2s" }}>
                I'm a sales development representative and frontend developer in Milford,
                Massachusetts. I build web apps with React, small games in C++ and Unity,
                and I'm open to software engineering and tech sales roles.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4 in" style={{ animationDelay: "0.25s" }}>
                <a href="#projects" className="btn-accent" onClick={(e) => { e.preventDefault(); goto("#projects"); }}>See my projects</a>
                <a href="#contact" className="btn" onClick={(e) => { e.preventDefault(); goto("#contact"); }}>Get in touch</a>
                <div className="flex items-center gap-4 ml-1">
                  <a href="https://github.com/meenahanna" target="_blank" rel="noreferrer" aria-label="GitHub" className="icon-anim w-10 h-10 rounded-lg border items-center justify-center" style={{ borderColor: "var(--border)" }}>
                    <Ph name={PH.navGithub} color={COLORS[11]} size={20} />
                  </a>
                  <a href="https://www.linkedin.com/in/mena-hanna-32182b26b/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="icon-anim w-10 h-10 rounded-lg border items-center justify-center" style={{ borderColor: "var(--border)" }}>
                    <Ph name={PH.navLinkedin} color={COLORS[1]} size={20} />
                  </a>
                  <a href="mailto:hannamina2004@gmail.com" aria-label="Email" className="icon-anim w-10 h-10 rounded-lg border items-center justify-center" style={{ borderColor: "var(--border)" }}>
                    <Ph name={PH.navMail} color={COLORS[4]} size={20} />
                  </a>
                </div>
              </div>
            </div>

            <div className="card overflow-hidden in" style={{ animationDelay: "0.3s" }}>
              <div className="px-5 py-3 flex items-center gap-2.5" style={{ borderBottom: "1px solid var(--border)" }}>
                <span className="w-2 h-2 rounded-full live-dot" style={{ background: "var(--live)" }}></span>
                <span className="label">Currently</span>
              </div>
              {CURRENTLY.map((row) => (
                <div key={row.k} className="px-5 py-3.5 flex items-center gap-4" style={{ borderBottom: "1px solid var(--border)" }}>
                  <span className="icon-anim w-8 shrink-0"><Ph name={row.icon} color={row.color} size={20} /></span>
                  <div className="flex flex-col">
                    <span className="label" style={{ fontSize: "11px" }}>{row.k}</span>
                    <span className="text-[15px] font-medium" style={{ color: "var(--heading)" }}>
                      {row.live && <span className="inline-block w-1.5 h-1.5 rounded-full live-dot mr-2 align-middle" style={{ background: "var(--live)" }}></span>}
                      {row.v}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </header>

        <section id="about" className="max-w-6xl mx-auto px-6 py-20 hairline">
          <Reveal><SectionHeading n="01 / About" title="About me" id="about" /></Reveal>
          <Reveal>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-5 leading-[1.7]">
                <p>I graduated from UMass Lowell with a B.S. in Computer Science. The degree gave me the fundamentals: C, C++, Python, Java, and JavaScript, plus data structures, algorithms, OOP, and cloud computing.</p>
                <p>The fun part happened outside of class. I build web apps with React, HTML, and CSS (my Pokemon Trainer License generator runs on AWS), and I have made small games in C++ with SFML and Unity with C#. Making something people actually use is the whole point for me.</p>
              </div>
              <div className="space-y-5 leading-[1.7]">
                <p>Professionally, I kept a production website running as a web intern at New Objective, evaluated LLM outputs at Outlier (where I earned Oracle status, their recognition for top raters) and at Handshake, and ran the front desk of a UMass Lowell residence hall for over two years.</p>
                <p>Right now I am an SDR with Reveneer, currently serving AppViewX, the leading machine identity and certificate lifecycle automation platform. My technical background helps me speak the language of the engineers and security teams I call every day.</p>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="skills" className="max-w-6xl mx-auto px-6 py-20 hairline">
          <Reveal><SectionHeading n="02 / Skills" title="What I work with" id="skills" /></Reveal>
          <div className="grid sm:grid-cols-2 gap-x-14 gap-y-7">
            {SKILLS.map((s, i) => (
              <Reveal key={s.group} delay={i * 40}>
                <div className="flex items-start gap-4">
                  <span className="icon-anim mt-0.5"><Ph name={s.icon} color={s.color} size={22} /></span>
                  <div>
                    <h3 className="h-item" style={{ color: "var(--heading)" }}>{s.group}</h3>
                    <p className="text-[15px] leading-[1.8] mt-1.5">{s.items.join("   ·   ")}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="stack" className="max-w-6xl mx-auto px-6 py-20 hairline">
          <Reveal><SectionHeading n="03 / Outbound" title="How my outbound runs" id="stack" /></Reveal>
          <Reveal>
            <p className="prose-measure leading-[1.7] mb-12">
              No fluff. This is the loop I run every week as an SDR with Reveneer, which
              builds and runs outbound sales teams for tech companies. I started on the
              Rainbird Technologies account and I am now serving AppViewX, with the three
              tools I open every morning: Salesforce, Salesloft, and HubSpot.
            </p>
          </Reveal>

          <Reveal>
            <div className="grid sm:grid-cols-3 gap-4 mb-14">
              {[
                { icon: PH.mDials, color: COLORS[3], v: "60-100", l: "dials per day" },
                { icon: PH.mWeek, color: COLORS[8], v: "300-500", l: "dials per week" },
                { icon: PH.mSource, color: COLORS[12], v: "25-30", l: "prospects sourced daily" },
              ].map((m) => (
                <div key={m.l} className="card px-6 py-6 text-center group">
                  <span className="icon-anim mx-auto mb-3 w-fit"><Ph name={m.icon} color={m.color} size={24} /></span>
                  <p className="text-3xl font-extrabold text-main">{m.v}</p>
                  <p className="label mt-2">{m.l}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-14">
            <div>
              <Reveal>
                <h3 className="h-item mb-5 flex items-center gap-2.5" style={{ color: "var(--heading)" }}>
                  <span className="icon-anim"><Ph name={PH.hDay} color={COLORS[9]} size={20} /></span>
                  A day in my dial blocks
                </h3>
              </Reveal>
              {DAY_SCHEDULE.map((d, i) => (
                <Reveal key={d.time} delay={i * 40}>
                  <div className="flex gap-6 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
                    <span className="text-[13px] font-bold pt-1 w-12 shrink-0 text-main">{d.time}</span>
                    <p className="text-[15px] leading-relaxed">{d.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div>
              <Reveal>
                <h3 className="h-item mb-5 flex items-center gap-2.5" style={{ color: "var(--heading)" }}>
                  <span className="icon-anim"><Ph name={PH.hSeq} color={COLORS[14]} size={20} /></span>
                  The 5-step sequence
                </h3>
              </Reveal>
              {SEQUENCE.map((s, i) => (
                <Reveal key={s.day} delay={i * 40}>
                  <div className="py-4" style={{ borderBottom: "1px solid var(--border)" }}>
                    <p className="text-[15px] font-semibold" style={{ color: "var(--heading)" }}>
                      <span className="text-main mr-2">{String(i + 1).padStart(2, "0")}</span>
                      {s.type}
                      <span className="font-normal" style={{ color: "var(--muted)" }}>&nbsp;&nbsp;·&nbsp;&nbsp;{s.day}</span>
                    </p>
                    <p className="text-[15px] leading-relaxed mt-1">{s.text}</p>
                  </div>
                </Reveal>
              ))}
              <Reveal>
                <p className="text-[15px] leading-relaxed mt-7" style={{ color: "var(--muted)" }}>
                  Subject lines get A/B tested in Salesloft. The losing variant gets cut every
                  Friday. Salesforce stays clean, because a messy CRM is a lie you tell yourself.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="experience" className="max-w-6xl mx-auto px-6 py-20 hairline">
          <Reveal><SectionHeading n="04 / Experience" title="Where I have worked" id="experience" /></Reveal>
          <div className="grid lg:grid-cols-2 gap-x-14 gap-y-12">
            {EXPERIENCE.map((job) => (
              <Reveal key={job.role + job.org}>
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="h-item" style={{ color: "var(--heading)" }}>
                      {job.role}
                      {job.current && <span className="inline-block w-2 h-2 rounded-full live-dot ml-2.5 align-middle" style={{ background: "var(--live)" }}></span>}
                    </h3>
                    <span className="text-[13px] font-medium" style={{ color: job.current ? "var(--live)" : "var(--muted)" }}>{job.period}</span>
                  </div>
                  <p className="text-[15px] font-medium mt-0.5" style={{ color: job.color }}>{job.org}</p>
                  <ul className="mt-3 space-y-2 text-[15px] leading-relaxed">
                    {job.points.map((p, j) => (
                      <li key={j} className="flex gap-3">
                        <span className="shrink-0 mt-[9px] w-1.5 h-1.5 rounded-full" style={{ background: job.color }}></span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-14 card px-6 py-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="h-item flex items-center gap-2.5" style={{ color: "var(--heading)" }}>
                  <span className="icon-anim"><Ph name={PH.degree} color={COLORS[2]} size={20} /></span>
                  B.S. Computer Science, UMass Lowell
                </h3>
                <p className="text-[15px] mt-2 leading-[1.8]">C · C++ · Python · Java · JavaScript · data structures · algorithms · OOP · cloud</p>
              </div>
              <span className="eyebrow" style={{ fontSize: "11px" }}>Completed</span>
            </div>
          </Reveal>
        </section>

        <section id="projects" className="max-w-6xl mx-auto px-6 py-20 hairline">
          <Reveal><SectionHeading n="05 / Projects" title="Things I have built" id="projects" /></Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.slug} delay={i * 40} className="h-full">
                <div onClick={() => goto(`#/project/${p.slug}`)} className="card card-hover p-7 h-full flex flex-col" role="button" tabIndex={0}
                     onKeyDown={(e) => { if (e.key === "Enter") goto(`#/project/${p.slug}`); }}>
                  <div className="flex items-start gap-4">
                    <span className="icon-anim mt-0.5"><Ph name={p.icon} color={p.color} size={26} /></span>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="h-item" style={{ color: "var(--heading)" }}>{p.title}</h3>
                        <span className="shrink-0 text-[13px] font-semibold text-main">details →</span>
                      </div>
                      <p className="text-[15px] leading-relaxed mt-2">{p.card}</p>
                      <p className="text-[13px] font-medium mt-2.5" style={{ color: "var(--muted)" }}>{p.tags}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-9 text-[15px]">
              Everything else lives on{" "}
              <a href="https://github.com/meenahanna" target="_blank" rel="noreferrer" className="text-link">GitHub</a>
              {" "}— including hw1, HW2-repo, and more from my GUI course.
            </p>
          </Reveal>
        </section>

        <section id="contact" className="max-w-6xl mx-auto px-6 py-20 hairline">
          <Reveal><SectionHeading n="06 / Contact" title="Say hi" id="contact" /></Reveal>
          <div className="grid lg:grid-cols-2 gap-14">
            <Reveal>
              <div>
                <p className="leading-[1.7] text-[18px]" style={{ color: "var(--heading)" }}>
                  Want to talk about sales roles, engineering work, or something you are
                  building? My inbox is open and I reply fast.
                </p>
                <p className="mt-5 text-[18px] font-bold">
                  <a href="mailto:hannamina2004@gmail.com" className="text-link">hannamina2004@gmail.com</a>
                </p>
                <div className="flex items-center gap-4 mt-8">
                  <a href="https://github.com/meenahanna" target="_blank" rel="noreferrer" aria-label="GitHub" className="icon-anim w-10 h-10 rounded-lg border items-center justify-center" style={{ borderColor: "var(--border)" }}>
                    <Ph name={PH.navGithub} color={COLORS[11]} size={20} />
                  </a>
                  <a href="https://www.linkedin.com/in/mena-hanna-32182b26b/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="icon-anim w-10 h-10 rounded-lg border items-center justify-center" style={{ borderColor: "var(--border)" }}>
                    <Ph name={PH.navLinkedin} color={COLORS[1]} size={20} />
                  </a>
                </div>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="eyebrow block mb-2" style={{ fontSize: "11px" }}>Name</label>
                    <input placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 text-[15px] rounded-lg focus:outline-none transition-colors duration-200 focus:border-[color:var(--main)]" style={inputStyle} />
                  </div>
                  <div>
                    <label className="eyebrow block mb-2" style={{ fontSize: "11px" }}>Email</label>
                    <input type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 text-[15px] rounded-lg focus:outline-none transition-colors duration-200 focus:border-[color:var(--main)]" style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label className="eyebrow block mb-2" style={{ fontSize: "11px" }}>Message</label>
                  <textarea rows={5} placeholder="What is on your mind?" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 text-[15px] rounded-lg resize-none focus:outline-none transition-colors duration-200 focus:border-[color:var(--main)]" style={inputStyle} />
                </div>
                <a href={mailtoHref} className="btn-accent inline-flex items-center gap-2.5">
                  Send message <Ph name={PH.navMail} color="#fff" size={16} />
                </a>
                <p className="text-[13px]" style={{ color: "var(--muted)" }}>
                  Fills in your name and message, then opens your email app. You press send.
                </p>
              </form>
            </Reveal>
          </div>
        </section>

        <footer className="hairline">
          <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px]" style={{ color: "var(--muted)" }}>
            <p>&copy; {new Date().getFullYear()} Mena Hanna</p>
            <p>Designed and built by me</p>
          </div>
        </footer>
        </>
      )}
    </div>
  );
}
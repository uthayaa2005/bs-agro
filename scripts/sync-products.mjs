import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const tmp = process.env.TEMP || "/tmp";
const src = JSON.parse(
  fs.readFileSync(path.join(tmp, "bs-all-products.json"), "utf8")
);

const nameFix = {
  "RD Exle 23 Weeder Rotavator":
    "5 Feet 24 Blade Weeder Rotavator",
  "RD Exle 21 Banana Rotavator":
    "6 Feet 42 Blade Double Side Drive Rotavator",
  "RD Exle 52 Multi Speed Rotavator":
    "24 Blade 4 Feet Mini Rotavator",
  "RD Exle 54 Multi Speed Rotavator":
    "20 Blade 3.5 Feet Mini Rotavator",
  "3 feet  22 blade Reverse Forward Rotavator":
    "3 Feet 22 Blade Reverse Forward Rotavator",
  "42 blade dobul sid draive high clearance  Rotavator":
    "42 Blade Double Side Drive High Clearance Rotavator",
  "42 blade heavy duty high clearance multi Speed Rotavator":
    "42 Blade Heavy Duty High Clearance Multi Speed Rotavator",
  "42 blade medium heavy high clearance multi  speed  Rotavator":
    "42 Blade Medium Heavy High Clearance Multi Speed Rotavator",
  "48 ljf blade  Multi  Speed Rotavator": "48 LJF Blade Multi Speed Rotavator",
  "42 blade rotavator multi Speed  regular Rotavator":
    "42 Blade Multi Speed Regular Rotavator",
  "36 blade Multi Speed regular model Rotavator":
    "36 Blade Multi Speed Regular Rotavator",
  "28 blade multi Speed regular model Rotavator":
    "28 Blade Multi Speed Regular Rotavator",
  "20 blade single Speed Rotavator": "20 Blade Single Speed Rotavator",
  "36 blade medium heavy  high clearance Multi  speed rotavators":
    "36 Blade Medium Heavy High Clearance Multi Speed Rotavator",
  "250 RPM Heavy Duty  Gear Box": "42 Blade Ultra Clearance Banana Rotavator",
  "34inch Rotavator PTO Shaft": "34 Inch Rotavator PTO Shaft",
  "4 Feet  30 Blade  Multi Speed Rotavator":
    "4 Feet 30 Blade Multi Speed Rotavator",
  "29inch Rotavator Side Disk": "29 Inch Rotavator Side Disk",
  "Single Speed Rotary Tiller": "Reverse Forward Tiller Rotavator",
  "36 blade big top link multi speed rotavator":
    "36 Blade Big Top Link Multi Speed Rotavator",
};

const catMap = {
  "Agriculture Rotavator": "Rotavator",
  "Agriculture Rotavator Gear Boxes": "Gear Box",
  "Agriculture Rotavator Accessories": "Accessories",
  "Agriculture Rotavator Tiller": "Tiller",
  Rotavator: "Rotavator",
  "Agriculture Rotavator Side Disk": "Side Disk",
  "Agricultural Ridger": "Ridger",
  "New Items": "New Items",
};

const specKeyMap = {
  "Overall Width (Feet)": "Width",
  "Working Width": "Width",
  "Number Of Blades": "Blades",
  "Number of Blades": "Blades",
  "Number Of Blade": "Blades",
  "Number of Blade": "Blades",
  "Tractor Power": "HP",
  "Model Name/Number": "Model",
  "No of Tynes": "Tynes",
};

const icons = {
  Rotavator: "🔄",
  "Gear Box": "⚙️",
  Accessories: "🔩",
  Tiller: "🌱",
  Rotavator: "🔄",
  "Side Disk": "💿",
  Ridger: "🌾",
  "New Items": "✨",
};

function formatPrice(p) {
  const m = p.match(/₹(\d+)(\/.*)?/);
  if (!m) return p;
  const num = Number(m[1]).toLocaleString("en-IN");
  return `₹${num}${m[2] || "/Piece"}`;
}

function normalizeSpec(raw) {
  const out = {};
  for (const [k, v] of Object.entries(raw)) {
    let key = specKeyMap[k] || k;
    if (key === "Certied") key = "Certified";
    if (key === "Usage/Application") key = "Usage";
    let val = String(v).replace(/\s+/g, " ").trim();
    if (/argo/i.test(val) && val.includes("Argo")) val = val.replace(/Argo/g, "Agro");
    if (/singl/i.test(val)) val = val.replace(/singl\s*speed/i, "Single Speed");
    if (key === "Certified" && val === "ISO") continue;
    out[key] = val;
  }
  return out;
}

const descOverrides = {
  "3 Feet 16 Blade Single Speed Rotavator":
    "Entry-level single-speed rotavator with 16 blades and 3 feet working width. Ideal for 35–50 HP tractors on small to medium farms. BS Agro direct manufacturer price from Salem.",
  "5 Feet 24 Blade Weeder Rotavator":
    "Specialised weeder rotavator with 24 blades and 5 feet width — combines soil preparation and weed control in one pass.",
  "6 Feet 42 Blade Double Side Drive Rotavator":
    "Heavy-duty 6 feet double side drive rotavator with 42 blades for deep, uniform tillage on medium to large farms.",
  "3 Feet 22 Blade Reverse Forward Rotavator":
    "Reverse and forward rotavator with 22 Y-type blades, mild steel build, 3 feet working width. Saves fuel and labour on compact fields.",
  "20 Blade 3.5 Feet Mini Rotavator":
    "Compact 3.5 feet mini rotavator with 20 blades — ideal for small tractors and tight field work.",
  "42 Blade Ultra Clearance Banana Rotavator":
    "42 blade ultra clearance banana rotavator for plantation tillage — heavy-duty build for banana and wide-row crops.",
  "24 Blade 4 Feet Mini Rotavator":
    "Compact 4 feet mini rotavator with 24 blades — ideal for smaller tractors and narrow fields.",
  "Reverse Forward Tiller Rotavator":
    "Reverse and forward tiller rotavator with 36 blades and 5 feet width — versatile soil preparation in both directions.",
  "Hydraulic Reversible M B Plough":
    "Hydraulic reversible MB plough for 45 HP tractors, 2 tynes. Efficient primary tillage with auto reset.",
};

function buildDesc(name, spec) {
  const bits = Object.entries(spec)
    .slice(0, 4)
    .map(([k, v]) => `${k}: ${v}`)
    .join(" · ");
  return `${name} from B S Agro Equipments, Salem. ${
    bits ? `Key details: ${bits}. ` : ""
  }Direct manufacturer of rotavators and agricultural machinery. Call for quote and Tamil Nadu delivery.`;
}

function buildFeatures(spec) {
  const entries = Object.entries(spec).map(([k, v]) => `${k}: ${v}`);
  return entries.length
    ? entries
    : [
        "BS Agro Equipments — Salem manufacturer",
        "Factory-direct pricing available",
        "Pan-Tamil Nadu delivery on request",
      ];
}

const existing = fs.readFileSync(path.join(root, "src/data/data.js"), "utf8");
const reviewsMatch = existing.match(/export const reviews = \[[\s\S]*?\];/);
const tickMatch = existing.match(/export const tickItems = \[[\s\S]*?\];/);

const products = src.map((p, i) => {
  const name = nameFix[p.name] || p.name.replace(/\s+/g, " ").trim();
  const cat = catMap[p.cat] || p.cat;
  const spec = normalizeSpec(p.spec);
  const price = formatPrice(p.price);
  let img = p.img;
  if (name === "Agricultural Plough") {
    img =
      "https://5.imimg.com/data5/SELLER/Default/2024/1/380817267/FL/OI/KA/20664883/compressjpeg-online-image-500x500.jpg";
  }
  const badge =
    name === "3 Feet 16 Blade Single Speed Rotavator"
      ? "Popular"
      : cat === "New Items" && name !== "Agricultural Plough"
        ? "New"
        : "";

  return {
    id: i + 1,
    name,
    cat,
    price,
    badge,
    icon: icons[cat] || "🚜",
    img,
    imgs: [],
    spec,
    desc: descOverrides[name] || buildDesc(name, spec),
    features: buildFeatures(spec),
  };
});

const file = `// =====================================================
// PRODUCT DATA — BS Agro Equipments
// Synced from https://www.bsagrorotavator.com/
// =====================================================

export const products = ${JSON.stringify(products, null, 2)};

${reviewsMatch[0]}

${tickMatch[0]}
`;

fs.writeFileSync(path.join(root, "src/data/data.js"), file);
console.log(`Updated ${products.length} products in src/data/data.js`);

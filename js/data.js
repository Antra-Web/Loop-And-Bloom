/* Loop & Bloom — shared content data */

function img(id, w) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w || 1200}&q=80`;
}

const PRODUCTS = [
  {
    id: "daisy-bouquet",
    name: "Daisy Crochet Bouquet",
    category: "Flowers",
    price: 38,
    tagline: "Seven daisies, hand-shaped and never wilting.",
    description: "A hand-shaped bunch of seven cotton daisies, each petal looped one stitch at a time and set on bendable wire stems so they can be arranged in a vase or tucked into a bookshelf. No two bouquets close their petals quite the same way, which is the whole point.",
    colors: ["Ivory & Gold", "Blush & Sage", "Berry & Cream"],
    images: [img("photo-1700171518313-5dd219beaaa6"), img("photo-1700170447159-9d2d0da133a5")],
    included: "One bouquet of 7 crocheted daisies, wrapped stems, and a kraft paper cuff tied with cotton twine.",
    materials: "100% cotton yarn, floral wire stems, cotton batting fill.",
    care: "Dust with a dry, soft brush. Keep away from direct heat. Reshape petals gently by hand if flattened in transit.",
    madeToOrder: true
  },
  {
    id: "sunburst-bloom",
    name: "Sunburst Bloom Bundle",
    category: "Flowers",
    price: 34,
    tagline: "Five sunflowers for a windowsill that needs one.",
    description: "Bright, sunny, and stitched in a gradient of gold to amber, this bundle of five mini sunflowers is one of our most requested pieces. They hold their shape in a mug, a jar, or a gift box — wherever a little sunshine is needed.",
    colors: ["Classic Gold", "Warm Amber", "Soft Butter"],
    images: [img("photo-1708000077538-c7dfba8037d6"), img("photo-1753366556705-1f657d2fa4db")],
    included: "5 crocheted sunflowers on wire stems, tied with a linen ribbon.",
    materials: "Cotton and acrylic-blend yarn, floral wire, brown button centers.",
    care: "Spot clean only. Store upright in a dry space.",
    madeToOrder: true
  },
  {
    id: "wildmeadow-mini",
    name: "Wildmeadow Mini Bouquet",
    category: "Flowers",
    price: 27,
    tagline: "A pocket-sized field of mixed blooms.",
    description: "Three mixed blossoms scaled down for a nightstand, a desk, or a card left on someone's doorstep. Every Wildmeadow bundle is a slightly different mix, pulled from whatever the studio has been growing in yarn that week.",
    colors: ["Meadow Mix", "Berry Mix"],
    images: [img("photo-1700170928599-d7fc2d4ec97f"), img("photo-1783943579121-da2fab12bbf9")],
    included: "3 mini crocheted flowers, floral tape stems, muslin gift pouch.",
    materials: "Cotton yarn, floral wire, muslin.",
    care: "Dust gently. Avoid moisture.",
    madeToOrder: false
  },
  {
    id: "berry-bear",
    name: "Berry Bear Plushie",
    category: "Plushies",
    price: 42,
    tagline: "A round little bear with a berry-pink nose.",
    description: "Berry Bear is stitched in soft worsted-weight yarn and stuffed firm enough to sit up on his own. He's one of our longest-running patterns, refined over three years of orders until his ears sat exactly right.",
    colors: ["Honey & Berry", "Oat & Rose", "Cocoa & Cream"],
    images: [img("photo-1627693685101-687bf0eb1222"), img("photo-1626241803094-88edd8ae6453")],
    included: "One 8-inch plushie with embroidered face and safety-tested fill.",
    materials: "Acrylic yarn, polyester fiberfill, embroidery thread.",
    care: "Surface wipe with a damp cloth. Air dry fully before storing.",
    madeToOrder: true
  },
  {
    id: "cloud-bunny",
    name: "Cloud Bunny",
    category: "Plushies",
    price: 36,
    tagline: "Soft, floppy-eared, and impossible not to hug.",
    description: "Cloud Bunny is worked in a fluffy brushed yarn that feels closer to a cloud than a ball of wool. His ears are weighted just enough to flop instead of stand — a small detail that took four tries to get right.",
    colors: ["Cloud White", "Petal Pink", "Sage Grey"],
    images: [img("photo-1629019317873-3f603b269723"), img("photo-1753370230699-8e21227afeb6")],
    included: "One 9-inch plushie with soft-brushed yarn coat.",
    materials: "Brushed acrylic yarn, polyester fiberfill.",
    care: "Spot clean with mild soap and water. Do not machine wash.",
    madeToOrder: true
  },
  {
    id: "forest-friends-trio",
    name: "Forest Friends Trio",
    category: "Plushies",
    price: 58,
    tagline: "Three woodland characters, sold as a set.",
    description: "A fox, an owl, and a hedgehog, scaled to sit together on a shelf or a nursery dresser. Each is worked from the same base pattern with different ears, colors, and faces — a little family that started as a single custom order.",
    colors: ["Woodland Mix"],
    images: [img("photo-1766090503766-623b62f0da26"), img("photo-1686151271777-12efa81f65e0")],
    included: "3 plushies, approx. 5–6 inches each.",
    materials: "Acrylic and cotton-blend yarn, polyester fiberfill.",
    care: "Surface wipe only. Keep out of direct sun to preserve color.",
    madeToOrder: true
  },
  {
    id: "shelf-sitters-duo",
    name: "Shelf Sitters Duo",
    category: "Plushies",
    price: 44,
    tagline: "Two small characters made to perch, not stand.",
    description: "Designed with flat, weighted bottoms so they balance neatly on a shelf edge or windowsill. This duo comes as a matched pair — perfect for a housewarming or a shared desk.",
    colors: ["Sage & Blush"],
    images: [img("photo-1686151573986-03b5a79f22a5"), img("photo-1744371760034-fb60ebd2b198")],
    included: "2 plushies, approx. 4 inches each.",
    materials: "Cotton yarn, polyester fiberfill, glass bead weighting.",
    care: "Dust with a soft brush.",
    madeToOrder: false
  },
  {
    id: "garden-keychain",
    name: "Garden Keychain",
    category: "Keychains",
    price: 16,
    tagline: "A tiny bloom that travels with your keys.",
    description: "A single crocheted flower charm on a brass keyring, small enough to disappear into a bag but bright enough to find at the bottom of one. Our most gifted item, usually bought two or three at a time.",
    colors: ["Marigold", "Blush", "Sage"],
    images: [img("photo-1682954013913-25fe41e180c0"), img("photo-1589912187345-e6f884f958af")],
    included: "1 crocheted charm on a brass keyring with lobster clasp.",
    materials: "Cotton yarn, brass hardware.",
    care: "Wipe clean. Keep dry.",
    madeToOrder: false
  },
  {
    id: "bloom-charm-keychain",
    name: "Mini Bloom Charm",
    category: "Keychains",
    price: 14,
    tagline: "A smaller cousin to the Garden Keychain.",
    description: "Half the size of our Garden Keychain and just as loved, this charm is stitched with a tapestry-weight yarn for extra durability against daily use — bags, backpacks, and belt loops included.",
    colors: ["Terracotta", "Cream", "Berry"],
    images: [img("photo-1682954100067-c4356f636c6b"), img("photo-1693326873444-d7cf33cad3e0")],
    included: "1 crocheted charm on a silver-tone keyring.",
    materials: "Cotton yarn, silver-tone hardware.",
    care: "Wipe clean with a dry cloth.",
    madeToOrder: false
  },
  {
    id: "willow-bag",
    name: "Willow Crochet Bag",
    category: "Bags",
    price: 72,
    tagline: "A market bag with a cotton lining sewn in by hand.",
    description: "Willow is worked in a sturdy cotton cord that holds its shape on the shoulder, then lined in natural cotton twill so nothing slips through the stitches. Roomy enough for a market trip, structured enough for everyday.",
    colors: ["Terracotta", "Oat", "Sage"],
    images: [img("photo-1622648147611-e817249f3b73"), img("photo-1543334270-a1c233b25539")],
    included: "One lined bag with wooden handles, approx. 14 x 12 in.",
    materials: "Cotton cord, cotton twill lining, wooden handles.",
    care: "Spot clean the exterior. Do not submerge.",
    madeToOrder: true
  },
  {
    id: "market-tote",
    name: "Market Day Tote",
    category: "Bags",
    price: 64,
    tagline: "An open-weave tote built for a Saturday errand.",
    description: "A lighter, open-weave sibling to the Willow bag, made for days when you want to see what's inside without unzipping anything. Stretches gently to fit an awkward loaf of bread.",
    colors: ["Natural", "Berry Stripe"],
    images: [img("photo-1594350532402-72001d9fe5a0"), img("photo-1703893679650-d3b72e503d96")],
    included: "One unlined tote with rolled handles, approx. 15 x 13 in.",
    materials: "Cotton cord.",
    care: "Hand wash cold, lay flat to dry.",
    madeToOrder: true
  },
  {
    id: "petal-scrunchie",
    name: "Bloom Scrunchie Set",
    category: "Accessories",
    price: 19,
    tagline: "Three scrunchies, each with a small crocheted bloom.",
    description: "A soft jersey scrunchie base topped with a single crocheted flower, sewn on securely enough to survive a real hair-tie's life. Sold as a set of three so you always have a spare.",
    colors: ["Blush Set", "Sage Set", "Terracotta Set"],
    images: [img("photo-1595301246497-be60fb9e235d"), img("photo-1630191631464-24a005b8cfda")],
    included: "3 scrunchies with attached crochet flower charms.",
    materials: "Cotton jersey, cotton yarn.",
    care: "Hand wash cold, air dry.",
    madeToOrder: false
  },
  {
    id: "hairclip-set",
    name: "Petal Hair Clip Trio",
    category: "Accessories",
    price: 22,
    tagline: "Three clips for the days a scrunchie isn't enough.",
    description: "Alligator clips topped with mini crocheted petals, glued and stitched twice over so they hold through a full day. A small, cheerful set that photographs beautifully in a gift box.",
    colors: ["Mixed Pastel", "Mixed Warm"],
    images: [img("photo-1591051649443-453d2e0a716d"), img("photo-1604510493959-8a20b3630d53")],
    included: "3 hair clips with crocheted flower toppers.",
    materials: "Cotton yarn, metal alligator clips.",
    care: "Wipe clean, keep dry.",
    madeToOrder: false
  },
  {
    id: "granny-cushion",
    name: "Granny Square Cushion",
    category: "Home",
    price: 54,
    tagline: "Twenty-five granny squares, joined by hand.",
    description: "A cushion cover built from twenty-five individually crocheted granny squares, joined in a warm gradient and finished with a hidden zip closure. Comes with a machine-washable inner.",
    colors: ["Terracotta Fade", "Sage Fade"],
    images: [img("photo-1703893679650-d3b72e503d96"), img("photo-1682953941870-a7aedb3b2e66")],
    included: "One 16 x 16 in cushion cover with a machine-washable inner.",
    materials: "Acrylic-cotton blend yarn, cotton backing, hidden zip.",
    care: "Cover: hand wash cold. Inner: machine washable.",
    madeToOrder: true
  },
  {
    id: "cottage-coaster",
    name: "Cottage Coaster Set",
    category: "Home",
    price: 24,
    tagline: "Four coasters, thick enough to hold a warm mug.",
    description: "Worked in a double-thickness stitch so they hold up under a hot mug without curling at the edges. A small, useful piece that tends to end up as a housewarming favorite.",
    colors: ["Warm Set", "Cool Set"],
    images: [img("photo-1595301390417-c66647b47e9f"), img("photo-1615310748224-9ac8874e14a1")],
    included: "Set of 4 coasters, approx. 4 in diameter.",
    materials: "Cotton yarn.",
    care: "Hand wash cold, air dry flat.",
    madeToOrder: false
  },
  {
    id: "sweetheart-gift",
    name: "Sweetheart Gift Bundle",
    category: "Gifts",
    price: 48,
    tagline: "A mini bouquet, a card, and a ribbon-tied box.",
    description: "Our most-gifted bundle: a Wildmeadow mini bouquet packed in a kraft box with a handwritten note card and a length of cotton ribbon, ready to hand over as-is.",
    colors: ["Blush Box", "Sage Box"],
    images: [img("photo-1689999015579-aaeaba5ebf69"), img("photo-1595301490405-0ae747be39f6")],
    included: "1 mini bouquet, kraft gift box, note card, ribbon.",
    materials: "Cotton yarn, recycled kraft packaging.",
    care: "See individual bouquet care.",
    madeToOrder: true
  },
  {
    id: "keepsake-bundle",
    name: "Keepsake Memory Bundle",
    category: "Gifts",
    price: 56,
    tagline: "A made-to-order keepsake built around your colors.",
    description: "Tell us the colors that matter — a wedding palette, a nursery scheme, a favorite jersey — and we'll build a small bundle of matching flowers and a charm around them. Popular for anniversaries and new babies alike.",
    colors: ["Custom on request"],
    images: [img("photo-1597736091383-084fa1b69a6a"), img("photo-1632649027900-389e810204e6")],
    included: "1 custom flower bundle, 1 matching charm, gift packaging.",
    materials: "Cotton yarn, floral wire, recycled packaging.",
    care: "See individual piece care.",
    madeToOrder: true
  }
];

const FEATURED_IDS = ["daisy-bouquet", "berry-bear", "garden-keychain", "willow-bag", "bloom-charm-keychain", "cloud-bunny"];

const GALLERY_ITEMS = [
  { img: img("photo-1700171518313-5dd219beaaa6", 900), category: "Flowers", caption: "Daisy heads drying before assembly" },
  { img: img("photo-1700170447159-9d2d0da133a5", 900), category: "Flowers", caption: "A finished bunch, ready to ship" },
  { img: img("photo-1627693685101-687bf0eb1222", 900), category: "Plushies", caption: "Berry Bear before his ribbon" },
  { img: img("photo-1753370230699-8e21227afeb6", 900), category: "Plushies", caption: "Cloud Bunny holding his carrot prop" },
  { img: img("photo-1766090503766-623b62f0da26", 900), category: "Plushies", caption: "A shelf of finished Forest Friends" },
  { img: img("photo-1595301246497-be60fb9e235d", 900), category: "Accessories", caption: "Scrunchie bases waiting for blooms" },
  { img: img("photo-1630191631464-24a005b8cfda", 900), category: "Accessories", caption: "Yarn picked for the next batch" },
  { img: img("photo-1632649027900-389e810204e6", 900), category: "Behind the Scenes", caption: "Mid-row on a Tuesday afternoon" },
  { img: img("photo-1597736091383-084fa1b69a6a", 900), category: "Behind the Scenes", caption: "Testing a new stitch tension" },
  { img: img("photo-1670764732015-61a5cc490ce1", 900), category: "Behind the Scenes", caption: "The hook drawer, mid-reorganize" },
  { img: img("photo-1633930965364-a95fe3dbf06d", 900), category: "Packaging", caption: "Coffee first, packing second" },
  { img: img("photo-1682953388513-6d9837b23512", 900), category: "Packaging", caption: "Notions bag, ready for the next order" }
];

const ARTICLES = [
  {
    slug: "story-behind-crochet-flowers",
    title: "The story behind our crochet flowers",
    date: "August 12, 2026",
    readTime: "4 min read",
    image: img("photo-1708000077538-c7dfba8037d6"),
    excerpt: "Our very first flower pattern was a mistake — a scarf edge that curled into a petal shape by accident.",
    body: [
      "Our very first flower pattern started as a mistake. A scarf edge, worked one stitch too tight, curled in on itself into something that looked less like a scarf and more like a petal. Instead of frogging it, we kept going around, and around, until it looked like a flower.",
      "That accidental daisy became the base for almost everything we make now. The bouquet you can order today still uses the same core stitch count from that first curled-up scarf edge, just refined over dozens of tries.",
      "What we've learned since is that flowers are forgiving in a way other crochet projects aren't. A slightly uneven petal reads as handmade character rather than a mistake. That's part of why they became the heart of the shop — they let the hand behind them show.",
      "These days every bouquet is still made one flower at a time, on the same size hook, from the same handful of colorways we've slowly built out since that first curled scarf edge."
    ]
  },
  {
    slug: "why-handmade-gifts-feel-different",
    title: "Why handmade gifts feel different",
    date: "July 30, 2026",
    readTime: "5 min read",
    image: img("photo-1689999015579-aaeaba5ebf69"),
    excerpt: "A handmade gift carries the time it took to make it, and people can feel that, even if they can't name it.",
    body: [
      "There's a specific kind of pause people make when they unwrap something handmade. It's not always bigger or shinier than a store-bought equivalent, but it reads differently — because it carries the time it took to make it, and time is the one thing nobody can buy back.",
      "We think that's the real reason handmade gifts land the way they do. A mass-produced item can be replaced by an identical one from the same shelf. A crocheted bouquet can't — even we couldn't make an exact copy of it if we tried.",
      "That imperfection is the point. It's proof that a person, not a machine, sat down and decided how this particular petal should curl.",
      "If you're choosing between a handmade piece and something faster to buy, that's usually the question worth asking: do you want this to be replaceable, or do you want it to be the only one like it?"
    ]
  },
  {
    slug: "how-to-care-for-crochet-pieces",
    title: "How to care for your crochet pieces",
    date: "July 14, 2026",
    readTime: "3 min read",
    image: img("photo-1594350532402-72001d9fe5a0"),
    excerpt: "Most crochet pieces need less care than people expect — mostly, they just need to be left alone.",
    body: [
      "Most of our pieces need less care than people expect. Cotton and acrylic yarn are both fairly hardy, and the biggest risk to a crocheted piece usually isn't dirt — it's heat and direct sun, which can warp shape and fade color over time.",
      "For plushies and keychains, a damp cloth and mild soap handle almost everything. Avoid the washing machine unless a product page says otherwise, since agitation can pull stitches out of shape.",
      "For flowers, the biggest enemy is moisture. Keep bouquets away from vases with actual water in them — display them dry, in a vase, jar, or simply set down on a shelf.",
      "And if a stitch does come loose, don't panic. Most repairs are a five-minute fix with a yarn needle, and we're always happy to talk you through it if you reach out."
    ]
  },
  {
    slug: "from-yarn-to-finished-piece",
    title: "From yarn to finished piece",
    date: "June 28, 2026",
    readTime: "6 min read",
    image: img("photo-1632649027900-389e810204e6"),
    excerpt: "Every piece starts as a plain skein on a shelf and ends somewhere in a stranger's home. Here's what happens between.",
    body: [
      "Every piece we make starts as a plain skein of yarn on a shelf, and most of the time, it has no idea yet what it's going to become. That decision happens at the very start of a project, when we choose a hook size and a stitch count based on the shape we're after.",
      "From there it's rows — sometimes dozens, sometimes a few hundred — worked one loop at a time. A small keychain charm might take twenty minutes. A lined market bag can take the better part of a day.",
      "Once the shape is finished, it moves to detailing: embroidered faces, sewn-on petals, woven-in ends. This is the slowest part and the part that's easiest to rush, so we try hardest not to.",
      "Finally, everything gets a once-over for loose threads, gets steamed or blocked into its final shape, and gets packaged. Then it leaves the studio and starts a completely different life somewhere else."
    ]
  },
  {
    slug: "five-handmade-gift-ideas",
    title: "5 thoughtful handmade gift ideas",
    date: "June 10, 2026",
    readTime: "4 min read",
    image: img("photo-1686150784894-eb52e4023493"),
    excerpt: "A short list of what to order when you know you want something handmade but not what, exactly.",
    body: [
      "1. For someone who just moved: a Granny Square Cushion in colors that match their new space. It fills a bare-looking sofa faster than almost anything else.",
      "2. For someone missing someone: a Keepsake Memory Bundle built around colors that matter to them — a childhood bedroom, a wedding palette, a favorite team.",
      "3. For someone who always loses their keys: a Garden Keychain. Small, cheap enough to buy without overthinking it, and genuinely useful.",
      "4. For a new parent: a Cloud Bunny or Berry Bear plushie, sized for a nursery shelf rather than a crib.",
      "5. For yourself, honestly: a Wildmeadow Mini Bouquet for your desk. It's the smallest thing we make, and disproportionately good at making a room feel less sterile."
    ]
  }
];

const TESTIMONIALS = [
  { quote: "I ordered a crochet bouquet for my sister and it was even more beautiful in person than in the photos.", name: "Priya Nair", location: "Austin, TX" },
  { quote: "Every detail felt so personal. You can genuinely see the love in the work, down to the stitching.", name: "Maren Olsen", location: "Portland, OR" },
  { quote: "The custom order process was easy and the plushie they made looks exactly like our dog.", name: "Diego Fuentes", location: "Chicago, IL" },
  { quote: "It arrived packaged so nicely I almost didn't want to open it. Almost.", name: "Sofia Bianchi", location: "Raleigh, NC" }
];

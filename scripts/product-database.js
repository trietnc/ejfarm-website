/**
 * EJ Farm - Product Database
 * Central repository for all product information
 * Used by: product-detail.js, collection-script.js
 */

const productDatabase = {
    "1": {
        id: "1",
        name: "Mo Nong Single Origin",
        subtitle: "Tasting Notes: Dark Chocolate, Blackberry, Caramel",
        price: 320000,
        priceString: "320,000₫",
        category: "coffee",
        badge: "bestseller",
        mainImage: "images/product-1.png",
        galleryImages: [
            "images/product-1.png",
            "images/product-1-2.png",
            "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800",
            "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800"
        ],
        longDescription: `Our signature coffee showcases the exceptional terroir of Mo Nong Highlands. Grown at 1,200 meters elevation in volcanic basalt soil, this medium roast delivers complex flavors with remarkable balance.

Each bag represents our commitment to quality and our partnership with local farming communities. The coffee cherries are hand-picked at peak ripeness, ensuring only the finest beans make it into your cup. The volcanic soil imparts unique mineral notes that complement the natural sweetness of the arabica beans.

This is more than coffee—it's a story of place, people, and patience. Every sip connects you to the misty highlands where indigenous farmers have cultivated these lands for generations.`,
        details: [
            { icon: "🌱", label: "Origin", value: "Mo Nong, Đắk Nông" },
            { icon: "⛰️", label: "Elevation", value: "1,200m" },
            { icon: "🔥", label: "Roast Level", value: "Medium-Dark" },
            { icon: "☕", label: "Process", value: "Washed" },
            { icon: "📦", label: "Weight", value: "250g" },
            { icon: "🌍", label: "Variety", value: "Arabica" }
        ]
    },
    "2": {
        id: "2",
        name: "Community Blend",
        subtitle: "Balanced & Approachable - Perfect for Daily Ritual",
        price: 280000,
        priceString: "280,000₫",
        category: "coffee",
        badge: "",
        mainImage: "images/product-2.png",
        galleryImages: [
            "images/product-2.png",
            "images/product-2-2.png",
            "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800",
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800"
        ],
        longDescription: `A celebration of collective harvest and community strength. This balanced blend is approachable yet sophisticated, perfect for your daily coffee ritual. Every bean tells a story of collaboration between multiple small-holder farmers.

The Community Blend represents our commitment to inclusivity. By sourcing from several farms across the highland region, we create opportunities for more families while crafting a consistently excellent cup. The blend's complexity comes from the diversity of micro-climates and processing methods.

With notes of milk chocolate, hazelnut, and a gentle citrus acidity, this coffee is designed for everyday enjoyment. It's forgiving in brewing, delicious as espresso, and comforting as a filter brew. This is the coffee that brings people together.`,
        details: [
            { icon: "🌱", label: "Origin", value: "Multi-Farm Blend" },
            { icon: "⛰️", label: "Elevation", value: "1,000-1,300m" },
            { icon: "🔥", label: "Roast Level", value: "Medium" },
            { icon: "☕", label: "Process", value: "Mixed Methods" },
            { icon: "📦", label: "Weight", value: "250g" },
            { icon: "🌍", label: "Variety", value: "Arabica Blend" }
        ]
    },
    "3": {
        id: "3",
        name: "Highland Reserve",
        subtitle: "Limited Edition - Honey Processed Arabica",
        price: 380000,
        priceString: "380,000₫",
        category: "coffee",
        badge: "new",
        mainImage: "images/product-3.png",
        galleryImages: [
            "images/product-3.png",
            "images/product-3-2.png",
            "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800",
            "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800"
        ],
        longDescription: `A limited edition release featuring our finest honey-processed Arabica beans. This rare processing method enhances the natural sweetness and creates a unique flavor profile with notes of honey, stone fruit, and floral undertones.

The honey process is labor-intensive and weather-dependent, requiring perfect conditions during the drying phase. The mucilage is left on the beans as they dry, allowing the natural sugars to ferment and create extraordinary complexity. The result is a coffee that's both familiar and exotic.

Only 500 bags of this Reserve are available. Each bag is numbered and represents a single harvest from our highest-elevation plots. This is a coffee for special moments, for slow mornings, for tasting with intention. Once it's gone, it may be years before conditions align for another harvest like this.`,
        details: [
            { icon: "🌱", label: "Origin", value: "Single Estate" },
            { icon: "⛰️", label: "Elevation", value: "1,400m" },
            { icon: "🔥", label: "Roast Level", value: "Light-Medium" },
            { icon: "☕", label: "Process", value: "Honey" },
            { icon: "📦", label: "Weight", value: "250g" },
            { icon: "🌍", label: "Variety", value: "Bourbon Arabica" }
        ]
    },
    "4": {
        id: "4",
        name: "Highland Cacao 70%",
        subtitle: "Bean-to-Bar - Deep, Fruity with Coffee Blossom Notes",
        price: 180000,
        priceString: "180,000₫",
        category: "chocolate",
        badge: "bestseller",
        mainImage: "images/5-enhanced.png",
        galleryImages: [
            "images/5-enhanced.png",
            "images/5-enhanced-2.png",
            "https://images.unsplash.com/photo-1511381939415-e44015466834?w=800",
            "https://images.unsplash.com/photo-1606312619070-d48b4fa708d7?w=800"
        ],
        longDescription: `Our most popular chocolate bar, crafted from cacao grown in the same volcanic soil as our coffee. The 70% cacao content provides deep, complex flavors with fruity notes and subtle hints of coffee blossom.

We are one of the few farms in Vietnam growing both coffee and cacao side by side. This unique terroir creates fascinating flavor connections—our chocolate naturally complements our coffee because they share the same earth, water, and air. The cacao trees grow in the shade of larger canopy trees, creating a forest garden ecosystem.

Bean-to-bar crafted in small batches, we control every step from harvest to wrapping. The beans are fermented for 5-7 days, sun-dried on bamboo mats, then roasted, ground, and conched in our micro-factory. Each bar is a labor of love and a testament to what's possible when you prioritize quality over quantity.`,
        details: [
            { icon: "🍫", label: "Cacao Content", value: "70%" },
            { icon: "🌱", label: "Origin", value: "Mo Nong Estate" },
            { icon: "⛰️", label: "Elevation", value: "1,100m" },
            { icon: "🌳", label: "Type", value: "Bean-to-Bar" },
            { icon: "📦", label: "Weight", value: "80g" },
            { icon: "🌍", label: "Variety", value: "Trinitario" }
        ]
    },
    "5": {
        id: "5",
        name: "Volcanic Dark 85%",
        subtitle: "Intense & Complex - For True Cacao Lovers",
        price: 200000,
        priceString: "200,000₫",
        category: "chocolate",
        badge: "",
        mainImage: "images/4-enhanced.png",
        galleryImages: [
            "images/4-enhanced.png",
            "https://images.unsplash.com/photo-1610450949065-1f2841536c88?w=800",
            "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800",
            "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=800"
        ],
        longDescription: `For true dark chocolate enthusiasts. This 85% cacao bar showcases the intense, complex character of highland-grown cacao. Minimal sugar allows the terroir to shine through with earthy, mineral notes balanced by natural fruit acidity.

This is not a casual chocolate—it demands your attention. The high cacao percentage reveals the raw power of our volcanic soil. You'll taste minerals, dark fruits, tobacco leaf, and a lingering bitterness that dark chocolate purists crave. It's meditation in bar form.

We recommend pairing this with our Mo Nong Single Origin coffee, or enjoying it slowly after dinner with a glass of red wine. Let each square melt on your tongue. Notice how the flavors evolve, how the texture changes, how your perception shifts. This is chocolate as art.`,
        details: [
            { icon: "🍫", label: "Cacao Content", value: "85%" },
            { icon: "🌱", label: "Origin", value: "Single Origin" },
            { icon: "⛰️", label: "Elevation", value: "1,200m" },
            { icon: "🌳", label: "Type", value: "Bean-to-Bar" },
            { icon: "📦", label: "Weight", value: "80g" },
            { icon: "🌍", label: "Variety", value: "Criollo Blend" }
        ]
    },
    "6": {
        id: "6",
        name: "Creamy Highland Milk",
        subtitle: "45% Cacao - Smooth & Balanced Sweetness",
        price: 160000,
        priceString: "160,000₫",
        category: "chocolate",
        badge: "",
        mainImage: "images/6-enhanced.png",
        galleryImages: [
            "images/6-enhanced.png",
            "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800",
            "https://images.unsplash.com/photo-1511381939415-e44015466834?w=800",
            "https://images.unsplash.com/photo-1543252986-d91b03f0e29e?w=800"
        ],
        longDescription: `A perfectly balanced milk chocolate with 45% cacao content. Creamy and smooth with just the right amount of sweetness. Made with locally sourced dairy and our highland cacao for a uniquely Vietnamese chocolate experience.

While dark chocolate gets all the attention, crafting an excellent milk chocolate is actually more challenging. The dairy must complement, not overwhelm, the cacao. The sugar must balance, not dominate. We spent two years perfecting this recipe, working with a local dairy cooperative to source the creamiest buffalo milk.

The result is a chocolate that appeals to all ages while still maintaining our commitment to quality. Children love it for its gentle sweetness. Adults appreciate its sophistication. It's nostalgic yet refined, familiar yet special. This is the chocolate that makes people smile.`,
        details: [
            { icon: "🍫", label: "Cacao Content", value: "45%" },
            { icon: "🌱", label: "Origin", value: "Mo Nong Cacao" },
            { icon: "🥛", label: "Dairy", value: "Local Buffalo Milk" },
            { icon: "🌳", label: "Type", value: "Bean-to-Bar" },
            { icon: "📦", label: "Weight", value: "80g" },
            { icon: "🌍", label: "Variety", value: "Trinitario" }
        ]
    },
    "7": {
        id: "7",
        name: "Highland Essentials",
        subtitle: "Coffee & Chocolate Pairing - Perfect Introduction",
        price: 480000,
        priceString: "480,000₫",
        category: "gift-set",
        badge: "new",
        mainImage: "images/gift-set-2-enhanced-2.png",
        galleryImages: [
            "images/gift-set-2-enhanced-2.png",
            "images/gift-set-2-enhanced.png",
            "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800",
            "https://images.unsplash.com/photo-1511381939415-e44015466834?w=800"
        ],
        longDescription: `The perfect introduction to EJ Farm. This curated set includes our Mo Nong Single Origin coffee and Highland Cacao 70% chocolate, beautifully packaged with tasting notes and brewing recommendations.

We designed this gift set for curious explorers—those who want to understand the connection between terroir and taste. The coffee and chocolate share the same volcanic soil, the same elevation, the same climate. When you taste them together, you'll notice the family resemblance: the mineral notes, the dark fruit undertones, the clean finish.

Each set comes with a small booklet explaining our farming practices, the indigenous communities we work with, and suggested pairing rituals. Whether you're gifting to a coffee lover, a chocolate enthusiast, or someone who appreciates both, this set tells our complete story in two delicious chapters.`,
        details: [
            { icon: "📦", label: "Includes", value: "Coffee (250g) + Chocolate (80g)" },
            { icon: "🎁", label: "Packaging", value: "Premium Gift Box" },
            { icon: "📖", label: "Extras", value: "Tasting Guide Included" },
            { icon: "🌱", label: "Origin", value: "Mo Nong Estate" },
            { icon: "💝", label: "Perfect For", value: "Gifts & First-Timers" },
            { icon: "🌍", label: "Story", value: "Full Farm-to-Table Journey" }
        ]
    },
    "8": {
        id: "8",
        name: "Premium Tasting Collection",
        subtitle: "Complete Experience - 3 Coffees + 3 Chocolates",
        price: 880000,
        priceString: "880,000₫",
        category: "gift-set",
        badge: "bestseller",
        mainImage: "images/gift-set-3-enhanced.png",
        galleryImages: [
            "images/gift-set-3-enhanced.png",
            "images/gift-set-3-enhanced-2.png",
            "https://images.unsplash.com/photo-1606312619070-d48b4fa708d7?w=800",
            "https://images.unsplash.com/photo-1511381939415-e44015466834?w=800"
        ],
        longDescription: `Experience the full range of Mo Nong terroir with this comprehensive tasting collection. Includes three distinct coffee origins and three chocolate percentages, complete with a detailed tasting guide.

This is our signature gift for true enthusiasts. The collection includes: Mo Nong Single Origin, Community Blend, and Highland Reserve coffees, paired with Highland Cacao 70%, Volcanic Dark 85%, and Creamy Highland Milk chocolates. Each product is presented in its full retail size—this is not a sample pack, but a complete exploration.

The included tasting journal guides you through a structured tasting experience. Learn to identify flavor notes, understand processing methods, and appreciate the nuances of volcanic highland agriculture. By the end of this collection, you'll have a sophisticated palate and a deep connection to the farmers who made it all possible.`,
        details: [
            { icon: "📦", label: "Includes", value: "3 Coffees + 3 Chocolates" },
            { icon: "🎁", label: "Packaging", value: "Luxury Gift Box" },
            { icon: "📖", label: "Extras", value: "Detailed Tasting Journal" },
            { icon: "🌱", label: "Origin", value: "Complete Estate Range" },
            { icon: "💝", label: "Perfect For", value: "Enthusiasts & Collectors" },
            { icon: "🌍", label: "Value", value: "15% Savings vs Individual" }
        ]
    },
    "9": {
        id: "9",
        name: "Heritage Gift Box",
        subtitle: "Premium Corporate Gift - Beautifully Packaged",
        price: 1200000,
        priceString: "1,200,000₫",
        category: "gift-set",
        badge: "",
        mainImage: "images/gift-set-4-enhanced.png",
        galleryImages: [
            "images/gift-set-4-enhanced.png",
            "images/gift-set-4-enhanced-2.png",
            "https://images.unsplash.com/photo-1511381939415-e44015466834?w=800",
            "https://images.unsplash.com/photo-1606312619070-d48b4fa708d7?w=800"
        ],
        longDescription: `Our most premium offering, elegantly packaged for corporate gifting or special occasions. Includes our finest coffees, chocolates, and a photo book telling the story of our farming partners and the Mo Nong Highlands.

The Heritage Gift Box is designed to make a lasting impression. Each box is hand-assembled and includes: two bags of our rarest coffee, three chocolate bars spanning our full range, a hardcover photo book documenting life on the farm, and a handwritten note from our farming families. Everything is presented in a custom wooden box crafted by local artisans.

Each box is individually numbered and registered. Corporate clients can customize the handwritten note, making this perfect for executive gifting, milestone celebrations, or special client relationships. This is more than a gift—it's a connection to something meaningful, a story worth sharing, and a taste worth remembering.`,
        details: [
            { icon: "📦", label: "Includes", value: "Premium Coffee + Chocolate + Photo Book" },
            { icon: "🎁", label: "Packaging", value: "Handcrafted Wooden Box" },
            { icon: "📖", label: "Extras", value: "Hardcover Story Book + Handwritten Note" },
            { icon: "🌱", label: "Origin", value: "Complete Heritage Collection" },
            { icon: "💝", label: "Perfect For", value: "Corporate & Special Occasions" },
            { icon: "🌍", label: "Special", value: "Numbered & Registered" }
        ]
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { productDatabase };
}

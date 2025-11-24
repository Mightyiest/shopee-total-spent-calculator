(async function () {
    /**
     * SHOPEE TOTAL SPENT CALCULATOR
     * * Instructions:
     * 1. Go to https://shopee.ph/user/purchase/ (or your local region)
     * 2. Open Developer Tools (F12) -> Console
     * 3. Paste this script and hit Enter
     */

    // --- CONFIGURATION ---
    const DELAY_MS = 500; // Delay in ms to avoid rate limiting
    const DIVISOR = 100000; // Shopee currency divisor
    
    var total = 0;
    var orderCount = 0;
    var offset = 0;
    var hasMore = true;

    // Helper for sleep
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    // Auto-detect currency symbol based on domain
    const domain = window.location.origin;
    let currencyLocale = 'en-PH'; // Default to PH
    let currencyCode = 'PHP';

    if (domain.includes('.my')) { currencyLocale = 'en-MY'; currencyCode = 'MYR'; }
    if (domain.includes('.sg')) { currencyLocale = 'en-SG'; currencyCode = 'SGD'; }
    if (domain.includes('.vn')) { currencyLocale = 'vi-VN'; currencyCode = 'VND'; }
    
    console.log(`%c 🚀 STARTING SHOPEE CALCULATOR (${currencyCode})...`, "color: orange; font-weight: bold; font-size: 14px;");

    try {
        while (hasMore) {
            const url = `${domain}/api/v4/order/get_order_list?limit=20&list_type=3&offset=${offset}`;
            const response = await fetch(url);
            
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const body = await response.json();

            if (body.data && body.data.details_list) {
                const orders = body.data.details_list;

                if (orders.length === 0) { hasMore = false; break; }

                for (let order of orders) {
                    let amount = order.info_card.final_total / DIVISOR;
                    
                    // Safe extraction of item name
                    let itemName = "Unknown Item";
                    try {
                        itemName = order.info_card.order_list_cards[0].product_info.item_groups[0].items[0].name;
                    } catch (e) {
                        itemName = "Bundle/Multiple Items";
                    }

                    total += amount;
                    orderCount++;

                    console.log(`${orderCount}: ${amount.toFixed(2)} - ${itemName.substring(0, 50)}...`);
                }

                offset = body.data.next_offset;
                if (offset < 0 || !offset) hasMore = false;

                await sleep(DELAY_MS); // Politeness delay
            } else {
                hasMore = false;
            }
        }

        // Formatter
        const formatter = new Intl.NumberFormat(currencyLocale, {
            style: 'currency',
            currency: currencyCode,
        });

        console.log('------------------------------------------------');
        console.log("%c ✅ CALCULATION COMPLETED!", "color: green; font-weight: bold; font-size: 16px;");
        console.log(`%c 💰 GRAND TOTAL: ${formatter.format(total)}`, "color: green; font-weight: bold; font-size: 18px;");
        console.log(`📦 Total Orders: ${orderCount}`);
        console.log('------------------------------------------------');

    } catch (error) {
        console.error("❌ An error occurred:", error);
        console.log("Tip: Make sure you are logged in and on the 'My Purchase' page.");
    }
})();

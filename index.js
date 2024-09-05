const puppeteer = require('puppeteer-core');

(async () => {
    try {
        // Replace with the path to your Chrome or Chromium executable
        const browser = await puppeteer.launch({
            executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', // Path to Chrome executable
            headless: false // Set to true if you want to run in headless mode
        });
        const page = await browser.newPage();

        // Set a higher navigation timeout (60 seconds)
        await page.setDefaultNavigationTimeout(60000);

        // Navigate to Instagram's login page
        await page.goto('https://www.instagram.com/accounts/login/', { waitUntil: 'networkidle0' });

        // Wait for the login form to appear
        await page.waitForSelector('input[name="username"]');

        // Enter your Instagram credentials
        await page.type('input[name="username"]', 'santoshrocky2021');
        await page.type('input[name="password"]', 'santosh#2004');

        // Click the login button
        await page.click('button[type="submit"]');


        await page.waitForNavigation({ waitUntil: 'networkidle0' });

        
        await page.goto('https://www.instagram.com/santoshrocky2021/', { waitUntil: 'networkidle0' });

        // Scroll down to load all posts
        let previousHeight;
        while (true) {
            previousHeight = await page.evaluate('document.body.scrollHeight');
            await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
            await new Promise(resolve => setTimeout(resolve, 2000)); // Pause for 2 seconds
            let newHeight = await page.evaluate('document.body.scrollHeight');
            if (newHeight === previousHeight) break;
        }

        // Capture a screenshot of the full page (all posts)
        await page.screenshot({ path: 'instagram_all_posts.png', fullPage: true });
        console.log('Screenshot of all posts taken');

        // Click the followers link
        await page.click('a[href*="/followers/"]');
        await page.waitForTimeout(5000); // Wait for the modal to appear

        // Scroll through the followers list to load all followers
        const followersModalSelector = 'div[role="dialog"] ul';
        let followersModalHeight;
        while (true) {
            followersModalHeight = await page.evaluate(() => document.querySelector('div[role="dialog"]').scrollHeight);
            await page.evaluate(() => document.querySelector('div[role="dialog"]').scrollBy(0, 1000));
            await new Promise(resolve => setTimeout(resolve, 2000)); // Pause for 2 seconds
            let newFollowersModalHeight = await page.evaluate(() => document.querySelector('div[role="dialog"]').scrollHeight);
            if (newFollowersModalHeight === followersModalHeight) break;
        }

        // Capture a screenshot of the followers modal
        await page.screenshot({ path: 'instagram_followers.png', fullPage: true });
        console.log('Screenshot of followers taken');

        // Click the following link
        await page.click('a[href*="/following/"]');
        await page.waitForTimeout(5000); // Wait for the modal to appear

        // Scroll through the following list to load all following
        const followingModalSelector = 'div[role="dialog"] ul';
        let followingModalHeight;
        while (true) {
            followingModalHeight = await page.evaluate(() => document.querySelector('div[role="dialog"]').scrollHeight);
            await page.evaluate(() => document.querySelector('div[role="dialog"]').scrollBy(0, 1000));
            await new Promise(resolve => setTimeout(resolve, 2000)); // Pause for 2 seconds
            let newFollowingModalHeight = await page.evaluate(() => document.querySelector('div[role="dialog"]').scrollHeight);
            if (newFollowingModalHeight === followingModalHeight) break;
        }

        // Capture a screenshot of the following modal
        await page.screenshot({ path: 'instagram_following.png', fullPage: true });
        console.log('Screenshot of following taken');

        await browser.close();
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
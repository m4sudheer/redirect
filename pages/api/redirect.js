export default function handler(req, res) {
    const { url } = req.query;

    const allowedDomains = [
        'cigna-im--devghb.sandbox.my.site.com',
        'your-trusted-domain.com'
    ];

    if (!url) {
        return res.status(400).send('Missing "url" query parameter.');
    }

    try {
        const decodedURL = decodeURIComponent(url);
        const parsedURL = new URL(decodedURL);

        // Validate domain (optional)
        if (!allowedDomains.includes(parsedURL.hostname)) {
            return res.status(403).send('URL domain not allowed.');
        }

        // Redirect to the URL
        return res.redirect(decodedURL);
    } catch (error) {
        return res.status(400).send('Invalid URL.');
    }
}

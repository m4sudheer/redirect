export default function handler(req, res) {
    const { data } = req.query;

    if (!data) {
        return res.status(400).send('Missing "data" query parameter.');
    }

    try {
        const decodedURL = atob(data); // decode base64
        const parsedURL = new URL(decodedURL);

        // Optional: whitelist domain
        const allowedDomains = [
            'cigna-im--devghb.sandbox.my.site.com',
            'your-trusted-domain.com'
        ];

        if (!allowedDomains.includes(parsedURL.hostname)) {
            return res.status(403).send('URL domain not allowed.');
        }

        return res.redirect(decodedURL);
    } catch (error) {
        return res.status(400).send('Invalid base64 or URL.');
    }
}

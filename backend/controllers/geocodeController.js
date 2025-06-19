const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const supabase = require('../supabase/client');
const { emitEvent } = require('../utils/websocket');

// Extract location from description (mock Gemini)
function extractLocationWithGemini(description) {
    // Simple mock: use regex or just simulate for now
    const mockLocation = (description.match(/in (.*)/i) || [])[1] || 'Manhattan, NYC';
    return mockLocation;
}

// Geocode location name to lat/lng with OpenStreetMap Nominatim
async function geocodeWithNominatim(locationName) {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=json&limit=1`;

    const response = await axios.get(url, {
        headers: { 'User-Agent': 'Disaster-Coordination-App' }
    });

    if (!response.data || response.data.length === 0) {
        throw new Error('No geocoding result found');
    }

    const result = response.data[0];
    return {
        lat: parseFloat(result.lat),
        lon: parseFloat(result.lon)
    };
}

// Controller
exports.geocode = async(req, res) => {
    const { description } = req.body;

    try {
        // 1. Gemini location extraction
        const locationName = extractLocationWithGemini(description);

        // 2. Check Supabase cache
        const cacheKey = `geocode:${locationName}`;
        const { data: cached } = await supabase
            .from('cache')
            .select('value, expires_at')
            .eq('key', cacheKey)
            .single();

        if (cached && new Date(cached.expires_at) > new Date()) {
            return res.json({ locationName, ...cached.value });
        }

        // 3. Geocode
        const coordinates = await geocodeWithNominatim(locationName);

        // 4. Save to cache
        await supabase.from('cache').upsert([{
            key: cacheKey,
            value: coordinates,
            expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString() // 1 hour
        }]);

        emitEvent('location_geocoded', { locationName, ...coordinates });

        res.json({ locationName, ...coordinates });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
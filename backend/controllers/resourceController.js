const supabase = require('../supabase/client');

exports.getNearbyResources = async(req, res) => {
    const { lat, lon } = req.query;
    const disaster_id = req.params.id;

    if (!lat || !lon) {
        return res.status(400).json({ error: 'lat and lon required' });
    }

    try {
        const { data, error } = await supabase
            .rpc('get_nearby_resources', {
                did: disaster_id,
                user_lat: parseFloat(lat),
                user_lon: parseFloat(lon),
                radius_meters: 10000 // 10 km
            });

        if (error) return res.status(500).json({ error: error.message });

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
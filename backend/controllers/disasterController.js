const supabase = require('../supabase/client');
const { emitEvent } = require('../utils/websocket');

// Create a new disaster
exports.createDisaster = async(req, res) => {
    try {
        const { title, location_name, description, tags, owner_id } = req.body;

        const { data, error } = await supabase.from('disasters').insert([{
            title,
            location_name,
            description,
            tags,
            owner_id,
            created_at: new Date().toISOString(),
            audit_trail: [{
                action: 'create',
                user_id: owner_id,
                timestamp: new Date().toISOString()
            }]
        }]);

        if (error) return res.status(500).json({ error: error.message });

        emitEvent('disaster_updated', data); // WebSocket event

        res.status(201).json(data);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all disasters
exports.getDisasters = async(req, res) => {
    try {
        const tag = req.query.tag;
        let query = supabase.from('disasters').select('*');

        if (tag) {
            query = query.contains('tags', [tag]);
        }

        const { data, error } = await query;

        if (error) return res.status(500).json({ error: error.message });

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};
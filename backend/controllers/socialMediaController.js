const supabase = require('../supabase/client');
const { emitEvent } = require('../utils/websocket');

exports.getSocialMediaPosts = async(req, res) => {
    const { id } = req.params;

    try {
        // Fetch disaster details (just for tags or location)
        const { data: disaster, error } = await supabase
            .from('disasters')
            .select('tags, location_name')
            .eq('id', id)
            .single();

        if (error || !disaster) {
            return res.status(404).json({ error: 'Disaster not found' });
        }

        const { tags, location_name } = disaster;

        // Mock social media data
        const mockPosts = [{
                post: `#${tags[0]} Need water in ${location_name}`,
                user: 'citizen1',
                timestamp: new Date().toISOString()
            },
            {
                post: `Power outage reported in ${location_name}`,
                user: 'citizen2',
                timestamp: new Date().toISOString()
            }
        ];

        // Optional: emit real-time update
        emitEvent('social_media_updated', mockPosts);

        res.json(mockPosts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
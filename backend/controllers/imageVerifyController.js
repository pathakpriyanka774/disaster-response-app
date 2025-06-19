const supabase = require('../supabase/client');
const { emitEvent } = require('../utils/websocket');

exports.verifyImage = async(req, res) => {
    const { id } = req.params;
    const { image_url } = req.body;

    if (!image_url) {
        return res.status(400).json({ error: 'image_url is required' });
    }

    try {
        // Mock Gemini response
        const result = {
            status: 'verified',
            message: `Image appears to depict real disaster context for disaster ID: ${id}`
        };

        // Optional: Save verification result to reports table
        await supabase
            .from('reports')
            .insert([{
                disaster_id: id,
                user_id: 'citizen1', // or from auth
                content: 'Image submitted',
                image_url,
                verification_status: result.status,
                created_at: new Date().toISOString()
            }]);

        emitEvent('image_verified', { id, result });

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
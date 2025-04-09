app.post('/filterItems', (req, res) => {
    const { searchItem } = req.body;

    if (!searchItem) {
        return res.status(400).json({ error: 'Missing search term' });
    }

    let sql;
    let values = [];

    if (searchItem === 'allitems') {
        sql = 'SELECT * FROM products';
    } else if (searchItem === 'newitems') {
        sql = 'SELECT * FROM products ORDER BY pid DESC';
    } else if (searchItem === 'upcoming') {
        sql = 'SELECT * FROM products WHERE listed = 0';
    } else {
        // Match product types like 'Antique', 'Artifact', etc.
        sql = 'SELECT * FROM products WHERE type LIKE ?';
        values = [`%${searchItem}%`];
    }

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error finding items:', err);
            return res.status(500).json({ error: 'Failed to fetch data' });
        }

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    });
});

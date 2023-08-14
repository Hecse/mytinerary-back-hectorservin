import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        cities: [
            {citie: 'Buenos Aires'},
            {citie: 'Cancun'},
        ]
    });
})

export default router
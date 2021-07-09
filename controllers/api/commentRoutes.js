const router = require('express').Router();
const { Comments, Commentss } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Comments.findAll({})
        .then(commentData => res.json(commentData))
        .catch(err => {

            res.status(500).json(err);
        })
});

router.get('/:id', (req, res) => {
    Comments.findAll({
            where: {
                id: req.params.id
            }
        })
        .then(commentData => res.json(commentData))
        .catch(err => {
            
            res.status(500).json(err);
        })
});

router.post('/', withAuth, (req, res) => {
    if (req.session) {
        Comments.create({
                text: req.body.text,
                post_id: req.body.post_id,
                user_id: req.session.user_id,
            })
            .then(commentData => res.json(commentData))
            .catch(err => {
                
                res.status(400).json(err);
            })
    }
});

router.put('/:id', withAuth, (req, res) => {
    Comments.update({
        text: req.body.text
    }, {
        where: {
            id: req.params.id
        }
    }).then(commentData => {
        if (!commentData) {
            res.status(404).json({ message: 'No Comments found by this id' });
            return;
        }
        res.json(commentData);
    }).catch(err => {
        
        res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
    Comments.destroy({
        where: {
            id: req.params.id
        }
    }).then(commentData => {
        if (!commentData) {
            res.status(404).json({ message: 'No Comments found by this id' });
            return;
        }
        res.json(commentData);
    }).catch(err => {
        
        res.status(500).json(err);
    });
});
module.exports = router;
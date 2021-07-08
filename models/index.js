const User = require('./User');
const Posts = require('./Posts');
const Comments = require('./Comments');

User.hasMany(Posts, {
    foreignKey: 'user_id'
});

Posts.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Comments.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Comments.belongsTo(Posts, {
    foreignKey: 'post_id',
    onDelete: "cascade"
});

User.hasMany(Comments, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Posts.hasMany(Comments, {
    foreignKey: 'post_id',
    onDelete: "cascade"
})

module.exports = { User, Posts, Comments };

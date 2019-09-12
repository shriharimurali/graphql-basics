const Query = {
    users(parent, args, ctx, info) {
        if (!args.query) {
            return ctx.users
        }
        return ctx.users.filter(u => u.name === args.query);
    },
    me() {
        return {
            id: '1',
            name: 'Shrihari',
            email: 'demo@.com',
            age: '28'
        };
    },
    post() {
        return {
            id: '123',
            title: 'First Post',
            body: 'First PostFirst PostFirst PostFirst PostFirst PostFirst Post',
            published: true
        };
    },
    posts(parent, args, ctx, info) {
        return ctx.posts.filter(p => p.published === args.isPublished);
    },
    comments(parent, args, ctx, info) {
        return ctx.comments;
    }
};

export default Query;

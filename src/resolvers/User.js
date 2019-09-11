const User = {
    posts(parent, args, ctx, info) {
        return ctx.posts.filter(f => parent.id === f.author);
    },
    comments(parent, args, ctx, info) {
        return ctxcomments.filter(c => c.author === parent.id)
    }
};

export default User;

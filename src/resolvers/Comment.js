const Comment = {
    author(parent, args, ctx, info) {
        return ctx.users.find(u => u.id === parent.author);
    },
    post(parent, args, ctx, info) {
        return ctx.posts.find(p => p.id === parent.post);
    }
};

export default Comment;

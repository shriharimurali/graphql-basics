const Post = {
    author(parent, args, ctx, info) {
        return ctx.users.find(u => u.id === parent.author);
    },
    comments(parent, args, ctx, info) {
        return ctx.comments.filter(c => c.post === parent.id);
    }
};

export default Post;

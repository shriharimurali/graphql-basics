const Mutation = {
    createUser(parent, args, ctx, info) {
        const emailTaken = ctx.users.some((user) => user.email === args.data.email);

        if (emailTaken) {
            throw new Error('Email has been already Taken!');
        }

        const user = {
            id: uuidv4(),
            ...args.data
        }

        ctx.users.push(user);
        return user;
    },
    deleteUser(parent, args, ctx, info) {
        const findUserIndex = ctx.users.findIndex(user => user.id === args.id);
        if (findUserIndex === -1) {
            throw new Error('User not found!');
        }
        const deletedUsers = ctx.users.splice(findUserIndex, 1);
        posts = ctx.posts.filter(post => {
            const match = post.author === args.id;
            if (match) {
                comments = ctx.comments.filter(c => c.post !== post.id);
            }
            return !match;
        });
        ctx.comments = ctx.comments.filter(c => c.author !== args.id);
        return deletedUsers[0];
    },
    creatPost(parent, args, ctx, info) {
        const userFound = ctx.users.some(user => user.id === args.data.author);
        if (!userFound) {
            throw new Error('User not exits!');
        }

        const post = {
            id: uuidv4(),
            ...args.data
        }
        ctx.posts.push(post);
        return post;
    },
    createComment(parent, args, ctx, info) {
        const userFound = ctx.users.some(user => user.id === args.data.author);
        const postFound = ctx.posts.some(post => post.id === args.data.post && post.published);

        if (!userFound || !postFound) {
            throw new Error('Unable to find user/post ');
        }

        const comment = {
            id: uuidv4(),
            ...args.data
        };

        ctx.comments.push(comment);
        return comment;
    }
};

export default Mutation;

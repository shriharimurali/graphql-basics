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
    updateUser(parent, args, ctx, info) {
        const findUser = ctx.users.find(user => user.id === args.id);
        if (!findUser) {
            throw new Error('User Not Found!');
        }

        if (typeof args.data.email === 'string') {
            const emailTaken = ctx.users.some(user => user.email === args.data.email);

            if (emailTaken) {
                throw new Error('Email in Use!');
            }

            findUser.email = args.data.email;
        }

        if (typeof args.data.name === 'string') {
            findUser.name = args.data.name
        }

        if (typeof args.data.age !== 'undefined') {
            findUser.age = args.data.age;
        }

        return findUser;
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
    updatePost(parent, args, ctx, info) {
        const postFound = ctx.posts.find(post => post.id === args.id);
        if (!postFound) {
            throw new Error(" Post not Exits!");
        }

        if (typeof args.data.title === 'string') {
            const post = ctx.posts.some(post => post.title === args.data.title);
            if (post) {
                throw new Error('Post already Exits');
            }
            postFound.title = args.data.title;
        }

        if (typeof args.data.body === 'string') {
            postFound.body = args.data.body;
        }
        if (typeof args.data.body === 'boolean') {
            postFound.published = args.data.published;
        }

        return postFound;
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
    },
    updateComment(parent, args, ctx, info) {
        const commentFound = ctx.comments.find(comment => comment.id === args.id);

        if (!commentFound) {
            throw new Error('Comment Not Found!');
        }

        if (typeof args.data.text === 'string') {
            commentFound.text = args.data.text
        }

        return commentFound;
    }
};

export default Mutation;

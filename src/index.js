import { GraphQLServer } from 'graphql-yoga';


// Demo Data

const users = [{
    id: '1',
    name: 'Shrihari',
    email: 'shrihari@example.com',
    age: 29
}, {
    id: '2',
    name: 'Hari',
    email: 'hari@example.com',
    age: 29
}, {
    id: '3',
    name: 'Shri',
    email: 'shrii@example.com',
}];

const posts = [{
    id: '1',
    title: 'Demo Post',
    body: 'S@example.com',
    published: false,
    author: '1'
}, {
    id: '2',
    title: 'hari post',
    body: 'h@example.com',
    published: false,
    author: '1'
}, {
    id: '3',
    title: 'shri Post',
    body: 'sr@example.com',
    published: false,
    author: '2'
}]

const comments = [{
    id: '102',
    text: 'adwawdawdawdawdawdadw',
    author: '1',
    post: '1'
}, {
    id: '103',
    text: 'awda34124124124124124124',
    author: '1',
    post: '1'
}, {
    id: '104',
    text: 'adwawdaw1231235t514234312e134dawdawdawdadw',
    author: '2',
    post: '2'
}, {
    id: '105',
    text: 'adwawdaw1231235t514234312e134dawdawdawdadw',
    author: '3',
    post: '3'
}];

// Type Definition
const typeDefs = `
    type Query {
        users(query: String!): [User!]!
        posts(isPublished: Boolean!): [Post!]!
        me: User!
        post: Post!
        comments: [Comment!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

   type Post {
       id: ID!
       title: String!
       body: String!
       published: Boolean!
       author: User!
       comments: [Comment!]! 
   }

   type Comment {
       id: ID!
       text: String!
       author: User!,
       post: Post!
   }
`
// Resolvers
const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            if (!args.query) {
                return users
            }
            return users.filter(u => u.name === args.query);
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
            return posts.filter(p => p.published === args.isPublished);
        },
        comments(parent, args, ctx, info) {
            return comments;
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find(u => u.id === parent.author);
        },
        comments(parent, args, ctx, info) {
            return comments.filter(c => c.post === parent.id);
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find(u => u.id === parent.author);
        },
        post(parent, args, ctx, info) {
            return posts.find(p => p.id === parent.post);
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter(f => parent.id === f.author);
        },
        comments(parent, args, ctx, info) {
            return comments.filter(c => c.author === parent.id)
        }
    }

}

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => {
    console.log('Server is Up!');
})

import { GraphQLServer } from 'graphql-yoga';
import { users, comments, posts } from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/mutation';
import User from './resolvers/User';
import Post from './resolvers/Post';
import Comment from './resolvers/Comment';

// Resolvers
const resolvers = {
    Query,
    Mutation,
    User,
    Post,
    Comment
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: {
        users,
        comments,
        posts
    }
});

server.start(() => {
    console.log('Server is Up!');
})

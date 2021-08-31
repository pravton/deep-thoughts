const { Thought, User } = require('../models');

const resolvers = {
  Query: {
    // Get all thoughts
    thoughts: async (parent, {username}) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({createdAt: -1});
    },
    // Get a single thought
    thought: async (parent, {_id}) => {
      return Thought.findOne({ _id });
    },
    // Get all users
    users: async () => {
      return User.find().select('-__v -password').populate('friends').populate('thoughts');
    },
    // Get a single user
    user: async (patent, { username }) => {
      return User.findOne({ username }).select('-__v -password').populate('friends').populate('thoughts');
    }
  }
};

module.exports = resolvers;
const Post = require("../../models/Post");
const authCheck = require("../../utils/authCheck");
const { AuthenticationError, UserInputError } = require("apollo-server");

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      //destructuring the username from the context(context for authorization)
      const { username } = authCheck(context);
      if (body.trim() === "") {
        throw new UserInputError("Cannot submit empty comment", {
          errors: {
            body: "type a comment please"
          }
        });
      }

      const post = await Post.findById(postId);
      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString()
        });
        await post.save();
        return post;
      } else {
        throw new UserInputError("Post not found");
      }
    },

    async deleteComment(_, { postId, commentId }, context) {
      //destructuring the username from the context(context for authorization)
      const { username } = authCheck(context);
      const post = await Post.findById(postId);

      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);
        //if comment at that comment in the post index is equal to the username we got from the tokens
        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new UserInputError("Post not found");
      }
    }
  }
};

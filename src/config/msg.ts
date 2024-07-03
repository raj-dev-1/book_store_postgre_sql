export const msg = {
  bookMessage: {
    success: {
      add: "Book created successfully!",
      fetch: "Book retrieved successfully!",
      update: "Book updated successfully!",
      delete: "Book deleted successfully!",
    },
    error: {
      add: "Failed to create book. Please check the book details and try again.",
      update:"Failed to update book. Please check the book details and try again.",
      delete: "Failed to delete book. Please try again later.",
      notFound: "Book not found. Please check the book ID and try again.",
      fillDetails: "Please provide all required book details.",
      genericError: "An unexpected error occurred. Please try again later.",
      year: "Invalid year. Year must be less than or equal to the current year.",
      duplicate: "Book with the same title and author already exists.",
    },
  },
  userMessage: {
    success: {
      signUpSuccess: "Account created successfully! Please login to continue.",
      loginSuccess: "Logged in successfully!",
      profileRetrieved: "User profile retrieved successfully!",
      delete: "User and associated books deleted successfully!",
    },
    error: {
      unauthorized: "Unauthorized access. Invalid token or session expired.",
      tokenMissing: "Token missing. Please login again to continue.",
      invalidCredentials: "Invalid username or password. Please try again.",
      userNotFound: "User not found. Please check the username and try again.",
      genericError: "An unexpected error occurred. Please try again later.",
      signUpError: "Failed to create account. Please try again later.",
      passwordNotMatch: "Password and confirm password do not match.",
      invalidEmail: "Email address is already in use. Please try a different email.",
      wrongPassword: "Incorrect password. Please try again.",
      fillDetails: "Please provide all required user details.",
      uploadImage: "Failed to upload image. Please try again later.",
      password: "Password must be between 6-20 characters and contain at least one uppercase letter, one lowercase letter, and one digit.",
      delete: "Failed to delete user. Please try again later.",
    },
  },
};

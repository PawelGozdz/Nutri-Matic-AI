process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  // Here you can add any cleanup code
  process.exit(1); // exit application with non-zero status code
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Here you can add any cleanup code
  process.exit(1); // exit application with non-zero status code
});
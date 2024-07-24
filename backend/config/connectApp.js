const connectApp = async (app, db, port) => {
  try {
    await db();
    app.listen(port, () => {
      console.log(`server listening on port: ${port}`);
    });
  } catch (error) {
    console.error(error.message);
  };
};

export default connectApp;
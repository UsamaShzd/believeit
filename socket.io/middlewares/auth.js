const authenticated = async (socket, next) => {
  const token = socket.handshake.query["x-auth-token"];
  if (!token) return next(new Error("UNAUTHENTICATED"));
  try {
    const authSession = await AuthSession.findOne({
      token,
      isExpired: false,
    }).populate("user");

    if (!authSession) return next(new Error("UNAUTHENTICATED"));

    const { user } = authSession;

    //email not verified
    if (user.isEmailVerified !== true)
      return next(new Error("EMAIL_NOT_VERIFIED"));

    socket.authSession = authSession;
    authSession.socketId = socket.id;
    await authSession.save();
    next();
  } catch (ex) {
    return next(ex);
  }
};

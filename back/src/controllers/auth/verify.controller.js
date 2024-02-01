export const verifyToken = (_req, res) => {
  res.json({ user: res.locals.user, token: res.locals.token });
};

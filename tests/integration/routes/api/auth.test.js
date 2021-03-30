const request = require("supertest");

const User = require("../../../../models/User");
const AuthSession = require("../../../../models/AuthSession");

const jwt = require("../../../../services/jwt");

const {
  generateUserSession,
  cleanUserSession,
} = require("../../test_helpers/userSessionHelper");

let server;
describe("/api/auth", () => {
  beforeEach(() => {
    server = require("../../../../index");
  });
  afterEach(async () => {
    server.close();
    await User.deleteMany({});
    await AuthSession.deleteMany({});
  });

  describe("GET /me", () => {
    const route = "/api/auth/me";
    let authToken = "";
    let user;
    beforeEach(async () => {
      const session = await generateUserSession();
      authToken = session.token;
      user = session.user;
    });

    afterEach(cleanUserSession);
    it("should return 200 response with logged in user", async () => {
      const result = await request(server)
        .get(route)
        .set("x-auth-token", authToken);

      expect(result.status).toBe(200);
      expect(result.body._id).toEqual(user._id.toHexString());
    });
  });

  describe("POST /signup", () => {
    const route = "/api/auth/signup";

    it("should signup a new user if all required fields are passed.", async () => {
      const body = {
        firstname: "firstname",
        lastname: "lastname",
        email: "test@gmail.com",
        password: "123456",
      };
      await request(server).post(route).send(body);
      const user = await User.findOne({ email: body.email });

      expect(user).not.toBeNull();
    });

    it("should return response with 200 status code, user and token.", async () => {
      const body = {
        firstname: "firstname",
        lastname: "lastname",
        email: "test@gmail.com",
        password: "123456",
      };
      const result = await request(server).post(route).send(body);
      delete body.password;

      expect(result.status).toBe(200);
      expect(result.body.user).toMatchObject(body);
      expect(result.body.token).toBeTruthy();
    });

    it("should create a new session of the user when signup.", async () => {
      const body = {
        firstname: "firstname",
        lastname: "lastname",
        email: "test@gmail.com",
        password: "123456",
      };
      const result = await request(server).post(route).send(body);

      const decoded = jwt.decrypt(result.body.token);
      const authSession = await AuthSession.findOne({ _id: decoded._id });

      expect(authSession.user.toHexString()).toEqual(result.body.user._id);
    });

    it("should return 409 response with error body if user already exists with the same email.", async () => {
      const body = {
        firstname: "firstname",
        lastname: "lastname",
        email: "test@gmail.com",
        password: "123456",
      };

      await new User(body).save();

      const result = await request(server).post(route).send(body);

      expect(result.status).toBe(409);
      expect(result.body.error).not.toBeNull();
      expect(result.body.error.message).not.toBeNull();
    });

    it("should return 400 response with error if request body is not valid", async () => {
      const body = {};
      const result = await request(server).post(route).send(body);
      delete body.password;

      expect(result.status).toBe(400);
      expect(result.body.error).not.toBeNull();
    });
  });

  describe("POST /signin", () => {
    const route = "/api/auth/signin";

    it("should login the user if correct credentials are passed", async () => {
      const user = new User({
        firstname: "firstname",
        lastname: "lastname",
        email: "test@gmail.com",
        password: "password",
      });
      user.password = await user.hashPassword(user.password);
      await user.save();

      const result = await request(server)
        .post(route)
        .send({ email: user.email, password: "password" });

      expect(result.status).toBe(200);
      // expect(result.body.user._id).toMatchObject(user._id.toHexString());

      expect(result.body.token).toBeTruthy();
    });

    it("should return 404 response with error if user does not exist.", async () => {
      const body = {
        email: "test@gmail.com",
        password: "123456",
      };
      const result = await request(server).post(route).send(body);
      expect(result.status).toBe(404);
      expect(result.body.error).not.toBeNull();
      expect(result.body.error.message).not.toBeNull();
    });

    it("should return 404 response with error if invalid password is passed.", async () => {
      const user = new User({
        firstname: "firstname",
        lastname: "lastname",
        email: "test@gmail.com",
        password: "password",
      });
      user.password = await user.hashPassword("password");
      await user.save();

      const result = await request(server)
        .post(route)
        .send({ email: user.email, password: "some_wrong_password" });

      expect(result.status).toBe(404);
      expect(result.body.error).not.toBeNull();
      expect(result.body.error.message).not.toBeNull();
    });

    it("should return 400 response with error if request body is not valid", async () => {
      const body = {};
      const result = await request(server).post(route).send(body);
      delete body.password;

      expect(result.status).toBe(400);
      expect(result.body.error).not.toBeNull();
    });
  });

  describe("POST /request_password_reset", () => {
    const route = "/api/auth/request_password_reset";

    it("should send a password reset code to user's email.", async () => {
      const user = new User({
        firstname: "firstname",
        lastname: "lastname",
        email: "test@gmail.com",
        password: "password",
      });
      user.password = await user.hashPassword(user.password);
      await user.save();

      const result = await request(server)
        .post(route)
        .send({ email: user.email });

      const updatedUser = await User.findById(user._id);
      expect(updatedUser.passwordResetCode.length).toBe(6);
      expect(result.status).toBe(200);
    });

    it("should return 404 response with error if user does not exist.", async () => {
      const body = {
        email: "test@gmail.com",
      };
      const result = await request(server).post(route).send(body);
      expect(result.status).toBe(404);
      expect(result.body.error).not.toBeNull();
      expect(result.body.error.message).not.toBeNull();
    });

    it("should return 400 response with error if request body is not valid", async () => {
      const body = {};
      const result = await request(server).post(route).send(body);
      delete body.password;

      expect(result.status).toBe(400);
      expect(result.body.error).not.toBeNull();
    });
  });

  describe("POST /password_reset_code_verification", () => {
    const route = "/api/auth/password_reset_code_verification";

    it("should send a 200 OK response if password reset code is valid", async () => {
      const user = new User({
        firstname: "firstname",
        lastname: "lastname",
        email: "test@gmail.com",
        password: "password",
        passwordResetCode: "123456",
      });
      user.password = await user.hashPassword(user.password);
      await user.save();

      const result = await request(server)
        .post(route)
        .send({ email: user.email, resetCode: user.passwordResetCode });

      expect(result.status).toBe(200);
    });

    it("should return 404 response with error if user does not exist.", async () => {
      const result = await request(server).post(route).send({
        email: "test@gmail.com",
        resetCode: "123456",
      });

      expect(result.status).toBe(404);
      expect(result.body.error).not.toBeNull();
      expect(result.body.error.message).not.toBeNull();
    });

    it("should return 400 response with error if request body is not valid", async () => {
      const body = {};
      const result = await request(server).post(route).send(body);
      delete body.password;

      expect(result.status).toBe(400);
      expect(result.body.error).not.toBeNull();
    });
  });

  describe("PUT /reset_password", () => {
    const route = "/api/auth/reset_password";

    it("should reset the password if reset code is valid", async () => {
      const user = new User({
        firstname: "firstname",
        lastname: "lastname",
        email: "test@gmail.com",
        password: "password",
        passwordResetCode: "123456",
      });
      user.password = await user.hashPassword(user.password);
      await user.save();

      const newPassword = "abcdef";
      const result = await request(server).put(route).send({
        email: user.email,
        resetCode: user.passwordResetCode,
        password: newPassword,
      });

      const updatedUser = await User.findById(user._id);

      const isCorrect = await updatedUser.comparePassword(newPassword);
      expect(isCorrect).toBe(true);
      expect(result.status).toBe(200);
    });

    it("should return 400 response if invalid reset code is passed.", async () => {
      const user = new User({
        firstname: "firstname",
        lastname: "lastname",
        email: "test@gmail.com",
        password: "password",
        passwordResetCode: "123456",
      });
      user.password = await user.hashPassword(user.password);
      await user.save();

      const result = await request(server).put(route).send({
        email: user.email,
        resetCode: "wrong_code",
        password: "abcdefgh",
      });

      expect(result.status).toBe(400);
      expect(result.body.error).not.toBeNull();
    });

    it("should return 404 response with error if user does not exist.", async () => {
      const result = await request(server).put(route).send({
        email: "test@gmail.com",
        resetCode: "123456",
        password: "123456",
      });

      expect(result.status).toBe(404);
      expect(result.body.error).not.toBeNull();
      expect(result.body.error.message).not.toBeNull();
    });

    it("should return 400 response with error if request body is not valid", async () => {
      const body = {};
      const result = await request(server).put(route).send(body);
      delete body.password;

      expect(result.status).toBe(400);
      expect(result.body.error).not.toBeNull();
    });
  });
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStrategy = void 0;
const session_1 = require("@helpers/session");
const passport_local_1 = require("passport-local");
exports.LocalStrategy = new passport_local_1.Strategy({
    usernameField: 'correo',
    passwordField: 'contrasenia',
}, async (correo, contrasenia, done) => {
    try {
        const user = await session_1.getUserByEmail(correo);
        if (!user) {
            return done(null, false);
        }
        const isMatch = await session_1.comparePassword(contrasenia, user.contrasenia);
        delete user.contrasenia;
        return isMatch ? done(null, user) : done(null, false);
    }
    catch (e) {
        return done(null, false);
    }
});
//# sourceMappingURL=strategies.js.map
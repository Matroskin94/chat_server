export const noop = () => {};

export function TypingUser(userLogin, isTyping) {
    this.userLogin = userLogin;
    this.isTyping = isTyping;
}

export function ActionMessage(userLogin, text) {
    this.isServiseMessage = true;
    this.author = { userLogin };
    this.text = text;
}

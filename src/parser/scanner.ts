import { IToken } from '../lexer/token';

export class Scanner {
  private tokens: IToken[] = [];
  private index = 0;

  constructor(tokens: IToken[], index = 0) {
    // ignore whitespace, comment
    this.tokens = tokens;
    this.index = index;
  }

  public read = () => {
    const token = this.tokens[this.index];
    if (token) {
      return token;
    } else {
      return false;
    }
  };

  public next = () => {
    this.index++;
  };

  public getIndex = () => this.index;

  public setIndex = (index: number) => (this.index = index);

  public getRestTokenCount = () => this.tokens.length - this.index - 1;

  public getNextFromToken = (token: IToken) => {
    const currentTokenIndex = this.tokens.findIndex(eachToken => eachToken === token);
    if (currentTokenIndex > -1) {
      if (currentTokenIndex + 1 < this.tokens.length) {
        return this.tokens[currentTokenIndex + 1];
      } else {
        return null;
      }
    } else {
      throw Error(`token ${token.value} not exist in scanner.`);
    }
  };

  public isEnd = () => {
    return this.index >= this.tokens.length;
  };

  public getPrevTokenFromCharacterIndex = (characterIndex: number) => {
    let prevToken: IToken = null;

    this.tokens.forEach(token => {
      if (token.position[1] < characterIndex) {
        prevToken = token;
      }
    });

    return prevToken;
  };

  public getNextTokenFromCharacterIndex = (characterIndex: number) => {
    for (const token of this.tokens) {
      if (token.position[0] > characterIndex) {
        return token;
      }
    }

    return null;
  };
}

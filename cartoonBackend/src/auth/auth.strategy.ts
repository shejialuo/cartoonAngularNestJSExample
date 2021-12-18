import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(){
    super({
      jwtFromRequest: (req) => {
        if(!req || !req.headers.authorization) return null;
        return req.headers.authorization;
      },
      ignoreExpiration: false,
      secretOrKey: 'shejialuo'
    });
  }

  async validate(data: any): Promise<any> {
    return {userName: data.userId};
  }
}